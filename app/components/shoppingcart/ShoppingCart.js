import React, { Component } from 'react';
import InfoShoppingCart from './InfoShoppingCart';
import ListProductsShoppingCart from './ListProductsShoppingCart';
import "./styles/shoppingcart.css";
class ShoppingCart extends Component {
    render() {
        return (
<div id="main">
  <div className="container">
    <div className="shopping-cart-body">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <ListProductsShoppingCart/>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <InfoShoppingCart/> 
        </div>
      </div>
    </div>
  </div>
</div>

        );
    }
}

export default ShoppingCart;