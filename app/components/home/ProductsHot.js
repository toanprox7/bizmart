import React, { Component } from 'react';
import ListProductsHot from './ListProductsHot';
import {Link} from 'react-router-dom';
class ProductsHot extends Component {
    render() {
        return (
        <div className="products-hot">
            <div className="top-products-right">
              <span className="text-right"><Link to="/products-hot/1/0">Xem Thêm</Link></span>
              <h4>Sản Phẩm Hot</h4>
            </div>
            <ListProductsHot/>
        </div>

        );
    }
}

export default ProductsHot;
