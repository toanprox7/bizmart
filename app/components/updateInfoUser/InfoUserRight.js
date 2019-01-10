import React, { Component } from 'react';
import {connect} from "react-redux";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from "axios";
class InfoUserRight extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:"",
      phone_number:"",
      username:""
    }
  }

  componentWillMount() {
    var token = localStorage.getItem("tokenUser");
    if(!token){
      this.props.history.push("/login");
    }
  }

componentWillReceiveProps(nextProps) {
  // console.log(nextProps.dataUser[0]);
  this.setState({
    email:nextProps.dataUser[0].email,
    username:nextProps.dataUser[0].username,
    id:nextProps.dataUser[0].id,
    phone_number:nextProps.dataUser[0].phone_number
  });
}

handleChange(e){
  let name = e.target.name;
  let value = e.target.value;
  this.setState({
    [name]:value
  });
}
handleUpdateSubmit(event, errors, values){
  // console.log(errors,"err");
  var self=this;
  if(errors.length === 0){
    var info={
      email:this.state.email,
      phone_number:this.state.phone_number,
      username:this.state.username,
      id:this.state.id
    }
    axios.post("/usersapi/updateInfo",info).then(function (res) {
      console.log(res);
    }).catch(function (err) {
    console.log(err);
    })
window.location.href="/";
  }


}
  render() {
    // console.log(this.checkUser(),"tets");
    return (
      <div className="post-new">
      <div className="block-post-new">
        <div className="title-post-new">
          <h3>Cập nhật thông tin tài khoản</h3>
        </div>
        <AvForm onSubmit={(event, errors, values) => this.handleUpdateSubmit(event, errors, values)}>
        <div className="block-info-product-post">
          <div className="user-sell-phone-info-post">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="user-sell-info-post">
                <AvField
                  name="username"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.username} placeholder="Nhập họ và tên của bạn" label="Tên người bán" type="text" validate={{
            required: {value: true, errorMessage: 'Tên người bán không được để trống'},
            pattern: {value: '^[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ ]+$', errorMessage: 'Tên người bán không hợp lệ'},
            minLength: {value: 5, errorMessage: 'Tên người bán ít nhất phải gồm 5 ký tự đến 30 ký tự'},
            maxLength: {value: 30, errorMessage: 'Tên người bán ít nhất phải gồm 5 ký tự đến 30 ký tự'}
          }} />
                  {/* <label>Tên người bán</label>
                  <input onChange={(e) => this.handleChange(e)} placeholder="Nhập họ và tên của bạn" name="username" value={this.state.username} type="text" /> */}
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="phone-info-post">
                  {/* <label>Số điện thoại</label> */}
                  <AvField
                  name="phone_number"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.phone_number} placeholder="Nhập số điện thoại của bạn" label="Số điện thoại" type="text" validate={{
            required: {value: true, errorMessage: 'Số điện thoại không được để trống'},
            pattern: {value: '^[0-9]+$', errorMessage: 'Số điện thoại không hợp lệ'},
            minLength: {value: 8, errorMessage: 'Số điện thoại ít nhất phải gồm 8 ký tự đến 11 ký tự'},
            maxLength: {value: 11, errorMessage: 'Số điện thoại ít nhất phải gồm 8 ký tự đến 11 ký tự'}
          }} />
                  {/* <input onChange={(e) => this.handleChange(e)} name="phone_number" placeholder="Nhập số điện thoại của bạn" value={this.state.phone_number} type="text" /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="email-info-post">
          <AvField
                  name="email"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.email} placeholder="Nhập email của bạn" label="Email" type="email" validate={{
            minLength: {value: 8, errorMessage: 'Email ít nhất phải gồm 8 ký tự đến 30 ký tự'},
            maxLength: {value: 30, errorMessage: 'Email ít nhất phải gồm 8 ký tự đến 30 ký tự'}
          }} />
            {/* <label>Email</label>
            <input onChange={(e) => this.handleChange(e)} name="email" value={this.state.email} type="email" placeholder="Nhập email của bạn" />*/}
          </div>
          <div className="button-post-new">
            <button>Cập nhật</button>
          </div>
        </div>
        </AvForm>
      </div>
    </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    dataUser: state.usersReducer.dataUserLocal
  }
}

export default connect(mapStateToProps)(InfoUserRight)

