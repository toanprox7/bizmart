import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {tokenAuthorization} from "app/utils"
import OwlCarousel from 'react-owl-carousel2';
const options = {
  margin:10,
  loop:false,
  dots:false,
  nav:true,
  responsive:{
    0:{
        items:1
    },
300:{
  items:2
},
    550:{
      items:3
    },
    773:{
        items:4
    },
    1000:{
        items:5
    }
},
autoplay:false,
navText:["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"]
};
class Footer extends Component {
constructor(props) {
  super(props);
  this.state={
    displayFoot:"block",
    displayIntro:false,
    displaySubpost:false,
    displayNew:false
  }
}

componentDidMount = () => {
  axios.post("/banner/list",{category_banner:"3"},{
    headers: {
      'authorization':tokenAuthorization,
    }
  })
  .then(res=> {
    this.setState({
      record:res.data
    });
  })
  .catch(err => console.log(err));
}

    render() {
        return (
            <footer style={{display:this.state.displayFoot}}>
            <div className="top-footer">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <OwlCarousel ref="car" options={options} >
                  {this.state.record && this.state.record.length > 0?this.state.record.map((record,index) =>(
  <div key={index} className="item">
  <Link to={record.link}><img src={`/images/upload/${record.image}`} alt="logo" /></Link>
</div>
                  )):null}
                    
                     
                      </OwlCarousel>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-main-footer">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-info-main-footer-inside">
                    <div onClick={() =>{
this.setState({
displayIntro:!this.state.displayIntro
});
                    }} className="title-display-footer title-info-main-footer1">
                      <h2>Giới thiệu</h2>
                    </div>
                    <ul className={this.state.displayIntro ===true?"active-footer":"info-display-main-footer"}>
                      <li><a href="#">Về chúng tôi</a></li>
                      <li><a href="#">Dịch vụ cung cấp</a></li>
                      <li><a href="#">Quy định sử dụng</a></li>
                      <li><Link to="/contact">Thông tin liên hệ</Link></li>
                    </ul>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-info-main-footer-inside">
                    <div onClick={() =>{
this.setState({
displaySubpost:!this.state.displaySubpost
});
                    }} className="title-display-footer title-info-main-footer2">
                      <h2>Hỗ trợ khách hàng</h2>
                    </div>
                     <ul className={this.state.displaySubpost ===true?"active-footer":"info-display-main-footer"}>
                      <li><a href="#">Hướng dẫn mua hàng</a></li>
                      <li><a href="#">Chính sách giao hàng</a></li>
                      <li><a href="#">Bảo mật thông tin</a></li>
                      <li><a href="#">Bảo hành sản phẩm</a></li>
                    </ul>

                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-info-main-footer-inside">
                    <div onClick={() =>{
this.setState({
displayNew:!this.state.displayNew
});
                    }} className="title-display-footer title-info-main-footer3">
                      <h2>Tin tức</h2>
                    </div>

                   <ul className={this.state.displayNew ===true?"active-footer":"info-display-main-footer"}>
                      <li><a href="#">Khuyến mãi</a></li>
                      <li><a href="#">Tin tức</a></li>
                    </ul>

                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="icon-social text-right">
                      <a href="#"><i className="fa fa-facebook-square" /></a>
                      <a href="#"><i className="fa fa-twitter-square" /></a>
                      <a href="#"><i className="fa fa-google-plus-square" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block-info-contact-footer">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                    <div className="info-contact-footer">
                      <p>Công ty TNHH thương mại Bizmart Việt Nam</p>
                      <p>Địa chỉ: Số 21, Lê Đức Thọ, Nam Từ Liêm, Hà Nội</p>
                      <p>Hotline: 1900 68 88</p>
                      <p>Email: trangbizmart@gmail.com</p>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                    <div className="email-footer">
                      <input type="email" placeholder="Nhập email của bạn" />
                      <button>Đăng kí</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="empty-last-footer" />
          </footer>

        );
    }
}

export default Footer;
