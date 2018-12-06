import React, { Component } from 'react';
import {Link} from "react-router-dom";
class Footer extends Component {
    render() {
        return (
            <footer>
            <div className="top-footer">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="owl-carousel owl-two">
                      <div className="item">
                        <a href="#"><img src="/images/logo_aliki.png" alt="logo" /></a>
                      </div>
                      <div className="item">
                        <a href="#"><img src="/images/logo_holding.png" alt="logo" /></a>
                      </div>
                      <div className="item">
                        <a href="#"><img src="/images/logo_aliki.png" alt="logo" /></a>
                      </div>
                      <div className="item">
                        <a href="#"><img src="/images/logo_holding.png" alt="logo" /></a>
                      </div>
                      <div className="item">
                        <a href="#"><img src="/images/logo_aliki.png" alt="logo" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>			
            <div className="info-main-footer">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-info-main-footer-inside">
                    <div className="title-display-footer title-info-main-footer1">
                      <h2>Giới thiệu</h2>
                    </div>
                    <ul className="info-display-main-footer block-info-footer-li1">
                      <li><Link to="/admin">Về chúng tôi</Link></li>
                      <li><a href="#">Dịch vụ cung cấp</a></li>
                      <li><a href="#">Quy định sử dụng</a></li>
                      <li><Link to="contact">Thông tin liên hệ</Link></li>
                    </ul>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-info-main-footer-inside">
                    <div className="title-display-footer title-info-main-footer2">
                      <h2>Hỗ trợ khách hàng</h2>
                    </div>
                    <ul className="info-display-main-footer block-info-footer-li2">
                      <li><a href="#">Hướng dẫn mua hàng</a></li>
                      <li><a href="#">Chính sách giao hàng</a></li>
                      <li><a href="#">Bảo mật thông tin</a></li>
                      <li><a href="#">Bảo hành sản phẩm</a></li>
                    </ul>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-info-main-footer-inside">
                    <div className="title-display-footer title-info-main-footer3">
                      <h2>Tin tức</h2>
                    </div>
                    <ul className="info-display-main-footer block-info-footer-li3">
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