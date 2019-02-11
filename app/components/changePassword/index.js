import React, { Component } from 'react';
import {connect} from "react-redux";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from "axios";
import {fetchUserById} from "../../actions/usersAction";
import {tokenAuthorization} from "app/utils"
import jwt from "jsonwebtoken";
import _ from "lodash";
import "./styles/index.css";
import {checkAuthenticate,checkProcess} from "../../actions/settings";
var bcrypt = require('bcryptjs');
class ChangePasswordUser extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  componentWillMount() {
    var token = localStorage.getItem("tokenUser");
    if(!token){
      this.props.history.push("/login");
    }else{
      var decoded = jwt.verify(token, 'toanpro');
      if(!decoded || decoded.googleId || decoded.facebookId){
        this.props.history.push("/login");
      }else{
          this.setState({
            idUser:decoded.id
          })
      }
    }
    // console.log(this.props.dataUser,"data user");
  }



async handleChange(e){
  let name = e.target.name;
  let value = e.target.value;
  await this.setState({
    [name]:value
  });
  const {newPassword,repeatNewPassword
  }= await this.state;
  if(newPassword === repeatNewPassword){
    this.setState({
        alertVerifyPassword:true,
        nameIconNew:"fa fa-check-circle",
        styleColorNew:"green",
        verifySuccess:true
    })
  }else if(newPassword.length > 0 && repeatNewPassword.length > 0 && newPassword !== repeatNewPassword){
    this.setState({
        alertVerifyPassword:true,
        nameIconNew:"fa fa-times-circle",
        styleColorNew:"red",
        verifySuccess:false
    })
  }else if(newPassword.length === 0 || repeatNewPassword.length === 0){
    this.setState({
        alertVerifyPassword:false,
        verifySuccess:false
    })
  }
}
handleUpdateSubmit(event, errors, values){
  // console.log(errors,"err");
  var self=this;
  
  if(errors.length === 0){
    const {verifySuccess,oldPasswordSucess,newPassword,idUser}=this.state;
    if(verifySuccess === true && oldPasswordSucess === true){
        var salt = bcrypt.genSaltSync(10);
        var hashPass = bcrypt.hashSync(newPassword, salt);
        axios.post("/usersapi/changePasswordAside",{id:parseInt(idUser),password:hashPass},{
            headers: {
              'authorization':tokenAuthorization,
            }
          }).then(res => {
              if(res.data.length > 0){
                localStorage.removeItem("tokenUser");
                self.props.history.push("/login");
                self.props.isAuthenticate(false);
                  alert("Bạn đã đổi mật khẩu thành công, hệ thống sẽ tự đăng xuất tài khoản để bảo đảm an toàn cho bạn, vui lòng đăng nhập lại xin cảm ơn.")
              }else{
                  alert("Hệ thống đang bảo trì, vui lòng thử lại sau...");
              }

          }).catch(err => {
              alert("Hệ thống đang bảo trì, vui lòng thử lại sau...")
          })
    
    }
  }


}
handleOldPassword=_.debounce((value)=>{
if(value.length > 0){
    var self=this;
    axios.post('/usersapi/accessOldPassword',{id:parseInt(self.state.idUser),oldPassword:value},{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then((res) => {
      // console.log(res)
  if(res.data === "err"){
  self.setState({
  alertCheck:true,
  nameIcon:"fa fa-times-circle",
  styleColor:"red",
  oldPasswordSucess:false,
  });
  }else if(res.data === "verifyAside"){
    self.setState({
        alertCheck:true,
        oldPasswordSucess:true,
        nameIcon:"fa fa-check-circle",
        styleColor:"green"
        });
  }
    }).catch(err => {
      alert("Hệ thống đang bảo trì, vui lòng thử lại sau...")
    })
}else{
    this.setState({
        alertCheck:false,
        oldPasswordSucess:false,
    })
}
   
  
},1000)
  render() {
    // console.log( "tets");
    // const record=this.props.dataUser;
    const {nameIcon,nameIconNew,styleColor,styleColorNew,alertCheck,alertVerifyPassword,oldPasswordSucess}=this.state;
    return (
      <div className="post-new">
      <div className="block-post-new">
        <div className="title-post-new">
          <h3>Đổi mật khẩu tài khoản</h3>
        </div>
        <AvForm onSubmit={(event, errors, values) => this.handleUpdateSubmit(event, errors, values)}>
        <div className="block-info-product-post">
          <div
          className="user-sell-phone-info-post">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div
                 style={{
                    display: "flex",
                    flexDirection: "row-reverse"
                  }}
                className="user-sell-info-post">
                {alertCheck === true?(
 <i 
 style={{
 color:styleColor,
 fontSize: 18,
 alignItems: "center",
 width: 0,
 display:"flex"
 }} 
 className={nameIcon} aria-hidden="true">
 </i>
          ):null}
                <AvField
                  name="oldPassword"
                  onChange={(e) => this.handleOldPassword(e.target.value)}
                  placeholder="Vui lòng nhập mật khẩu cũ" label="Mật khẩu cũ" type="password" validate={{
            required: {value: true, errorMessage: 'Mật khẩu cũ không được để trống'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Mật khẩu cũ không hợp lệ'},
            minLength: {value: 5, errorMessage: 'Mật khẩu cũ ít nhất phải gồm 6 ký tự đến 30 ký tự'},
            maxLength: {value: 30, errorMessage: 'Mật khẩu cũ ít nhất phải gồm 6 ký tự đến 30 ký tự'}
          }} />

         
              {/* fa fa-times-circle */}
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="phone-info-post">
                  <AvField
                  name="newPassword"
                  onChange={(e) => this.handleChange(e)}
                 placeholder="Vui lòng nhập mật khẩu mới" label="Mật khẩu mới" type="password" validate={{
            required: {value: true, errorMessage: 'Mật khẩu mới không được để trống'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Mật khẩu mới không hợp lệ'},
            minLength: {value: 6, errorMessage: 'Mật khẩu mới ít nhất phải gồm 6 ký tự đến 30 ký tự'},
            maxLength: {value: 30, errorMessage: 'Mật khẩu mới ít nhất phải gồm 6 ký tự đến 30 ký tự'}
          }} />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div
                 style={{
                    display: "flex"
                  }}
                 className="phone-info-post">
                <AvField
                  name="repeatNewPassword"
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Vui lòng nhập lại mật khẩu mới" label="Nhập lại mật khẩu mới" type="password" validate={{
                    required: {value: true, errorMessage: 'Nhập lại mật khẩu mới không được để trống'},
                    pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Nhập lại mật khẩu mới không hợp lệ'},
                    minLength: {value: 6, errorMessage: 'Nhập lại mật khẩu mới ít nhất phải gồm 6 ký tự đến 30 ký tự'},
                    maxLength: {value: 30, errorMessage: 'Nhập lại mật khẩu mới ít nhất phải gồm 6 ký tự đến 30 ký tự'}
                  }} />
      {alertVerifyPassword === true?(
 <i 
 style={{
 color:styleColorNew,
 fontSize: 18,
 alignItems: "center",
 width: 0,
 display:"flex"
 }} 
 className={nameIconNew} aria-hidden="true">
 </i>
          ):null}
                </div>
              </div>
              
            </div>
          </div>
       
          <div className="button-post-new">
            <button style={{
                width:170
            }}>Đổi mật khẩu</button>
          </div>
        </div>
        </AvForm>
      </div>
    </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      isAuthenticate: (getIsAuthenticate) => {
        dispatch(checkAuthenticate(getIsAuthenticate))
      }
  }
}
export default connect(null, mapDispatchToProps)(ChangePasswordUser)

