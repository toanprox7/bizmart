import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from "axios";
import {withRouter} from "react-router-dom";
import {checkAuthenticate} from "../../actions/settings";
import { fetchUserById } from "../../actions/usersAction";
import {connect} from "react-redux";
import {tokenAuthorization} from "app/utils"
// import fs from "fs";
var jwt = require("jsonwebtoken");
// var https = require('https');
// var fs = require('fs');

class FacebookLoginButton extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  // componentClicked=async()=>{
    // console.log(res,"Res");
    // await this.responseFacebook();

// console.log("clicked");
  // }
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
      await axios.post("/usersapi/createFacebookApi",infoApiUserFacebook,{
        headers: {
          'authorization':tokenAuthorization,
        }
      })
        .then(function(res){
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
          console.log(err); 
        })


    }
  }
  handleRedirect =async (infoData) => {
    // window.location.href = "/";
    // console.log(infoData);
    await this.props.getUserById(infoData.id);
    await this.props.isAuthenticate(true);
    await this.props.history.push("/");
  }
  responseFacebook=async (res)=>{
// console.log(res.picture.data.url);
    await this.setState({
      email:res.email,
      username:res.name,
      id:res.id,
      image:res.picture.data.url
    });
    await this.handleClicked();
  }
  render() {
    return (

   <FacebookLogin
    appId="193083074974491"
    autoLoad={false}
    fields="name,email,picture"
    onClick={this.componentClicked}
    callback={this.responseFacebook}
    icon={false}
    render={renderProps => (
      <div onClick={renderProps.onClick} className="button-reg-fb">
    <div className="fb-circle">
      <i className="fa fa-facebook" />
    </div>
    <div className="txt-fb">
      <p>Đăng ký bằng Facebook</p>
    </div>
    </div>
    )}
    />




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
export default connect(null, mapDispatchToProps)(withRouter(FacebookLoginButton))
