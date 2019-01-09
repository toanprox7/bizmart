import React, { Component } from 'react';
import jwt from "jsonwebtoken";
class VerifyPassword extends Component {
constructor(props) {
  super(props);

}

componentWillMount() {
  let tokenPass = this.props.match.params.tokenEmail;
  if(tokenPass){
var self=this;
    jwt.verify(tokenPass, 'toanpro', function(err, decoded) {
      if(err){
        alert("token đã hết hạn hoặc không đúng vui lòng thử lại");
        // self.props.history.push('/admin');
        window.location.href="/admin";
      }else if(decoded.email){
        localStorage.setItem("access_email",tokenPass);
        // self.props.history.push("/admin/forget-password.html");
    
        window.location.href="/admin/forget-password.html";
      }
    });
  }
}

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default VerifyPassword;
