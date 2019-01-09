import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import FacebookLoginButton from './FacebookLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import { Link } from "react-router-dom";
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { CustomInput } from 'reactstrap';
import axios from 'axios';
import "./styles/styles.css";
import "./styles/register.css";

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
    }
  }
  componentWillMount() {
    // console.log("hello");
    if (localStorage.getItem("tokenUser")) {
      this.handleRedirect();
      // window.location.reload();
    }
    var self = this;
    axios.get('/usersapi').then(function (dataUser) {
      // console.log(dataUser.data);
      let arrayPhone = [];
      dataUser.data.map(item => {
        arrayPhone.push(item.phone_number);
      })

      self.setState({
        phone: arrayPhone
      });

    }).catch(function (err) {
      throw err;
    })

  }
  handleChange = async (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    event.preventDefault();
    // document.getElementById("btn-reg").disabled = false;
    // var { phone_number, confirm_sms, password, re_password, email, errPass, errPhone, errConfirm, errRePass, errName, checkBoxRule } = this.state;
    // var nameForm = this.state.name;
    // if (phone_number.length != 0 && confirm_sms.length != 0 && password.length != 0 && re_password.length != 0 && nameForm.length != 0) {
    //   document.getElementById("btn-reg").disabled = false;
    // } else {
    //   document.getElementById("btn-reg").disabled = true;
    // }
    let name = event.target.name;
    let value = event.target.value;

    await this.setState({
      [name]: value
    });
    if (name == "phone_number") {
      var phoneStrim = value.trim();
      this.setState({
        phone_number: phoneStrim
      });
      if (this.state.phone) {
        this.state.phone.map(item => {
          if (item == this.state.phone_number) {
            this.setState({
              labelCheck: "block"
            });
          } else {
            this.setState({
              labelCheck: "none"
            });
          }
        })
      }
    }
    // await console.log(dataUser);
    if (name == "confirm_sms") {
      // console.log("da nhan confirm sms")
      if (this.state.codeConfirm) {
        if (value == this.state.codeConfirm) {
          this.setState({
            displayCheck: "block"
          });
        } else {
          this.setState({
            displayCheck: "none"
          });
        }
      }
    }
    await this.checkComparePass();

  }
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
    var { phone_number, confirm_sms, password, re_password, email } = this.state;
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
      axios.post('/usersapi/create', dataUser)
        .then(function (response) {
          // console.log(response);
          self.handleRedirect();
        })
        .catch(function (error) {
          console.log(error);
        });
      // this.handleRedirect();
    }
    // var { phone_number, confirm_sms, password, re_password, email, errPass, errPhone, errConfirm, errRePass, errName } = this.state;
    // var nameForm = this.state.name;
    // var salt = bcrypt.genSaltSync(10);
    // var hashPass = bcrypt.hashSync(this.state.password, salt);
    // // console.log(hashPass,"hashPass");
    // var dataUser = {
    //   phone_number: this.state.phone_number,
    //   username: this.state.name,
    //   password: hashPass,
    //   email: this.state.email,
    //   image: "https://anlinhco.vn/script/img/icon-hop-tac.png",
    //   role: "1",
    //   status: "active"
    // }
    // if (phone_number.length == 0 && confirm_sms.length == 0 && password.length == 0 && re_password.length == 0 && nameForm.length == 0) {
    //   alert("Thông tin bạn vừa nhập còn thiếu vui lòng xem lại");
    // } else if (errPass.length != 0 || errPhone.length != 0 || errConfirm.length != 0 || errRePass.length != 0 || errName.length != 0) {
    //   alert("Thông tin bạn vừa nhập chưa đúng");
    // } else {
    //   var self = this;
    //   alert("Bạn đã đăng ký thành công", hashPass);
    //   axios.post('/usersapi/create', dataUser)
    //     .then(function (response) {
    //       console.log(response);
    //       // self.handleRedirect();
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   this.handleRedirect();
    // }

  }

  handleSendSms = async () => {
    var phone_number = this.state.phone_number;
    var phoneStrim = phone_number.trim();
    if (phone_number == null || phone_number == undefined) {
      alert("truong nay khong duoc de trong")
    } else if (phoneStrim.length < 10) {
      // console.log(phone_number,"this.state.phone_number.length < 10");
      alert("sdt phai lon hon 10 so")
    } else {
      alert("Tin nhan dang gui ma xac nhan den");
      axios.post('/SMS/send', { phone: phoneStrim })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      await this.handleGetToken();
    }

  }
  handleGetToken = () => {
    var self = this
    axios.get('/SMS/token')
      .then(function (response) {
        let decoded = jwt.verify(response.data, 'shhhhh');
        self.setState({ codeConfirm: decoded.code_confirm });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleRedirect = () => {
    // this.props.history.push('/login');
    window.location.href="/login";
  }

  handleOnBlurConfirm = () => {
    if (this.state.confirm_sms.length == 0) {
      //  console.log("trong toi")
      this.setState({
        errFocusConfirm: "errFocusInput",
        displayConfirm: "block",
        errConfirm: "Xác nhận mã sms không được để trống"
      });
    } else {
      this.setState({
        errFocusConfirm: "",
        displayConfirm: "none",
        errConfirm: ""
      });
    }
  }
  handleOnBlurPhone = () => {
    if (this.state.phone_number.length == 0) {
      //  console.log("trong toi")
      this.setState({
        errFocusPhone: "errFocusInput",
        displayPhone: "block",
        errPhone: "Số điện thoại không được để trống"
      });
    } else {
      this.setState({
        errFocusPhone: "",
        displayPhone: "none",
        errPhone: ""
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
                    <a href="/login"> Đăng nhập tại đây !</a>
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
                              <NumberFormat onBlur={(e) => this.handleOnBlurPhone(e)} name="phone_number" onChange={event => this.handleChange(event)} className={this.state.errFocusPhone} placeholder="Số điện thoại" format="###########" />

                              <div className="button-SendSms" onClick={this.handleSendSms}>Gửi mã</div>

                            </div>


                            <span style={{ display: this.state.displayPhone }} className="errMsg">{this.state.errPhone}</span>
                          </div>
                          <div className="input-reg confirm">
                            <NumberFormat className={this.state.errFocusConfirm} onBlur={e => this.handleOnBlurConfirm(e)} onChange={event => this.handleChange(event)} name="confirm_sms" format="#####" mask="_" placeholder="Xác nhận mã sms" />
                            <span style={{ display: this.state.displayConfirm }} className="errMsg">{this.state.errConfirm}</span>
                            <i style={{ display: `${this.state.displayCheck}` }} className="fa fa-check-circle"></i>

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



                            <AvField name="email" placeholder="Nhập email của bạn" type="text" onChange={this.handleChange} validate={{
                              required: { value: true, errorMessage: 'Email của bạn không được để trống' },
                              pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, errorMessage: 'Email của bạn không hợp lệ' },
                              minLength: { value: 6, errorMessage: 'Email của bạn phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' },
                              maxLength: { value: 30, errorMessage: 'Email của bạn phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' }
                            }} />

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

export default Register;
