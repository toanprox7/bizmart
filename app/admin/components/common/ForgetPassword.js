import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import "./styles/forgetPassword.css"
import ReactLoading from 'react-loading';
import jwt from "jsonwebtoken";
import axios from "axios"
import { Button,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert } from 'reactstrap';
  var bcrypt = require('bcryptjs');
  const Loading = () => (
    <ReactLoading type="spin" color="green" height="5%" width="5%" />
    );
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state={
      displayOpacity:0,
      colorBackground:"#00800000",
      verify:false,
      isLoadding:false,
      errComparePass:"",
      displayErrComparePass:"none"
    }
  }

  componentWillMount() {
    var self=this;
    var tokenEmail = localStorage.getItem("access_email");
if(tokenEmail){
  jwt.verify(tokenEmail, 'toanpro', function(err, decoded) {
    if(err){
      self.props.history.push("/admin");
    }
  });
}else if(!tokenEmail){
      this.props.history.push("/admin")
    }
  }

  async handleChange(e){
    // console.log(e.target.value)
    const {name,value} = e.target;
    await this.setState({
    [name]:value,
    errComparePass:"",
    displayErrComparePass:"none"
    });
    if(this.state.password == this.state.re_password){
      await this.setState({
        colorBackground:"#0080004a",
        verify:true
      });
    }else{
      await this.setState({
        colorBackground:"#00800000",
        verify:false
      });
    }
  }
  handleRedirect(){
    var self = this;
    setTimeout(() => {
      self.setState({
        displayOpacity:0,
      })
      // self.props.history.push("/admin");
      window.location.href = "/admin";
    }, 3500);
  }

  render() {
    return (
      <Container>

         <Col md="3">

         </Col>

         <Col md="6">
         <Alert color="success" style={{position:"fixed",top:"20px",left:"20px",opacity:this.state.displayOpacity}} isOpen={this.state.visible} toggle={() => this.onDismiss()}>
        {`Bạn đã đổi mật khẩu thành công`}
      </Alert>
         <div style={{
           border:"1px solid green",
           padding:"20px 40px",
           marginTop:"30%"}}>
         <h3 style={{
           color:"green"
           }}>Đổi mật khẩu</h3>
      <AvForm onSubmit={(event, errors, values) => {
if(errors.length === 0){
if(this.state.verify == true && this.state.password){
  var self =this;
var tokenEmail = localStorage.getItem("access_email");
jwt.verify(tokenEmail, 'toanpro', function(err, decoded) {
  if(err){
console.log(err);
  }else if(decoded.email){
    self.setState({
isLoadding:true
});
// console.log(decoded.email);
var salt = bcrypt.genSaltSync(10);
var hashPass = bcrypt.hashSync(self.state.password, salt);
axios.post("/usersapi/changePassword",{email:decoded.email,password:hashPass}).then(function (res) {
if(res){
  localStorage.removeItem("access_email");
  self.setState({
    isLoadding:false,
    displayOpacity:1,
    });
    self.handleRedirect();
}else{
  localStorage.removeItem("access_email");
  self.setState({
    isLoadding:false,
    displayOpacity:1,
    });
    self.handleRedirect();
}


}).catch(function (err) {
  console.log(err);
})
  }else{
    alert("token đã hết hạn hoặc không đúng vui lòng thử lại");
    self.props.history.push("/admin");

  }
});
// console.log(this.state.password, this.state.re_password);
}else{
  // console.log("ko khop");
  this.setState({
    errComparePass:"Mật khẩu bạn nhập không khớp",
    displayErrComparePass:"block"
  });
}
      }}}>
      <span style={{display:this.state.displayErrComparePass,color:"red",
            marginBottom:"5px",
            marginTop:"20px",
              }} className="errMsg">{this.state.errComparePass}</span>
        <AvField
            onChange={(e) => this.handleChange(e)}
            style={{
            background:this.state.colorBackground,
            height:"40px",
            borderRadius:"0",
            }} name="password" type="password" placeholder="Nhập mật khẩu của bạn" validate={{
            required: {value: true, errorMessage: 'Mật khẩu của bạn không được để trống'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'không đúng định dạng mẫu cho trước'},
            minLength: {value: 6, errorMessage: 'mật khẩu của bạn ít nhất phải 6 ký tự và nhiều nhất là 15 ký tự'},
            maxLength: {value: 15, errorMessage: 'mật khẩu của bạn ít nhất phải 6 ký tự và nhiều nhất là 15 ký tự'}
          }} />
        <AvField
            onChange={(e) => this.handleChange(e)}
            style={{
            background:this.state.colorBackground,
            marginTop:"20px",
            height:"40px",
            borderRadius:"0",
            }} name="re_password" type="password" placeholder="Nhập lại mật khẩu của bạn" validate={{
            required: {value: true, errorMessage: 'Nhập lại mật khẩu của bạn không được để trống'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'không đúng định dạng mẫu cho trước'},
            minLength: {value: 6, errorMessage: 'mật khẩu của bạn ít nhất phải 6 ký tự và nhiều nhất là 15 ký tự'},
            maxLength: {value: 15, errorMessage: 'mật khẩu của bạn ít nhất phải 6 ký tự và nhiều nhất là 15 ký tự'}
          }} />

        <Button
          style={{
          fontWeight:"bold",
          borderRadius:0,
          margin:"20px",
          marginLeft:0,
          height:"40px"
          }} color="success">Đổi mật khẩu</Button>
            {(this.state.isLoadding == true)?
              <Loading />:null
            }
        <Button style={{
          fontWeight:"bold",
          borderRadius:0,
          margin:"20px",
          height:"40px"
          }}
          color="danger"
          onClick={(e) => {
            localStorage.removeItem("access_email");
            this.props.history.push("/admin")
          }}
          >Hủy bỏ</Button>

      </AvForm>
      </div>
      </Col>
         <Col md="3">

         </Col>
  </Container>
    );
  }
}

export default ForgetPassword;
