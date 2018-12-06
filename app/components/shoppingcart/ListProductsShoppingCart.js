import React, { Component } from 'react';
import {Link} from "react-router-dom";
class ListProductsShoppingCart extends Component {
    render() {
        return (
<div className="shopping-cart-body-left">
            <div className="select-all">
              <div className="checkbox-cart">
                <label>
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark" />
                </label>	
              </div>
              <span>Chọn tất cả</span><span className="cart-sp-small">(2 sản phẩm)</span>
            </div>
            <div className="list-product-cart">
              <div className="item-product-cart">
                <div className="checkbox-cart">
                  <label>
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="img-cart">
                  <Link to="details.html"><img src="/images/ilq0DO_simg_de2fe0_500x500_maxb.jpg" alt="anh sp" /></Link>
                </div>
                <div className="block-info-cart">
                  <div className="title-product-cart">
                    <p>Áo Khoác Unisex ( CÓ HINH THAT) Kiểu Dáng Sơ Mi Caro thun áo bộ thun xám.</p>
                  </div>
                  <div className="features-cart">
                    <div className="icon-feature">
                      <i className="fa fa-commenting-o" />
                      <i className="fa fa-heart" />
                      <i className="fa fa-trash-o" />
                    </div>
                    <div className="total-money-count">
                      <div className="new-price-cart">
                        <span>130.000đ</span>
                      </div>
                      <div className="old-price-cart">
                        <span>130.000đ</span>
                      </div>
                      <div className="count-cart">
                        <div className="decrement">
                          <span>-</span>
                        </div>
                        <span className="count-of-cart">2</span>
                        <div className="increment">
                          <span>+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-product-cart">
                <div className="checkbox-cart">
                  <label>
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="img-cart">
                  <Link to="details.html"><img src="/images/hY27bh_simg_de2fe0_500x500_maxb.jpg" alt="anh sp" /></Link>
                </div>
                <div className="block-info-cart">
                  <div className="title-product-cart">
                    <p>Áo Khoác Unisex ( CÓ HINH THAT) Kiểu Dáng Sơ Mi Caro thun áo bộ thun xám</p>
                  </div>
                  <div className="features-cart">
                    <div className="icon-feature">
                      <i className="fa fa-commenting-o" />
                      <i className="fa fa-heart" />
                      <i className="fa fa-trash-o" />
                    </div>
                    <div className="total-money-count">
                      <div className="new-price-cart">
                        <span>130.000đ</span>
                      </div>
                      <div className="old-price-cart">
                        <span>130.000đ</span>
                      </div>
                      <div className="count-cart">
                        <div className="decrement">
                          <span>-</span>
                        </div>
                        <span className="count-of-cart">2</span>
                        <div className="increment">
                          <span>+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-product-cart">
                <div className="checkbox-cart">
                  <label>
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="img-cart">
                  <Link to="details.html"><img src="/images/189789dacnhantambody_2_2mr0gpfamp6f8.jpg" alt="anh sp" /></Link>
                </div>
                <div className="block-info-cart">
                  <div className="title-product-cart">
                    <p>Áo Khoác Unisex ( CÓ HINH THAT) Kiểu Dáng Sơ Mi Caro thun áo bộ thun xám.</p>
                  </div>
                  <div className="features-cart">
                    <div className="icon-feature">
                      <i className="fa fa-commenting-o" />
                      <i className="fa fa-heart" />
                      <i className="fa fa-trash-o" />
                    </div>
                    <div className="total-money-count">
                      <div className="new-price-cart">
                        <span>130.000đ</span>
                      </div>
                      <div className="old-price-cart">
                        <span>130.000đ</span>
                      </div>
                      <div className="count-cart">
                        <div className="decrement">
                          <span>-</span>
                        </div>
                        <span className="count-of-cart">2</span>
                        <div className="increment">
                          <span>+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-product-cart">
                <div className="checkbox-cart">
                  <label>
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="img-cart">
                  <Link to="details.html"><img src="/images/189789dacnhantambody_2_2mr0gpfamp6f8.jpg" alt="anh sp" /></Link>
                </div>
                <div className="block-info-cart">
                  <div className="title-product-cart">
                    <p>Áo Khoác Unisex ( CÓ HINH THAT) Kiểu Dáng Sơ Mi Caro thun áo bộ thun xám.</p>
                  </div>
                  <div className="features-cart">
                    <div className="icon-feature">
                      <i className="fa fa-commenting-o" />
                      <i className="fa fa-heart" />
                      <i className="fa fa-trash-o" />
                    </div>
                    <div className="total-money-count">
                      <div className="new-price-cart">
                        <span>130.000đ</span>
                      </div>
                      <div className="old-price-cart">
                        <span>130.000đ</span>
                      </div>
                      <div className="count-cart">
                        <div className="decrement">
                          <span>-</span>
                        </div>
                        <span className="count-of-cart">2</span>
                        <div className="increment">
                          <span>+</span>
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

export default ListProductsShoppingCart;