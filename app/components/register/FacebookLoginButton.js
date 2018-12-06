import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import {withRouter} from "react-router-dom";
var jwt = require("jsonwebtoken");
class FacebookLoginButton extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  componentClicked=()=>{

    if(this.state.id){
      let infoApiUserFacebook={
        id:this.state.id,
        username:this.state.username,
        image:this.state.image,
        email:this.state.email,
        role:"2",
        status:"active"
      }
      var tokenUser = jwt.sign(infoApiUserFacebook, 'toanpro');
       localStorage.setItem("tokenUser",tokenUser);
      // console.log(this.state.id);
      axios.post("/usersapi/createFacebookApi",infoApiUserFacebook)
        .then(function(){
          console.log("ngon");
        }).catch(function(err){
          throw err
        })
        // window.location.reload();
       this.handleRedirect();
    }
  }
  handleRedirect = () => {
   this.props.history.push('/');

  setTimeout(() => {
    window.location.reload()
  }, 700);

  }
  responseFacebook=(res)=>{
    this.setState({
      email:res.email,
      username:res.name,
      id:res.id,
      image:res.picture.data.url
    });
  }
  render() {
    return (
 <div className="login-facebook">
   <FacebookLogin
    appId="193083074974491"
    autoLoad={true}
    fields="name,email,picture"
    onClick={this.componentClicked}
    callback={this.responseFacebook}
    icon="fa-facebook"
    render={renderProps => (
      <button onClick={renderProps.onClick}>Đăng ký bằng Facebook</button>
    )}
    cssClass="my-facebook-button-class"

    />

              {/* <div className="fb-circle">
                <i className="fa fa-facebook" />
              </div>
              <div className="txt-fb">
                <p>Đăng ký bằng Facebook</p>
              </div> */}
            </div>
    );
  }
}

export default withRouter(FacebookLoginButton);
