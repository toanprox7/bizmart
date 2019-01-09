import React, { Component } from 'react';
import "./styles/contact.css";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from "axios";
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:"",
      phone_number:"",
email:"",
address:"",
content:""
    }
  }
  handleChange(e){

    e.preventDefault();
let {name,value}=e.target;
// console.log(value);
    this.setState({
      [name]:value
    });
  }
  handleSubmit(events,errors,value){
if(errors.length === 0){
console.log("no err");
}
  }
  handleReset(){
    // console.log(e.target.value);
    this.setState({
      name:"",
      phone_number:"",
email:"",
address:"",
content:""
    });
  }


  render() {
    return (
<div id="main">
  <div className="container">
    <div className="contacts">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="block-map">
            <div className="search-map">
              <input type="text" placeholder="Tìm kiếm cửa hàng trên bản đồ" />
              <i className="fa fa-search" />
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9758299170567!2d105.76827761423675!3d21.03365308599576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b9e06e8b1d%3A0x3e2575ce0e42525c!2zU-G7kSAyMSBMw6ogxJDhu6ljIFRo4buNLCBLxJBUIE3hu7kgxJDDrG5oIDIsIFThu6sgTGnDqm0sIEjDoCBO4buZaSwgMjEgxJDGsOG7nW5nIEzDqiDEkOG7qWMgVGjhu40sIE3hu7kgxJDDrG5oLCBU4burIExpw6ptLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1541299288835" width="100%" height={540} frameBorder={0} style={{border: 0}} allowFullScreen />
          </div>
          <div className="block-contact">
            <div className="title-contact">
              <h3>Liên hệ với chúng tôi</h3>
              <p>Xin cảm ơn mọi ý kiến đóng góp của các bạn cho chúng tôi!</p>
              <p>Mời các bạn điền đầy đủ thông tin vào các mục sau:</p>
            </div>
            <div className="row">
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              </div>
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div className="form-contact">
                <AvForm onSubmit={this.handleSubmit}>
                  <div className="item-contact">
                     <span>Họ Và Tên:</span>
                    {/* <input type="text" />  */}
                    <AvField value={this.state.name} placeholder="Họ và tên" onChange={(e) => this.handleChange(e)} name="name" type="text" validate={{
            required: {value: true, errorMessage: 'Họ và tên không được để trống'},
            pattern: {value: /^[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]*\s?[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]+$/i, errorMessage: 'Họ và tên không hợp lệ'},
            minLength: {value: 6, errorMessage: 'Họ và tên phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự'},
            maxLength: {value: 30, errorMessage: 'Họ và tên phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự'}
          }} />
                  </div>
                  <div className="item-contact">
                     <span>Email:</span>
                    {/* <input type="text" />  */}
                    <AvField value={this.state.email} onChange={(e) => this.handleChange(e)} name="email" placeholder="Nhập email của bạn" type="text" validate={{
                              required: { value: true, errorMessage: 'Email của bạn không được để trống' },
                              pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, errorMessage: 'Email của bạn không hợp lệ' },
                              minLength: { value: 6, errorMessage: 'Email của bạn phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' },
                              maxLength: { value: 30, errorMessage: 'Email của bạn phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 30 kí tự' }
                            }} />
                  </div>
                  <div className="item-contact">
                     <span>Địa chỉ:</span>
                    {/* <input type="text" /> */}
                              <AvField value={this.state.address} onChange={(e) => this.handleChange(e)} name="address" placeholder="Nhập địa chỉ của bạn" type="text" />
                  </div>
                  <div className="item-contact">
                    <span>Sđt:</span>
                    {/* <input type="text" /> */}
                    <AvField value={this.state.phone_number} onChange={(e) => this.handleChange(e)} name="phone_number" placeholder="Nhập phone của bạn" type="text" validate={{
                              required: { value: true, errorMessage: 'Số điện thoại của bạn không được để trống' },
                              pattern: { value:'^[0-9]+$', errorMessage: 'Số điện thoại của bạn không hợp lệ' },
                              minLength: { value: 8, errorMessage: 'Số điện thoại của bạn phải sử dụng ít nhất là 8 kí tự và nhiều nhất là 13 kí tự' },
                              maxLength: { value: 13, errorMessage: 'Số điện thoại của bạn phải sử dụng ít nhất là 6 kí tự và nhiều nhất là 13 kí tự' }
                            }} />
                  </div>
                  <div className="item-contact">
                    <span>Nội dung:</span>
                    {/* <textarea defaultValue={""} /> */}
                    <AvField value={this.state.content} onChange={(e) => this.handleChange(e)} name="content" placeholder="Nhập nội dung của bạn" type="text" validate={
                      {required:{value:true,errorMessage:'Nội dung không được để trống'}}
                    } />
                  </div>
                  <div className="button-send-and-rerep">
                    <button type="reset" onClick={()=>this.handleReset()} className="rerep">Nhập lại</button>
                    <button className="send">Gửi</button>
                  </div>
                  </AvForm>
                </div>

              </div>

              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</div>

    );
  }
}

export default Contacts;
