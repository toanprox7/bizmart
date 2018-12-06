import React, { Component } from 'react';
import "./styles/register.css"
class RegisterRight extends Component {

    render() {
      // console.log(this.props.dataUserRegister);
        return (
            <div className="right-reg">
            <div className="checkbox-reg">
              <label>
                <input type="checkbox" checked />
                <span>Tôi đồng ý với điều khoản của Bizmart</span>
              </label>
            </div>
            <div className="button-reg">
              <button>Đăng ký</button>
            </div>
            <div className="or-register">
              <p>Hoặc đăng ký</p>
            </div>
            <div className="button-reg-fb">
              <div className="fb-circle">
                <i className="fa fa-facebook" />
              </div>
              <div className="txt-fb">
                <p>Đăng ký bằng Facebook</p>
              </div>
            </div>
            <div className="button-reg-email">
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

export default RegisterRight;
