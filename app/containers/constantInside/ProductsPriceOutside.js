import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom'
import ConstantProductsPrice from './ConstantProductsPrice';
class ProductsPriceOutside extends Component {
    render() {
        return (
            <Switch>
               <Route path="/products/*-:idCategory/:idPage/:price" component={ConstantProductsPrice} />
               <Route path="/products-sale/:idPage/:price" component={ConstantProductsPrice} />
               <Route path="/products-search/:textSearch/:idPage/:price" component={ConstantProductsPrice} />

            </Switch>
        );
    }
}

export default ProductsPriceOutside;
