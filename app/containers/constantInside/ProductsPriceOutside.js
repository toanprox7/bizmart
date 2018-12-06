import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom'
import ConstantProductsPrice from './ConstantProductsPrice';
class ProductsPriceOutside extends Component {
    render() {
        return (
            <Switch>
               <Route path="/products/*-:idCategory" component={ConstantProductsPrice} />
            </Switch>
        );
    }
}

export default ProductsPriceOutside;
