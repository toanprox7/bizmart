import React, { Component } from 'react';
import ListProductsSale from './ListProductsSale';

class ProductsSale extends Component {
    render() {
        return (
            <div className="main-products-right">
            <div className="top-products-right">
              <span className="text-right"><a href="#">Xem Thêm</a></span>
              <h4>Sản Phẩm Giá Sốc</h4>
            </div>
           <ListProductsSale dataProducts={this.props.dataProducts}/>
          </div>

        );
    }
}

export default ProductsSale;
