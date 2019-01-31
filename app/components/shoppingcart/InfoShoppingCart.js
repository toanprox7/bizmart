import React, { Component } from 'react';

class InfoShoppingCart extends Component {
    render() {
        return (
        <div className="pay-method-cart">
            <div className="title-pay-method">
              <h3>Phương thức thanh toán</h3>
            </div>
            <div className="info-total">
              <p><span className="left-info-total">Số lượng:</span> <span className="right-info-total">(2 SP)</span></p>
              <p><span className="left-info-total">Tổng tiền hàng:</span> <span className="right-info-total">130.000 đ</span></p>
              <p><span className="left-info-total">Phí dịch vụ:</span> <span className="right-info-total">20.000 đ</span></p>
              <p className="last-info"><span className="left-info-total">Tổng thanh toán:</span> <span className="right-total-pay">150.000 đ</span></p>
              <div className="place-an-order text-center">
                <button>Đặt mua hàng</button>
              </div>
            </div>
            <div className="info-address-buy">
              <h3><i className="fa fa-map-marker" /> Địa chỉ nhận hàng:</h3>
              <p className="name-buy">Nguyễn Văn Thảo (036.8123.612)</p>
              <p className="address-buy">Ngõ 58, trần bình, Cầu giấy, Hà nội</p>
              <a href="#" className="change-info-buyer">Thay Đổi</a>
            </div>
          </div>
        
        );
    }
}

export default InfoShoppingCart;