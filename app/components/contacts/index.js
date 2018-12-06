import React, { Component } from 'react';
import "./styles/contact.css";

class Contacts extends Component {
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
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
              </div>
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div className="form-contact text-right">
                <form>
                  <div className="item-contact">
                    <span>Tên:</span>
                    <input type="text" />
                  </div>
                  <div className="item-contact">
                    <span>Họ:</span>
                    <input type="text" />
                  </div>
                  <div className="item-contact">
                    <span>Email:</span>
                    <input type="text" />
                  </div>
                  <div className="item-contact">
                    <span>Địa chỉ:</span>
                    <input type="text" />
                  </div>
                  <div className="item-contact">
                    <span>Sđt:</span>
                    <input type="text" />
                  </div>
                  <div className="item-contact">
                    <span>Nội dung:</span>
                    <textarea defaultValue={""} />
                  </div>
                  <div className="button-send-and-rerep">
                    <button className="rerep">Nhập lại</button>
                    <button className="send">Gửi</button>
                  </div>
                  </form>
                </div>

              </div>

              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
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
