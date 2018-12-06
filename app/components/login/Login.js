import React, { Component } from 'react';
import "./styles/login.css";
import {Link} from 'react-router-dom';
import axios from "axios";
import jwt from "jsonwebtoken";
import FacebookLoginButton from '../register/FacebookLoginButton';
var bcrypt = require('bcryptjs');
class Login extends Component {
constructor(props) {
  super(props);
  this.state={
    phone_number:"",
    errFocusUsername:"",
    displayUsername:"none",
    errUsername:"",
    errFocusPass:"",
    displayPass:"none",
    password:"",
    errPass:"",
    errFocusEmail:"",
    displayEmail:"none",
    email:"",
    errEmail:"",
    displayInfoUser:"block",
    displayForgetPass:"none",
    isToggle:false,
    textToggle:"Quên mật khẩu",
    textShowTitle:"Đăng nhập tài khoản",
  }
}
componentWillMount() {
  if(localStorage.getItem("tokenUser")){
    this.handleRedirect();
    // this.props.history.push("/");
    // window.location.reload();
  }
  // window.location.reload();
}
async handleClickToggle(){
await this.setState({
  isToggle:!this.state.isToggle
});
await this.checkForgetPassAndInfoUserName()
}
checkForgetPassAndInfoUserName(){
if(this.state.isToggle == false){
this.setState({
  displayInfoUser:"block",
    displayForgetPass:"none",
    textToggle:"Quên mật khẩu",
    textShowTitle:"Đăng nhập tài khoản",
});
}else{
  this.setState({
    displayInfoUser:"none",
    displayForgetPass:"block",
    textToggle:"Đăng nhập",
    textShowTitle:"Quên mật khẩu",
  });
}
}
 validateEmail =(email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
handleChangeData=(e) => {
  if(this.validateEmail(this.refs.phone_or_email.value)){
     this.setState({
      email:this.refs.phone_or_email.value,
      password:this.refs.password.value
    });
  }else{
    this.setState({
      phone_number:this.refs.phone_or_email.value,
      password:this.refs.password.value
    });
  }
}
handleChangeEmail(e){
this.setState({
  email:this.refs.email.value
});
}
handleOnBlurPassword=()=>{
  var patern = /^[0-9a-zA-Z]{6,}$/;
   if(this.state.password.length == 0){
    //  console.log("trong toi")
     this.setState({
      errFocusPass:"errFocusInput",
      displayPass:"block",
      errPass:"Mật khẩu không được để trống"
    });
  }else if(this.state.password.length < 7 || this.state.password.length >=30 ){
    this.setState({
      errFocusPass:"errFocusInput",
      displayPass:"block",
      errPass:"Mật khẩu phải có ít nhất 6 kí tự và nhỏ hơn 30 kí tự"
    });
  }else if(patern.test(this.state.password) == false){
  this.setState({
    errFocusPass:"errFocusInput",
    displayPass:"block",
    errPass:"Mật khẩu không hợp lệ"
  });
  }else{
    this.setState({
      errFocusPass:"",
      displayPass:"none",
      errPass:""
    });
  }
  }

    handleOnBlurEmail=()=>{
      var patern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(patern.test(this.state.email) == false){
          this.setState({
          errFocusEmail:"errFocusInput",
          displayEmail:"block",
          errEmail:"Bạn nhập email không hợp lệ"
        });
      }else{
        this.setState({
          errFocusEmail:"",
          displayEmail:"none",
          errEmail:""
        });
      }
    }

handleSubmitLogin=async()=>{
  // if(this.state.email)
  if(this.state.email == "" && this.state.phone_number == ""){
    alert("Các trường không được để trống");
  }else if(this.state.password == ""){
    alert("Các trường không được để trống");
  }
  else{
    if(this.state.email!=""){
      var self = this;
      axios.post("/usersapi/login",{email:this.state.email,password:this.state.password,status:"active"})
      .then(function (response) {
        if(response.data.data != "err"){
          // console.log(response.data.data);
          var token = jwt.sign(response.data.data, 'toanpro');
          localStorage.setItem('tokenUser',token);
          self.handleRedirect();
        }else if(response.data.data == "err"){
          console.log("Sai tai khoan");
          alert("Tài khoản hoặc mật khẩu không chính xác")
        }

      })
      .catch(function(err){
        console.log(err)
      })
      // await this.handleGetToken();
    }
    else if(this.state.phone_number != ""){
      var self = this;
      axios.post("/usersapi/login",{phone_number:this.state.phone_number,password:this.state.password,status:"active"})
      .then(function (response) {
        if(response.data.data != "err"){
          // console.log(response.data.data);
          var token = jwt.sign(response.data.data, 'toanpro');
          localStorage.setItem('tokenUser',token);
          self.handleRedirect();
        }else if(response.data.data == "err"){
          alert("Tài khoản hoặc mật khẩu không chính xác");
        }
      })
      .catch(function(err){
        console.log(err)
      })
    }
  }
  // bcrypt.compareSync("B4c0/\/", hash); // true
}

handleRedirect=() =>{
  window.location.reload();
   this.props.history.push("/");

}

handleOnBlurUsername(e){
  if(this.state.email.length > 0 || this.state.phone_number.length >0){
    //  console.log("trong toi")
    this.setState({
      errFocusUsername:"",
      displayUsername:"none",
      errUsername:""
    });
  }else{
    this.setState({
      errFocusUsername:"errFocusInput",
      displayUsername:"block",
      errUsername:"Username không được để trống"
    });

  }
}
    render() {
        return (
<div id="main">
  <div className="container">
    <div className="login">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="top-login">
            <div className="title-login">
              <h3>{this.state.textShowTitle}</h3>
            </div>
            <div className="had-username">
              <span>Các bạn chưa có tài khoản</span>
              <a href="/register"> Đăng ký tại đây !</a>
            </div>
          </div>
          <div className="block-login">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="left-login">
                <div style={{display:this.state.displayInfoUser}} className="wrap-inside">
                  <div className="input-login">
                    <input className={this.state.errFocusUsername} onBlur={(e) => this.handleOnBlurUsername(e)} ref="phone_or_email" name="phone_number" type="text" onChange={this.handleChangeData} placeholder="Email/Số Điện Thoại/Tên đăng nhập" />
                    <span style={{display:this.state.displayUsername}} className="errMsg">{this.state.errUsername}</span>
                  </div>
                  <div className="input-login pass-padd">
                    <input className={this.state.errFocusPass} ref="password" name="password" type="password" onBlur={(e) => this.handleOnBlurPassword(e)} onChange={this.handleChangeData} placeholder="Mật khẩu" />
                    <span style={{display:this.state.displayPass}} className="errMsg">{this.state.errPass}</span>
                  </div>
                </div>

                  <div style={{display:this.state.displayForgetPass}} className="input-login">
                  <div className="send-code">
                    <input className={this.state.errFocusEmail} ref="email" name="email" type="text" onBlur={this.handleOnBlurEmail} onChange={e => this.handleChangeEmail(e)} placeholder="Email của bạn" />
                      <div className="button-SendSms">Gửi mã</div>

                  </div>
            <span style={{display:this.state.displayEmail}} className="errMsg">{this.state.errEmail}</span>
                  </div>

                  <div className="forget-or-help-login">
                    <div className="forget-login">
                      <a onClick={() => this.handleClickToggle()}>{this.state.textToggle}</a>
                    </div>
                    <div className="help-login">
                      <a href="#">Cần trợ giúp?</a>
                    </div>

                  </div>
                </div>

              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="right-login">
            <div className="checkbox-login">
              <label>
                <input type="checkbox" defaultChecked />
                <span>Tôi đồng ý với điều khoản của Bizmart</span>
              </label>
            </div>
            <div className="button-login">
              <button onClick={this.handleSubmitLogin}>Đăng nhập</button>
            </div>
            <div className="or-login">
              <p>Hoặc đăng nhập</p>
            </div>
            {/* <div className="button-login-fb">
              <div className="fb-circle">
                <i className="fa fa-facebook" />
              </div>
              <div className="txt-fb">
                <p>Đăng ký bằng Facebook</p>
              </div>
            </div> */}
            <FacebookLoginButton />
            <div className="button-login-email">
              <div className="email-circle">
                <i className="fa fa-envelope-o" />
              </div>
              <div className="txt-email">
                <p>Đăng ký bằng Facebook</p>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        );
    }
}

export default Login;
