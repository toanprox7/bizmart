import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {tokenAuthorization} from "app/utils"
import "./styles/changePassword.css"
import { Alert } from 'reactstrap';
var bcrypt = require('bcryptjs');
class ChangePassword extends Component {
constructor(props) {
  super(props);
  this.state={
notifySuccess:"",
verify:false,
visible: true,
displayOpacity:0
  }
}
componentDidMount() {
  let token = localStorage.getItem("acess_admin");
  var decoded = jwt.verify(token, 'toanpro');
// console.log(decoded);
this.setState({
  idUser:decoded
});
}

async handleChange(e){
  // console.log(e.target.value)
  const {name,value} = e.target;
  await this.setState({
  [name]:value,
  });

  var self=this;
  axios.post('/usersapi/accessOldPassword',{id:parseInt(self.state.idUser),oldPassword:self.state.old_password},{
    headers: {
      'authorization':tokenAuthorization,
    }
  }).then((res) => {
    // console.log(res)
if(res.data == "err"){
self.setState({
errOldPass:"Mật khẩu không đúng",
notifySuccess:"",
verify:false
});
}else if(res.data == "verifyAside"){
self.setState({
  notifySuccess:"success",
  errOldPass:"",
})
}
  }).catch(err => {
    console.log(err)
  })


  if(this.state.new_password === this.state.re_new_password){
    await this.setState({
      // colorBackground:"#0080004a",
      verify:true
    });
  }else{
    await this.setState({
      // colorBackground:"#00800000",
      verify:false
    });
  }
}
handleSubmit(event, errors, values){
  var self = this;
if(errors.length === 0){
  if(this.state.verify === false){
    this.setState({
    errNewPassword:"Mật khẩu mới bạn nhập không khớp"
    });
    }
    if(this.state.notifySuccess == ""){
      this.setState({
        errOldPass:"Mật khẩu không đúng",
    notifySuccess:""
      });
    }
    if(this.state.verify === true && this.state.notifySuccess == "success" ){
      var salt = bcrypt.genSaltSync(10);
      var hashPass = bcrypt.hashSync(self.state.new_password, salt);
    axios.post("/usersapi/changePasswordAside",{id:parseInt(self.state.idUser),password:hashPass},{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then(res => {
      console.log(res,"sucess")
if(res.data.length > 0){
 self.setState({
  displayOpacity:10
 })
 setTimeout(() => {

  self.setState({ displayOpacity: 0 });
localStorage.removeItem("acess_admin");
  self.props.history.push("/admin");
}, 3000);
}else{
self.setState({
  displayOpacity:0
})
}
    }).catch(err => console.log(err))
    }
}

}
  render() {
    return (
      <div className="box">
       <div className="box-header">
            <h3 className="box-title">Đổi mật khẩu</h3>
          </div>
          <div className="box-body">
      <AvForm onSubmit={(event, errors, values) => this.handleSubmit(event, errors, values)}>
        <AvField className={this.state.notifySuccess} onChange={(e) => this.handleChange(e)} name="old_password" label="Mật khẩu cũ" placeholder="Nhập mật khẩu cũ" type="password" validate={{
            required: {value: true, errorMessage: 'Mật khẩu cũ không được để trống'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Mật khẩu cũ không hợp lệ'},
            minLength: {value: 6, errorMessage: 'Mật khẩu cũ ít nhất phải 6 ký tự và nhiều nhất là 30 kí tự'},
            maxLength: {value: 30, errorMessage: 'Mật khẩu cũ ít nhất phải 6 ký tự và nhiều nhất là 30 kí tự'}
          }} />
 <div class="invalid-feedback">{this.state.errOldPass?this.state.errOldPass:null}</div>
        <AvField onChange={(e) => this.handleChange(e)} name="new_password" label="Mật khẩu mới" placeholder="Nhập mật khẩu mới" type="password" validate={{
            required: {value: true, errorMessage: 'Mật khẩu mới không được để trống'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Mật khẩu mới không hợp lệ'},
            minLength: {value: 6, errorMessage: 'Mật khẩu mới ít nhất phải 6 ký tự và nhiều nhất là 30 kí tự'},
            maxLength: {value: 30, errorMessage: 'Mật khẩu mới ít nhất phải 6 ký tự và nhiều nhất là 30 kí tự'}
          }} />
        <AvField onChange={(e) => this.handleChange(e)} name="re_new_password" placeholder="Nhập lại mật khẩu mới" label="Nhập lại mật khẩu mới" type="password" validate={{
            required: {value: true, errorMessage: 'Mật khẩu mới không được để trống'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Mật khẩu mới không hợp lệ'},
            minLength: {value: 6, errorMessage: 'Mật khẩu mới ít nhất phải 6 ký tự và nhiều nhất là 30 kí tự'},
            maxLength: {value: 30, errorMessage: 'Mật khẩu mới ít nhất phải 6 ký tự và nhiều nhất là 30 kí tự'}
          }} />
           <div class="invalid-feedback">{this.state.errNewPassword?this.state.errNewPassword:null}</div>
        <Button color="primary">Đổi mật khẩu</Button>
        {this.state.verify == true?<i className="fa fa-check-circle" aria-hidden="true"></i>:null }

     <Alert style={{position:"fixed",bottom:"0px",left:"50%",opacity:this.state.displayOpacity,zIndex:3000}} color="success">
Bạn đã đổi mật khẩu thành công
     </Alert>
      </AvForm>
      </div>
      </div>
    );
  }
}

export default ChangePassword;
