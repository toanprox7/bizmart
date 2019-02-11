import React, { Component } from 'react';
import "./styles/login.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import jwt from "jsonwebtoken";
import {connect} from "react-redux";
import {fetchUserById} from "../../actions/usersAction";
import {checkAuthenticate,checkProcess} from "../../actions/settings";
import FacebookLoginButton from '../register/FacebookLoginButton';
import GoogleLoginButton from '../register/GoogleLoginButton';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { CustomInput } from 'reactstrap';
// import {checkProcess} from "../../actions/settings";
var bcrypt = require('bcryptjs');
var tokenAuthorization = jwt.sign({ admin: 'bizmart' }, 'toanpro');
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
      activePhone:false,
      activeEmail:false,
      displayAlert:false,
      timerCountDown:0,
      disableTimer:false,
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
  handleForgetPass(e) {
    if(this.validateEmail(e.target.value) === true){
      this.setState({
        forgetPass:e.target.value,
        email: e.target.value,
        activeEmail:true,
        activePhone:false
      });
    }else{
      this.setState({
        forgetPass:e.target.value,
        phone_number: e.target.value,
        activePhone:true,
        activeEmail:false
      });
    }
  }

  handleSendCode(){
    const {activePhone,activeEmail,email,phone_number,disableTimer}=this.state;
    const self=this;
    if(disableTimer === false){
      self.props.checkProcess({
        isLoading:true,
        percent:30
      });
      if(activePhone === true){
        axios.post("/usersapi/sendSmsPass",{phone_number:phone_number},{
          headers: {
            'authorization':tokenAuthorization,
          }
        }).then(res => {
          // console.log(res.data);
          if(res.data === "err" || res.data === "empty"){
            self.setState({
              displayAlert:true,
              styleColor:"red",
              alertForget:"Hệ thống đang bảo trì hoặc không tìm thấy dữ liệu, vui lòng thử lại..."
            })
          }else{
            self.intervalTimer()
            self.setState({
              // email:"",
              // phone_number:"",
              // activeEmail:false,
              // activePhone:false,
              displayAlert:true,
              styleColor:"green",
              alertForget:"Hệ thống đã gửi tới quý khách, vui lòng chờ trong giây lát ..."
            })
          }
          self.props.checkProcess({
            isLoading:false,
            percent:100
          });
        }).catch(err => {
          self.setState({
            displayAlert:false,
            styleColor:"red",
            alertForget:"Hệ thống đang bảo trì hoặc không tìm thấy dữ liệu, vui lòng thử lại..."
          })
          self.props.checkProcess({
            isLoading:false,
            percent:100
          });
        }
        )
      }else if(activeEmail === true){
        axios.post("/usersapi/sendSmsPass",{email:email},{
          headers: {
            'authorization':tokenAuthorization,
          }
        }).then(res => {
          // console.log(res.data);
          if(res.data === "err" || res.data === "empty"){
            self.setState({
              displayAlert:false,
              styleColor:"red",
              alertForget:"Hệ thống đang bảo trì hoặc không tìm thấy dữ liệu, vui lòng thử lại..."
            })
          }else{
            self.intervalTimer()
            self.setState({
              // email:"",
              // phone_number:"",
              // activeEmail:false,
              // activePhone:false,
              displayAlert:true,
              styleColor:"green",
              alertForget:"Hệ thống đã gửi tới quý khách, vui lòng chờ trong giây lát ..."
            })
          }
          
          self.props.checkProcess({
            isLoading:false,
            percent:100
          });
        }).catch(err => {
          self.setState({
            displayAlert:false,
            styleColor:"red",
            alertForget:"Hệ thống đang bảo trì hoặc không tìm thấy dữ liệu, vui lòng thử lại..."
          })
          self.props.checkProcess({
            isLoading:false,
            percent:100
          });
        }
        )
      }
    }else if(disableTimer === true){
      this.setState({
        styleColor:"red",
        displayAlert:true,
        alertForget: `Vui lòng thử lại sau ${60-this.state.timerCountDown} nữa...`
      });
    }
   
  }
  intervalTimer(){
    let {timerCountDown} = this.state;
      this.setState({
        intervalTimer:setInterval(() => {
          this.setState({
            timerCountDown:timerCountDown++,
            disableTimer:true,
            successPhone:null
          })
        if(timerCountDown > 60){
          this.setState({
            timerCountDown:0,
            disableTimer:false,
            successPhone:null
          })
          clearInterval(this.state.intervalTimer);
        }
        },1000)
      })
  }
  // handleOnBlurEmail = () => {
  //   var patern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (patern.test(this.state.email) == false) {
  //     this.setState({
  //       errFocusEmail: "errFocusInput",
  //       displayEmail: "block",
  //       errEmail: "Bạn nhập email không hợp lệ"
  //     });
  //   } else {
  //     this.setState({
  //       errFocusEmail: "",
  //       displayEmail: "none",
  //       errEmail: ""
  //     });
  //   }
  // }

  handleSubmitLogin = async (events, errors, value) => {

    if (errors.length === 1 && errors[0] === "forgetPass") {

      if (this.state.email != "") {
        var self = this;
      
        axios.post("/usersapi/login", { email: this.state.email, password: this.state.password, status: "active" },{
          headers: {
            'authorization':tokenAuthorization,
          }
        })
          .then(function (response) {
            if (response.data.data != "err") {
              // console.log(response.data.data);
              var token = jwt.sign(response.data.data, 'toanpro');
              localStorage.setItem('tokenUser', token);
              self.props.getUserById(response.data.data.id);
              self.props.isAuthenticate(true);
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
        // console.log(this.state.phone_number,"phone");
        var self = this;
        axios.post("/usersapi/login", { phone_number: this.state.phone_number, password: this.state.password, status: "active" },{
          headers: {
            'authorization':tokenAuthorization,
          }
        })
          .then(function (response) {
            if (response.data.data != "err") {
              var token = jwt.sign(response.data.data, 'toanpro');
              localStorage.setItem('tokenUser', token);
              self.props.getUserById(response.data.data.id);
              self.props.isAuthenticate(true);
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
    // window.location.href = "/";
    this.props.history.push("/");

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
                    <Link to="/register"> Đăng ký tại đây !</Link>
                  </div>
                </div>
                <AvForm onSubmit={(events, errors, value) => this.handleSubmitLogin(events, errors, value)}>
                  <div className="block-login">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="left-login">

                          <div style={{ display: this.state.displayInfoUser }} className="wrap-inside">
                            <span style={{ color: "red" }}>{this.state.errInfoLogin ? this.state.errInfoLogin : undefined}</span>
                            <div className="input-login">
                              <AvField name="phone_number" placeholder="Email/Số Điện Thoại" ref="phone_or_email" type="text" onChange={this.handleChangeData} validate={{
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
                            <AvField className="input-forget-pass" name="forgetPass" value={this.state.forgetPass || ""} ref="forgetPass" placeholder="Email hoặc số điện thoại của bạn" type="text" onChange={e => this.handleForgetPass(e)} validate={{
                                required: { value: true, errorMessage: 'Trường này không được để trống' },
                              }} />
                              
                              
                              {/* <input className={this.state.errFocusEmail} ref="forgetPass" name="forgetPass" type="text" onBlur={this.handleOnBlurEmail} onChange={e => this.handleForgetPass(e)} placeholder="Email hoặc số điện thoại của bạn" /> */}
                              <div 
                              className="button-SendSms"
                              onClick={() => this.handleSendCode()}
                              >Gửi mã</div>

                            </div>
                            <span style={{ display: this.state.displayEmail }} className="errMsg">{this.state.errEmail}</span>
                            {this.state.displayAlert===true?(<span style={{
                                color:this.state.styleColor
                              }}>{this.state.alertForget}</span>):null}
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    isAuthenticate: (getIsAuthenticate) => {
      dispatch(checkAuthenticate(getIsAuthenticate))
    },
    getUserById: (getId) => {
      dispatch(fetchUserById(getId))
    },
    checkProcess: dataProcess => dispatch(checkProcess(dataProcess))
  }
}
export default connect(null, mapDispatchToProps)(Login)