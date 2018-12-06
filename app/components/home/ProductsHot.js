import React, { Component } from 'react';
import ListProductsHot from './ListProductsHot';

class ProductsHot extends Component {
    render() {
        return (
        <div className="products-hot">
            <div className="top-products-right">
              <span className="text-right"><a href="#">Xem Thêm</a></span>
              <h4>Sản Phẩm Hot</h4>
            </div>
            <ListProductsHot/>
        </div>
          
        );
    }
}

export default ProductsHot;