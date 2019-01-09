import React, { Component } from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";
import ReactLoading from 'react-loading';
import { withRouter} from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Container,
  Row,
  Col
} from 'reactstrap';
import { Alert } from 'reactstrap';
const Loading = () => (
  <ReactLoading type="spin" color="green" height="5%" width="5%" />
  );
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state={
      isLoadding:false,
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
      errUser:"",
      displayErrUser:"none",
      visible: true,
      displayOpacity:0
    }
  }

  componentWillMount() {
    var self=this;
    var tokenAdmin = localStorage.getItem('acess_admin');
  if(tokenAdmin){
  // console.log(tokenAdmin,"toke");
  try {
    var decoded = jwt.verify(tokenAdmin, 'toanpro');

  if(!decoded){
    this.props.history.push('/admin');
  }else{
    this.props.history.push('/admin/products/%20/page-1.html');
  }
  } catch(err) {
    // err
  this.props.history.push('/admin');
  }

  }else if(!tokenAdmin){
  // this.props.history.push('/admin');
  this.props.history.push('/admin');
  }
  }


  _handleKeyPress = async (e) => {
    // e.preventDefault();
    if (e.key === 'Enter') {
      await this.handleClick();
    }
  }
  handleSubmit(e){
    e.preventDefault();
  }
  handleClick(e){
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
if(this.state.isToggle == false){

    if(this.state.phone_or_email && this.state.password != ""){
      this.setState({
        isLoadding:true
      });
      if(re.test(this.state.phone_or_email) == true){
        let self=this;
        axios.post('/usersapi/loginAdmin',{email:this.state.phone_or_email,password:this.state.password}).then(function (res) {
        if(res.data.data == "err"){
          self.setState({
            isLoadding:false,
            errUser:"Tài khoản hoặc mật khẩu không đúng",
            displayErrUser:"block"
          });
        }else{
          var token = jwt.sign(res.data.data.id, 'toanpro');
          localStorage.setItem("acess_admin",token);
          self.setState({
            isLoadding:false
          });
          self.props.history.push('/admin/products/%20/page-1.html');
        }
        }).catch(function (err) {
          console.log(err);
        })
      }else{
        let self=this;
        axios.post('/usersapi/loginAdmin',{phone_number:this.state.phone_or_email,password:this.state.password}).then(function (res) {
          if(res.data.data == "err"){
            self.setState({
              isLoadding:false,
              errUser:"Tài khoản hoặc mật khẩu không đúng",
              displayErrUser:"block"
            });
          }else{
            var token = jwt.sign(res.data.data.id, 'toanpro');
            localStorage.setItem("acess_admin",token);
            self.setState({
              isLoadding:false
            });
            self.props.history.push('/admin/products/%20/page-1.html');
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    }else if(!this.state.phone_or_email && this.state.password != ""){
      this.setState({
        errFocusUsername:"errFocusInput",
        displayUsername:"block",
        errUsername:"Username không được để trống"
      });
    }else if(this.state.phone_or_email && this.state.password == ""){
      this.setState({
        errFocusPass:"errFocusInput",
        displayPass:"block",
        errPass:"Mật khẩu không được để trống"
      });
    }else if(!this.state.phone_or_email && this.state.password == ""){
      this.setState({
        errFocusPass:"errFocusInput",
        displayPass:"block",
        errPass:"Mật khẩu không được để trống",
        errFocusUsername:"errFocusInput",
        displayUsername:"block",
        errUsername:"Username không được để trống"
      });
    }else if(!this.state.phone_or_email && this.state.errPass != ""){
      this.setState({
        errFocusPass:"errFocusInput",
        displayPass:"block",
        errFocusUsername:"errFocusInput",
        displayUsername:"block",
        errUsername:"Username không được để trống"
      });
    }else if(this.state.errUsername != "" && this.state.password == ""){
      this.setState({
        errFocusPass:"errFocusInput",
        displayPass:"block",
        errPass:"Mật khẩu không được để trống",
        errFocusUsername:"errFocusInput",
        displayUsername:"block",
      });
    }else if(this.state.errUsername != "" && this.state.errPass != ""){
      this.setState({
        errFocusPass:"errFocusInput",
        displayPass:"block",
        errFocusUsername:"errFocusInput",
        displayUsername:"block",
      });
    }else if(this.state.phone_or_email && this.state.errPass != ""){
      this.setState({
        errFocusPass:"errFocusInput",
        displayPass:"block",
      });
    }
}else{
if(this.state.phone_or_email != ""){

  var self=this;
  if(re.test(this.state.phone_or_email) == true){
    this.setState({
      isLoadding:true
    });
    var tokenEmail = jwt.sign({ email:this.state.phone_or_email }, 'toanpro',{ expiresIn: 30 * 30 });
    axios.post("/usersapi/sendEmail",{email:this.state.phone_or_email,token:tokenEmail}).then(function (res) {
      if(res.data){
        self.setState({
        displayOpacity:1,
        isLoadding:false
        })
  self.handleAlert();
      }else{
        self.setState({
          displayOpacity:0,
          isLoadding:false
          })
      }
    }).catch(function (err) {
      console.log(err);
    })
  }else{
    this.setState({
      errFocusUsername:"errFocusInput",
      displayUsername:"block",
      errUsername:"Email không đúng"
    });
  }
}else{
  this.setState({
    errFocusUsername:"errFocusInput",
    displayUsername:"block",
    errUsername:"Email không được trống"
  });
}
}

  }

  handleAlert(){
    var self = this;
    setTimeout(() => {
      self.setState({
        displayOpacity:0,
      })
    }, 3500);
  }
 validateEmail =(email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

   async handleChange(e){
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {value,name}=e.target;
     await this.setState({
      [name]:value,
      displayErrUser:"none"
    });

    if(this.state.phone_or_email){
    if(re.test(this.state.phone_or_email) == true){
      await this.setState({
      email:this.state.phone_or_email,
      phone_number:""
      });
    }else{
      await this.setState({
      phone_number:this.state.phone_or_email,
      email:""
      });
    }
  }

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
    componentWillUnmount() {
      console.log("unmount");
      this.setState({
        isLoadding:false,
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
        errUser:"",
        displayErrUser:"none",
        visible: true,
        displayOpacity:0
      })
    }

    handleClickBtn(e){
this.setState({
isToggle:!this.state.isToggle,
phone_or_email:"",
phone_number:"",
email:"",
errFocusUsername:"",
displayUsername:"none",
errUsername:"",
errFocusPass:"",
displayPass:"none",
password:"",
errPass:"",
errUser:"",
displayErrUser:"none"
});
    }
    onDismiss() {
      this.setState({ visible: false });
    }
  render() {
    return (

       <Container style={{minHeight:"100%"}}>

         <Col md="3">

         </Col>

         <Col md="6">
         <Alert color="success" style={{position:"fixed",top:"20px",left:"20px",opacity:this.state.displayOpacity}} isOpen={this.state.visible} toggle={() => this.onDismiss()}>
        {`Đã  gửi tới email ${this.state.phone_or_email}`}
      </Alert>
         <div style={{
           border:"1px solid green",
           padding:"20px 40px",
           marginTop:"30%"}}>
         <h3 style={{
           color:"green"
           }}>{(this.state.isToggle==true)?"Quên mật khẩu?":"Đăng Nhập tài khoản"}</h3>
         <Form style={{display:(this.state.isToggle == true)?"none":"block"}} onSubmit={this.handleSubmit}>
         <span style={{display:this.state.displayErrUser,color:"red",
            marginBottom:"5px",
            marginTop:"20px",
              }} className="errMsg">{this.state.errUser}</span>
          <Input
            style={{
            height:"40px",
            borderRadius:"0",
            }}
            className={this.state.errFocusUsername}
            type="text"
            onKeyPress={this._handleKeyPress}
            onChange={(e) => this.handleChange(e)}
            name="phone_or_email"
            placeholder="Nhập email hoặc số điện thoại của bạn "
value={this.state.phone_or_email}
            onBlur={(e) => this.handleOnBlurUsername(e)}
            />
             <span style={{display:this.state.displayUsername,color:"red",
            marginBottom:"20px"
              }} className="errMsg">{this.state.errUsername}</span>
          <Input style={{
            marginTop:"20px",
            height:"40px",
            borderRadius:"0",
            }}
            className={this.state.errFocusPass}
            value={this.state.password}
            type="password"
            onKeyPress={this._handleKeyPress}
            name="password"
            placeholder="Nhập password của bạn "
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleOnBlurPassword(e)}
            />
            <span style={{display:this.state.displayPass,color:"red",
            marginBottom:"20px"}} className="errMsg">{this.state.errPass}</span>
          <Input onClick={(e) => this.handleClick(e)} style={{
            margin:"20px 0",
            background:"green",
            color:"white",
            border:"1px solid green",
            height:"40px",
            fontWeight:"bold",
            borderRadius:"0",
            }} type="submit" value={(this.state.isLoadding == true)?"Loadding":"Đăng Nhập"} />
            {(this.state.isLoadding == true)?
              <Loading />:null
            }
        </Form>
        <Form style={{display:(this.state.isToggle == false)?"none":"block"}} onSubmit={this.handleSubmit}>
         <span style={{display:this.state.displayErrUser,color:"red",
            marginBottom:"5px",
            marginTop:"20px",
              }} className="errMsg">{this.state.errUser}</span>
          <Input
            style={{

            height:"40px",
            borderRadius:"0",
            }}
            value={this.state.phone_or_email}
            className={this.state.errFocusUsername}
            type="text"
            onKeyPress={this._handleKeyPress}
            onChange={(e) => this.handleChange(e)}
            name="phone_or_email"
            placeholder="Nhập email hoặc số điện thoại của bạn "
            onBlur={(e) => this.handleOnBlurUsername(e)}
            />
             <span style={{display:this.state.displayUsername,color:"red",
            marginBottom:"20px"
              }} className="errMsg">{this.state.errUsername}</span>

          <Input onClick={(e) => this.handleClick(e)} style={{
            margin:"20px 0",
            background:"green",
            color:"white",
            border:"1px solid green",
            height:"40px",
            fontWeight:"bold",
            borderRadius:"0",
            }} type="submit" value={(this.state.isLoadding == true)?"Loadding":"Gửi đi"} />
            {(this.state.isLoadding == true)?
              <Loading />:null
            }
        </Form>
        </div>
        <Button style={{
          fontSize:"16px",
          height:"45px",
          width:"100%",
          border:"1px solid green",
          borderRadius:"0",
          borderTop:"none",
// marginBottom:"300px"
           }}
           onClick={(e) => this.handleClickBtn(e)}>{(this.state.isToggle==false)?"Quên mật khẩu?":"Đăng Nhập tài khoản"}</Button>
         </Col>

         <Col md="3">

         </Col>
       </Container>

    );
  }
}

export default withRouter(Admin);
