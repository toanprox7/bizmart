import React, { Component } from 'react';

class RegisterLeft extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  async handleChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    event.preventDefault();
    let name=await event.target.name;
    let value=await event.target.value;

    await this.setState({
      [name]:value
    });

    let dataUser=await {
      phone_number:this.state.phone_number,
      confirm_sms:this.state.confirm_sms,
      name:this.state.name,
      password:this.state.password,
      re_password:this.state.re_password,
      email:this.state.email
    }
    await this.props.dataUserRegister(dataUser);

  }
    render() {
      // console.log(this.st)
        return (
                <div className="left-register">
                  <div className="input-reg send-code">
                    <input type="text" name="phone_number" onChange={event => this.handleChange(event)} placeholder="Số điện thoại" />
                    <button>Gửi mã</button>
                  </div>
                  <div className="input-reg">
                    <input type="text" name="confirm_sms" onChange={event => this.handleChange(event)} placeholder="Xác nhận mã sms" />
                  </div>
                  <div className="input-reg">
                    <input type="text" name="name" onChange={event => this.handleChange(event)} placeholder="Họ và tên" />
                  </div>
                  <div className="input-reg">
                    <input type="text" name="password" onChange={event => this.handleChange(event)} placeholder="Mật khẩu" />
                  </div>
                  <div className="input-reg">
                    <input type="text" name="re_password" placeholder="Nhập lại mật khẩu" />
                  </div>
                  <div className="input-reg">
                    <input type="text" name="email" placeholder="Nhập email của bạn" />
                  </div>
                </div>

        );
    }
}

export default RegisterLeft;
