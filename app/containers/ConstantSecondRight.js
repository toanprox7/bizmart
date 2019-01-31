import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom'
import ProductsRight from '../components/products/ProductsRight';
import PostNewRight from '../components/postNew/PostNewRight';
import HomeRight from '../components/home/HomeRight';
import InfoUserRight from '../components/updateInfoUser/InfoUserRight';
import ListProductSaleRight from '../components/productsSale/ListRight';
import ListProductHotRight from '../components/productsHot/ListRight';
import ListProductMyselfRight from '../components/productsMyself/ListRight';
import SearchProducts from "../components/search/SearchProducts";
import {NoMatch} from "./NoMatch";
class ConstantSecondRight extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/products/*-:idCategory/:idPage/:price" component={ProductsRight} />
                <Route exact path="/post-new" component={PostNewRight} />
                <Route exact path="/" component={HomeRight} />
                <Route exact path="/update-user" component={InfoUserRight} />
                <Route exact path="/products-sale/:idPage/:price" component={ListProductSaleRight} />
                <Route exact path="/products-hot/:idPage/:price" component={ListProductHotRight} />
                <Route exact path="/products-myself/:idPage/:price" component={ListProductMyselfRight} />
                <Route exact path="/products-search/:textSearch/:idPage/:price" component={SearchProducts} />
                {/* <NoMatch /> */}
     
            </Switch>
        );
    }
}

export default ConstantSecondRight;
