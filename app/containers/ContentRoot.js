import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Details from '../components/details/Details';
import ShoppingCart from '../components/shoppingcart/ShoppingCart';
import ConstantSecond from './ConstantSecond';
import AdminTemplate from '../admin';
import Contacts from '../components/contacts';
class ContentRoot extends Component {
    render() {
        return (
            <React.Fragment>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/details/*-:idProducts-:idCategory" component={Details}/>
                <Route path="/contact" component={Contacts}/>
                <Route path="/shopping-cart" component={ShoppingCart}/>
                <Route path="/" component={ConstantSecond}/>
                <Route path="/products/*-idCategory" component={ConstantSecond}/>
                <Route path="/post-new" component={ConstantSecond}/>
                <Route path="/update-user" component={ConstantSecond}/>

            </Switch>
            </React.Fragment>
        );
    }
}

export default ContentRoot;
