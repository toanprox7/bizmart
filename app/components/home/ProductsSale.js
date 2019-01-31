import React, { Component } from 'react';
import ListProductsSale from './ListProductsSale';
import {Link} from 'react-router-dom';
class ProductsSale extends Component {
    render() {
        return (
            <div className="main-products-right">
            <div className="top-products-right">
              <span className="text-right"><Link to="/products-sale/1/0">Xem Thêm</Link></span>
              <h4>Sản Phẩm Giá Sốc</h4>
            </div>
           <ListProductsSale dataProducts={this.props.dataProducts}/>
          </div>

        );
    }
}

export default ProductsSale;
