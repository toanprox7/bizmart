import React, { Component } from 'react';

class LoginRight extends Component {
    render() {
        return (
            <div className="right-login">
            <div className="checkbox-login">
              <label>
                <input type="checkbox" checked />
                <span>Tôi đồng ý với điều khoản của Bizmart</span>
              </label>
            </div>
            <div className="button-login">
              <button>Đăng nhập</button>
            </div>
            <div className="or-login">
              <p>Hoặc đăng nhập</p>
            </div>
            <div className="button-login-fb">
              <div className="fb-circle">
                <i className="fa fa-facebook" />
              </div>
              <div className="txt-fb">
                <p>Đăng ký bằng Facebook</p>
              </div>
            </div>
            <div className="button-login-email">
              <div className="email-circle">
                <i className="fa fa-envelope-o" />
              </div>
              <div className="txt-email">
                <p>Đăng ký bằng Facebook</p>
              </div>
            </div>
          </div>
        
        );
    }
}

export default LoginRight;