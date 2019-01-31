import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import FacebookLoginButton from './FacebookLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import { Link } from "react-router-dom";
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { CustomInput } from 'reactstrap';
import axios from 'axios';
import {tokenAuthorization} from "app/utils"
import "./styles/styles.css";
import "./styles/register.css";
import {checkProcess} from "../../actions/settings"
import {connect} from "react-redux";
import _ from "lodash";
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCheck: "none",
      labelCheck: "none",
      passCheck: "none",
      errFocusName: "",
      displayName: "none",
      name: "",
      errName: "",
      errFocusPass: "",
      displayPass: "none",
      password: "",
      errPass: "",
      errFocusRePass: "",
      displayRePass: "none",
      re_password: "",
      errRePass: "",
      errFocusEmail: "",
      displayEmail: "none",
      email: "",
      errEmail: "",
      errFocusConfirm: "",
      displayConfirm: "none",
      confirm_sms: "",
      errConfirm: "",
      errFocusPhone: "",
      displayPhone: "none",
      phone_number: "",
      errPhone: "",
      checkBoxRule: false,
      timerCountDown:0,
      disableTimer:false,
      showConfirm:false,
      duplicatePhone:false,
      successPhone:null
    }
  }
  componentWillMount() {
    // console.log("hello");
    if (localStorage.getItem("tokenUser")) {
      this.handleRedirect();
      // window.location.reload();
    }

  }
  handleChange = async (event) => {
    event.preventDefault();
    let {name,value} = event.target;
    let {codeToken,confirm_sms} = this.state;
    var self=this;
    await this.setState({
      [name]: value
    });
    if(name === "confirm_sms"){
      if(codeToken === parseInt(value)){
        this.setState({
          showConfirm:true
        })
      }else{
        this.setState({
          showConfirm:false
        })
      }
    }
    await this.checkComparePass();
  }
  handleChangePhone=_.debounce((text) => {
    // console.log(text,"tetx tren")
    // this.setState({
    //   phone_number: text
    // })
    var self=this;
    axios.post("/usersapi/getOneUserById",{
      phone_number:text
    },{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then(res => {
      if(res.data === "empty"){
        self.setState({
          errFocusPhone: "",
          displayPhone: "none",
          errPhone: "",
          duplicatePhone:false
        })
      }else if(res.data === "err"){
        self.setState({
          errFocusPhone: "errFocusInput",
          displayPhone: "block",
          errPhone: "Hệ thống đang bị lỗi vui lòng thử lại...",
          duplicatePhone:false
        })
      }else{
        self.setState({
          errFocusPhone: "errFocusInput",
          displayPhone: "block",
          errPhone: "Số điện thoại bạn nhập đã tồn tại rồi...",
          duplicatePhone:true
        })
      }
    }).catch(err => {
      self.setState({
        errFocusPhone: "",
        displayPhone: "none",
        errPhone: "",
        duplicatePhone:false
      })
    })
  },1000)

  checkComparePass = () => {
    if (this.state.password && this.state.re_password) {
      if (this.state.password == this.state.re_password) {
        //  console.log("khop pass");
        this.setState({
          passCheck: "block"
        });
      } else if (this.state.password != this.state.re_password) {
        // console.log("khong pass");
        this.setState({
          passCheck: "none"
        });
      }
    }

  }
  handleSubmitRegister = (events, errors, values) => {
    var { phone_number, confirm_sms, password, re_password, email,showConfirm } = this.state;
    var arrayErr=[];
if(confirm_sms == ""){
  arrayErr.push("err");
  this.setState({
    errFocusConfirm: "errFocusInput",
    displayConfirm: "block",
    errConfirm: "Xác nhận mã sms không được để trống"
  });
}else{
  this.setState({
    errFocusConfirm: "",
    displayConfirm: "none",
    errConfirm: ""
  });
}
if(phone_number === ""){
  arrayErr.push("err");
  this.setState({
    errFocusPhone: "errFocusInput",
    displayPhone: "block",
    errPhone: "Số điện thoại không được để trống"
  });
}else{
  this.setState({
    errFocusPhone: "",
    displayPhone: "none",
    errPhone: ""
  });
}
if(showConfirm === false){
  arrayErr.push("err");
  this.setState({
    errFocusConfirm: "errFocusInput",
    displayConfirm: "block",
    errConfirm: "Mã xác nhận của bạn không đúng..."
  });
}else{
  this.setState({
    errFocusConfirm: "",
    displayConfirm: "none",
    errConfirm: ""
  });
}
    // console.log(errors);
    if(errors.length === 0 && arrayErr.length === 0){

    var nameForm = this.state.name;
    var salt = bcrypt.genSaltSync(10);
    var hashPass = bcrypt.hashSync(this.state.password, salt);
    var dataUser = {
        phone_number: this.state.phone_number,
        username: this.state.name,
        password: hashPass,
        email: this.state.email,
        image: "https://anlinhco.vn/script/img/icon-hop-tac.png",
        role: "1",
        status: "active"
      }
         var self = this;
      // alert("Bạn đã đăng ký thành công", hashPass);
      axios.post('/usersapi/register', dataUser,{
        headers: {
          'authorization':tokenAuthorization,
        }
      })
        .then(function (res) {
          // console.log(response);
          if(res.data === "duplicatePhone"){
            self.setState({
              errFocusPhone: "errFocusInput",
              displayPhone: "block",
              errPhone: "Số điện thoại bạn nhập đã tồn tại rồi...",
              duplicatePhone:true,
              successPhone:null
            });
          }else if(res.data === "duplicateEmail"){
            self.setState({
              errFocusEmail: "errFocusInput",
              displayEmail: "block",
              errEmail: "Email bạn nhập đã tồn tại rồi...",
              duplicateEmail:true,
            });
          }else if(res.data === "success"){
            alert("Bạn đã đăng ký tài khoản thành công.");
            self.handleRedirect();
          }
         
        })
        .catch(function (error) {
          // console.log(error);
          alert("Lỗi hệ thống, vui lòng thử lại...");
        });
      // this.handleRedirect();
    }
  }

  handleRedirect = () => {
    // this.props.history.push('/login');
   this.props.history.push("/login");
  }
  handleSendSms(){
    let {phone_number,disableTimer,duplicatePhone} = this.state;
    let self=this;
    // console.log(phone_number.length,"length");
    if(phone_number.length === 0){
      this.setState({
        errFocusPhone: "errFocusInput",
        displayPhone: "block",
        errPhone: "Số điện thoại không được để trống",
        successPhone:null
      });
    }else if(phone_number.length < 9){
      this.setState({
        errFocusPhone: "errFocusInput",
        displayPhone: "block",
        errPhone: "Số điện thoại ít nhất phải là 9 ký tự",
        successPhone:null
      });
    }else{
      if(disableTimer === false && duplicatePhone === false){
        this.setState({
          errFocusPhone: "",
          displayPhone: "none",
          errPhone: "",
          confirm_sms:"",
          showConfirm:false
        });
        this.props.checkProcess({
          isLoading:true,
          percent:30
        });
        axios.post("/SMS/send",{phone_number:phone_number},{
          headers: {
            'authorization':tokenAuthorization,
          }
        }).then(res => {
          if(res.data === "err"){
            self.props.checkProcess({
              isLoading:false,
              percent:100
            });
            self.setState({
              errFocusPhone: "errFocusInput",
              displayPhone: "block",
              errPhone: "Hệ thống đang bị lỗi vui lòng thử lại sau",
              successPhone:null
            });
          }else{
            self.intervalTimer()
            self.props.checkProcess({
              isLoading:false,
              percent:100
            });
            self.setState({
              codeToken:res.data,
              errFocusPhone: "",
              displayPhone: "none",
              errPhone: "",
              successPhone:"Hệ thống đã gửi đến quý khách, vui lòng xem lại tin nhắn của bạn"
            });
            // alert("Hệ thống đã gửi đến quý khách, vui lòng xem lại tin nhắn của bạn");
          }
          
        }).catch(err =>{
          self.props.checkProcess({
            isLoading:false,
            percent:100
          });
          self.setState({
            errFocusPhone: "errFocusInput",
            displayPhone: "block",
            errPhone: "Hệ thống đang bị lỗi vui lòng thử lại sau",
            successPhone:null
          });
        })
      }else if(disableTimer === true){
        this.setState({
          errFocusPhone: "",
          displayPhone: "block",
          errPhone: `Vui lòng thử lại sau ${60-this.state.timerCountDown} nữa...`
        });
      }
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
  handleOnBlurConfirm = () => {
    var {codeToken,confirm_sms} = this.state;
    if (this.state.confirm_sms.length == 0) {
      //  console.log("trong toi")
      this.setState({
        errFocusConfirm: "errFocusInput",
        displayConfirm: "block",
        errConfirm: "Xác nhận mã sms không được để trống"
      });
    }else if(codeToken !== parseInt(confirm_sms)){
      this.setState({
        showConfirm:false
      });
    }else {
      this.setState({
        errFocusConfirm: "",
        displayConfirm: "none",
        errConfirm: ""
      });
    }
  }
  handleOnBlurPhone = () => {
    var {duplicatePhone} = this.state;
    if (this.state.phone_number.length === 0) {
      //  console.log("trong toi")
      this.setState({
        errFocusPhone: "errFocusInput",
        displayPhone: "block",
        errPhone: "Số điện thoại không được để trống",
        duplicatePhone:false,
        successPhone:null
      });
    } else if(duplicatePhone === true){
      this.setState({
          errFocusPhone: "errFocusInput",
          displayPhone: "block",
          errPhone: "Số điện thoại bạn nhập đã tồn tại rồi...",
          duplicatePhone:true,
          successPhone:null
      });
    }else{
      this.setState({
        errFocusPhone: "",
        displayPhone: "none",
        errPhone: "",
        duplicatePhone:false
      });
    }
  }

  render() {
    return (
      <div id="main">
        <div className="container">
          <div className="register">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="top-register">
                  <div className="title-register">
                    <h3>Đăng ký tài khoản</h3>
                  </div>
                  <div className="had-username">
                    <span>Các bạn đã có tài khoản</span>
                    <Link to="/login"> Đăng nhập tại đây !</Link>
                  </div>
                </div>
                {/* <AvForm> */}
                <div className="block-register">
                  <div className="row">
                  <AvForm onSubmit={this.handleSubmitRegister}>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="left-register">
                        {/* <AvForm> */}
                          <div className="input-reg">
                            <div className="send-code">
                              <NumberFormat 
                              format="##########"
                              mask="_"
                              isNumericString={true}
                              type="tel"
                              onBlur={(e) => this.handleOnBlurPhone(e)} name="phone_number" 
                              onChange={e => this.handleChangePhone(e.target.value, e.target.name)}
                              onValueChange={(values) => {
                                const {formattedValue, value} = values;
                                // console.log(value,"value hihi")
                                this.setState({
                                  phone_number:value
                                });
                              }}
                               className={this.state.errFocusPhone} placeholder="Số điện thoại"/>

                              <div className="button-SendSms" onClick={()=> this.handleSendSms()}>Gửi mã</div>
                            </div>
                            <span style={{ display: this.state.displayPhone }} className="errMsg">{this.state.errPhone}</span>
                            {this.state.successPhone?(
                              <span style={{
                                color:"green"
                              }}>{this.state.successPhone}</span>
                            ):null}
                          </div>
                          <div className="input-reg confirm">
                            <NumberFormat 
                            className={this.state.errFocusConfirm} 
                            onBlur={e => this.handleOnBlurConfirm(e)} onChange={event => this.handleChange(event)} name="confirm_sms" 
                            format="#####" 
                            mask="_" 
                            placeholder="Xác nhận mã sms" 
                            value={this.state.confirm_sms}
                            />
                            <span style={{ display: this.state.displayConfirm }} className="errMsg">{this.state.errConfirm}</span>
                            {this.state.showConfirm === true?(<span style={{
                              color:"green"
                            }}>Bạn đã nhập mã xác nhận chính xác...</span>):null}
                            {/* <i style={{ display: `${this.state.displayCheck}` }} className="fa fa-check-circle"></i> */}

                          </div>

                          <div className="input-reg">
                            <AvField name="name" placeholder="Họ và tên" type="text" onChange={this.handleChange} validate={{
                              required: { value: true, errorMessage: 'Họ và tên không được để trống' },
                              pattern: { value: /^[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]+$/i, errorMessage: 'Họ và tên không hợp lệ' },
                              minLength: { value: 6, errorMessage: 'Họ và tên phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' },
                              maxLength: { value: 30, errorMessage: 'Họ và tên phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' }
                            }} />
                            {/* <input type="text" name="name" onBlur={e => this.handleOnBlurName(e)} className={this.state.errFocusName} onChange={event => this.handleChange(event)} placeholder="Họ và tên" />
                            <span style={{ display: this.state.displayName }} className="errMsg">{this.state.errName}</span> */}
                          </div>

                          <div className="input-reg">
                            <AvField name="password" placeholder="Mật khẩu" type="password" onChange={this.handleChange} validate={{
                              required: { value: true, errorMessage: 'Mật khẩu không được để trống' },
                              pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Mật khẩu không hợp lệ' },
                              minLength: { value: 6, errorMessage: 'Mật khẩu phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' },
                              maxLength: { value: 30, errorMessage: 'Mật khẩu phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' }
                            }} />
                            {/* <input type="password" name="password" onBlur={(e) => this.handleOnBlurPassword(e)} value={this.state.password} onChange={event => this.handleChange(event)} className={this.state.errFocusPass} placeholder="Mật khẩu" />
                            <span style={{ display: this.state.displayPass }} className="errMsg">{this.state.errPass}</span> */}
                          </div>

                          <div className="input-reg reg-pass">
                            <AvField name="re_password" placeholder="Nhập lại mật khẩu" type="password" onChange={this.handleChange} validate={{
                              required: { value: true, errorMessage: 'Nhập lại mật khẩu không được để trống' },
                              pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Nhập lại mật khẩu không hợp lệ' },
                              minLength: { value: 6, errorMessage: 'Nhập lại mật khẩu phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' },
                              maxLength: { value: 30, errorMessage: 'Nhập lại mật khẩu phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' }
                            }} />
                            {this.state.password && this.state.password === this.state.re_password ? <i className="fa fa-check-circle"></i> : null}

                            {/* <input type="password" className={this.state.errFocusRePass} name="re_password" onBlur={e => this.handleOnBlurRePassword(e)} value={this.state.re_password} onChange={event => this.handleChange(event)} placeholder="Nhập lại mật khẩu" /><i style={{ display: `${this.state.passCheck}` }} className="fa fa-check-circle"></i>
                            <span style={{ display: this.state.displayRePass }} className="errMsg">{this.state.errRePass}</span> */}
                          </div>
                          <div className="input-reg">
                            <AvField name="email" className={this.state.errFocusEmail} placeholder="Nhập email của bạn" type="text" onChange={this.handleChange} validate={{
                              required: { value: true, errorMessage: 'Email của bạn không được để trống' },
                              pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, errorMessage: 'Email của bạn không hợp lệ' },
                              minLength: { value: 6, errorMessage: 'Email của bạn phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' },
                              maxLength: { value: 30, errorMessage: 'Email của bạn phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' }
                            }} />
                             {this.state.duplicateEmail === true?<span className="errMsg">{this.state.errEmail}</span>:null}

                          </div>
                        {/* </AvForm> */}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="right-reg">
                        <div className="checkbox-reg">
                        <AvField tag={CustomInput} defaultValue={true} type="checkbox" name="customCheckbox1" label="Tôi đồng ý với điều khoản của Bizmart" validate={{
                              required: { value: true, errorMessage: 'Bạn chưa đồng ý với điều khoản của bizmart' }
                            }} />
                        </div>
                        <div className="button-reg button-registe">
                          <button className="button-click" >Đăng ký</button>
                        </div>
                        <div className="or-register">
                          <p>Hoặc đăng ký</p>
                        </div>
                        <FacebookLoginButton />

                        <GoogleLoginButton />
                        




                      </div>
                    </div>
                    </AvForm>
                  </div>
                </div>
                {/* </AvForm> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkProcess: dataProcess => dispatch(checkProcess(dataProcess)),
})
export default connect(null, mapDispatchToProps)(Register)
