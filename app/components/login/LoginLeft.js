import React, { Component } from 'react';

class LoginLeft extends Component {
    render() {
        return (
        <div className="left-login">
            <div className="input-login">
              <input type="text" placeholder="Email/Số Điện Thoại/Tên đăng nhập" />
            </div>
            <div className="input-login pass-padd">
              <input type="text" placeholder="Mật khẩu" />
            </div>
            <div className="forget-or-help-login">
              <div className="forget-login">
                <a href="#">Quên mật khẩu</a>
              </div>
              <div className="help-login">
                <a href="#">Cần trợ giúp?</a>
              </div>
            </div>
          </div>
        
        );
    }
}

export default LoginLeft;