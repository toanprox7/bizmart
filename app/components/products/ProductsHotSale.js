import React, { Component } from 'react';
import ListProductsHotSale from './ListProductsHotSale';
import "./styles/products.css";
class ProductsHotSale extends Component {
    render() {
        return (
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="products-hot-sale">
              <div className="top-products-right">
                <h4>Sản phẩm bán chạy</h4>
              </div>
            <ListProductsHotSale/>
            </div>
          </div>
        
        );
    }
}

export default ProductsHotSale;