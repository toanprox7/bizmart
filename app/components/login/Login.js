import React, { Component } from 'react';
import "./styles/login.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import jwt from "jsonwebtoken";
import FacebookLoginButton from '../register/FacebookLoginButton';
import GoogleLoginButton from '../register/GoogleLoginButton';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { CustomInput } from 'reactstrap';
var bcrypt = require('bcryptjs');
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: "",
      password: "",
      email: "",
      displayInfoUser: "block",
      displayForgetPass: "none",
      isToggle: false,
      textToggle: "Quên mật khẩu",
      textShowTitle: "Đăng nhập tài khoản",
    }
  }
  componentWillMount() {
    if (localStorage.getItem("tokenUser")) {
      this.handleRedirect();
    }
  }
  async handleClickToggle() {
    await this.setState({
      isToggle: !this.state.isToggle
    });
    await this.checkForgetPassAndInfoUserName()
  }
  checkForgetPassAndInfoUserName() {
    if (this.state.isToggle == false) {
      this.setState({
        displayInfoUser: "block",
        displayForgetPass: "none",
        textToggle: "Quên mật khẩu",
        textShowTitle: "Đăng nhập tài khoản",
      });
    } else {
      this.setState({
        displayInfoUser: "none",
        displayForgetPass: "block",
        textToggle: "Đăng nhập",
        textShowTitle: "Quên mật khẩu",
      });
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  handleChangeData = (e) => {
    var { name, value } = e.target;
    if (name === "phone_number") {
      if (this.validateEmail(value)) {
        this.setState({
          email: value,
          phone_number: "",
          errInfoLogin: undefined
        });
      } else {
        this.setState({
          phone_number: value,
          email: "",
          errInfoLogin: undefined
        });
      }
    }
    if (name === "password") {
      this.setState({
        password: value,
        errInfoLogin: undefined
      });
    }

  }
  handleChangeEmail(e) {
    this.setState({
      email: this.refs.email.value
    });
  }


  handleOnBlurEmail = () => {
    var patern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (patern.test(this.state.email) == false) {
      this.setState({
        errFocusEmail: "errFocusInput",
        displayEmail: "block",
        errEmail: "Bạn nhập email không hợp lệ"
      });
    } else {
      this.setState({
        errFocusEmail: "",
        displayEmail: "none",
        errEmail: ""
      });
    }
  }

  handleSubmitLogin = async (events, errors, value) => {
    if (errors.length === 0) {
      if (this.state.email != "") {
        var self = this;
        axios.post("/usersapi/login", { email: this.state.email, password: this.state.password, status: "active" })
          .then(function (response) {
            if (response.data.data != "err") {
              // console.log(response.data.data);
              var token = jwt.sign(response.data.data, 'toanpro');
              localStorage.setItem('tokenUser', token);
              self.handleRedirect();
            } else if (response.data.data == "err") {
              // console.log("Sai tai khoan");
              // alert("Tài khoản hoặc mật khẩu không chính xác")
              self.setState({
                errInfoLogin: "Tài khoản hoặc mật khẩu không chính xác"
              })
            }

          })
          .catch(function (err) {
            console.log(err)
          })
      }
      else if (this.state.phone_number != "") {
        var self = this;
        axios.post("/usersapi/login", { phone_number: this.state.phone_number, password: this.state.password, status: "active" })
          .then(function (response) {
            if (response.data.data != "err") {
              var token = jwt.sign(response.data.data, 'toanpro');
              localStorage.setItem('tokenUser', token);
              self.handleRedirect();
            } else if (response.data.data == "err") {
              self.setState({
                errInfoLogin: "Tài khoản hoặc mật khẩu không chính xác"
              })
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }

  handleRedirect = () => {
    window.location.href = "/";

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
                <AvForm onSubmit={this.handleSubmitLogin}>
                  <div className="block-login">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="left-login">

                          <div style={{ display: this.state.displayInfoUser }} className="wrap-inside">
                            <span style={{ color: "red" }}>{this.state.errInfoLogin ? this.state.errInfoLogin : undefined}</span>
                            <div className="input-login">
                              <AvField name="phone_number" placeholder="Email/Số Điện Thoại/Tên đăng nhập" ref="phone_or_email" type="text" onChange={this.handleChangeData} validate={{
                                required: { value: true, errorMessage: 'Username không được để trống' },
                                pattern: { value: '^[A-Za-z0-9@.]+$', errorMessage: 'Username không hợp lệ' },
                                minLength: { value: 6, errorMessage: 'Username phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' },
                                maxLength: { value: 30, errorMessage: 'Username phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' }
                              }} />
                            </div>
                            <div className="input-login pass-padd">
                              <AvField name="password" placeholder="Mật khẩu" type="password" onChange={this.handleChangeData} validate={{
                                required: { value: true, errorMessage: 'Mật khẩu không được để trống' },
                                pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Mật khẩu không hợp lệ' },
                                minLength: { value: 6, errorMessage: 'Mật khẩu phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' },
                                maxLength: { value: 30, errorMessage: 'Mật khẩu phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' }
                              }} />
                            </div>
                          </div>

                          <div style={{ display: this.state.displayForgetPass }} className="input-login">
                            <div className="send-code">
                              <input className={this.state.errFocusEmail} ref="email" name="email" type="text" onBlur={this.handleOnBlurEmail} onChange={e => this.handleChangeEmail(e)} placeholder="Email của bạn" />
                              <div className="button-SendSms">Gửi mã</div>

                            </div>
                            <span style={{ display: this.state.displayEmail }} className="errMsg">{this.state.errEmail}</span>
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
                            <AvField tag={CustomInput} defaultValue={true} type="checkbox" name="customCheckbox1" label="Tôi đồng ý với điều khoản của Bizmart" validate={{
                              required: { value: true, errorMessage: 'Bạn chưa đồng ý với điều khoản của bizmart' }
                            }} />
                          </div>
                          <div className="button-login">
                            <button >Đăng nhập</button>
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
<GoogleLoginButton />
                          {/* <div className="button-login-email">
                            <div className="email-circle">
                              <i className="fa fa-envelope-o" />
                            </div>
                            <div className="txt-email">
                              <p>Đăng ký bằng Email</p>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </AvForm>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Login;
