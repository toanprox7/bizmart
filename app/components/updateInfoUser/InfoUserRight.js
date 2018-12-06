import React, { Component } from 'react';
import {connect} from "react-redux";
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
handleUpdateSubmit(){
  // console.log(this.state.email);
  var info={
    email:this.state.email,
    phone_number:this.state.phone_number,
    username:this.state.username,
    id:this.state.id
  }
  if(this.state.email == "" || this.state.phone_number=="" || this.state.username == ""){
    alert("Vui lòng điền đầy đủ các trường")
  }else{
    axios.post("/usersapi/updateInfo",info).then(function (res) {
      console.log(res);
    }).catch(function (err) {
    console.log(err);
    })
    this.props.history.push("/");
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
        <div className="block-info-product-post">
          <div className="user-sell-phone-info-post">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="user-sell-info-post">
                  <label>Tên người bán</label>
                  <input onChange={(e) => this.handleChange(e)} placeholder="Nhập họ và tên của bạn" name="username" value={this.state.username} type="text" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="phone-info-post">
                  <label>Số điện thoại</label>
                  <input onChange={(e) => this.handleChange(e)} name="phone_number" placeholder="Nhập số điện thoại của bạn" value={this.state.phone_number} type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="email-info-post">
            <label>Email</label>
            <input onChange={(e) => this.handleChange(e)} name="email" value={this.state.email} type="email" placeholder="Nhập email của bạn" />
          </div>
          <div className="button-post-new">
            <button onClick={() => this.handleUpdateSubmit()}>Cập nhật</button>
          </div>
        </div>
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

