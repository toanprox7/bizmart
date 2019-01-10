import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from "axios";
import {withRouter} from "react-router-dom";
import {checkAuthenticate} from "../../actions/settings";
import { addDataUserLocal } from "../../actions";
import {connect} from "react-redux";
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
        status:"active",
        role:"1"
      }
      var tokenUser = jwt.sign(infoApiUserFacebook, 'toanpro');
       localStorage.setItem("tokenUser",tokenUser);
      await axios.post("/usersapi/createFacebookApi",infoApiUserFacebook)
        .then(function(res){
if(res.data === "exits" || res.data === "created"){
  self.handleRedirect(infoApiUserFacebook);
}
        }).catch(function(err){
          throw err
        })


    }
  }
  handleRedirect = (infoData) => {
    // window.location.href = "/";
    // console.log(infoData);
    this.props.addUserLocal(infoData);
    this.props.isAuthenticate(true);
    this.props.history.push("/");
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
    addUserLocal: getDataUserLocal => dispatch(addDataUserLocal(getDataUserLocal)),
  }
}
export default connect(null, mapDispatchToProps)(withRouter(FacebookLoginButton))
