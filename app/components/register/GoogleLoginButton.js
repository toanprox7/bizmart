import React ,{ Component }  from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import axios from "axios";
import {withRouter} from "react-router-dom";
import {checkAuthenticate} from "../../actions/settings";
import { fetchUserById } from "../../actions/usersAction";
import {connect} from "react-redux";
import {tokenAuthorization} from "app/utils"
// import {withRouter} from "react-router-dom";
var jwt = require("jsonwebtoken");
class GoogleLoginButton extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  handleClicked=async ()=>{
    var self=this;
    if(this.state.id){
      let infoApiUserFacebook={
        id:this.state.id,
        username:this.state.username,
        image:this.state.image,
        email:this.state.email,
      }
      // var tokenUser = jwt.sign(infoApiUserFacebook, 'toanpro');
      //  localStorage.setItem("tokenUser",tokenUser);
      await axios.post("/usersapi/createGoogleApi",infoApiUserFacebook,{
        headers: {
          'authorization':tokenAuthorization,
        }
      })
        .then(function(res){
// if(res.data === "exits" || res.data === "created"){
//   self.handleRedirect(infoApiUserFacebook);
// }
if(res.data==="block"){
  alert("Tài khoản của bạn đã bị khóa, vui lòng liên hệ cổng thông tin của bizmart để biết thêm thông tin chi tiết");
}else if(res.data==="exits"){
  alert("Emails của bạn đã tồn tại trong hệ thống rồi, vui lòng xem lại tài khoản của bạn")
}else{
  var tokenUser = jwt.sign(res.data, 'toanpro');
  localStorage.setItem("tokenUser",tokenUser);
  self.handleRedirect(res.data);
}
        }).catch(function(err){
          throw err
        })
    }
  }
  handleRedirect = async (infoData) => {
    await this.props.getUserById(infoData.id);
    await this.props.isAuthenticate(true);
    await this.props.history.push("/");
  }
  responseGoogle =async (response) => {
    // console.log(response.w3);
    await this.setState({
      email:response.w3.U3,
      username:response.w3.ig,
      id:response.w3.Eea,
      image:response.w3.Paa
    });
    await this.handleClicked();
  }
  render() {
    return (
      <React.Fragment>

<GoogleLogin
 render={renderProps => (
  <div onClick={renderProps.onClick} className="button-reg-email">
  <div className="email-circle">
                            <i className="fa fa-google" />
                          </div>
                          <div className="txt-email">
                            <p>Đăng ký bằng Google</p>
                          </div>
                          </div>
  // <button >This is my custom Google button</button>
)}
    clientId="693122386438-qu17agtkooq2i2kisi8l0a3n8l0klo76.apps.googleusercontent.com"
    icon={false}
    autoLoad={false}
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
  >

    </GoogleLogin>
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    isAuthenticate: (getIsAuthenticate) => {
      dispatch(checkAuthenticate(getIsAuthenticate))
    },
    getUserById: getDataUserLocal => dispatch(fetchUserById(getDataUserLocal)),
  }
}
export default connect(null, mapDispatchToProps)(withRouter(GoogleLoginButton))
