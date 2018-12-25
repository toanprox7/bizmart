import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Details from '../components/details/Details';
import ShoppingCart from '../components/shoppingcart/ShoppingCart';
import ConstantSecond from './ConstantSecond';
import Contacts from '../components/contacts';
import SearchProducts from "../components/search/SearchProducts";
import DashBoard from '../admin/components/dashboard/DashBoard';
import VerifyPassword from '../admin/components/common/VerifyPassword';
import ForgetPassword from '../admin/components/common/ForgetPassword';
import Router from '../admin/Router';
import IndexAdmin from '../admin';
import Layout from "../containers/Layout";
import BannerMain from "../components/banner/BannerMain";
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
class ContentRoot extends Component {
    render() {
        return (
            <React.Fragment>
            <Switch>
<Route path="/admin" component={IndexAdmin} />
{/* <Route path="/admin" component={IndexAdmin} /> */}
{/* <Route exact path="/admin/dashboard.html" component={Router}/> */}
<Layout>
<Route exact path="/" component={BannerMain} />
<Route exact path="/products" component={BannerMain} />
<Route path="/login" component={Login}/>
<Route path="/register" component={Register}/>
<Route path="/details/*-:idProducts-:idCategory" component={Details}/>
<Route path="/contact" component={Contacts}/>
<Route path="/shopping-cart" component={ShoppingCart}/>
<Route path="/" component={ConstantSecond}/>
<Route path="/products/*-idCategory/:idPage/:price" component={ConstantSecond}/>
<Route path="/post-new" component={ConstantSecond}/>
<Route path="/update-user" component={ConstantSecond}/>
<Route path="/products-sale/:idPage/:price" component={ConstantSecond}/>
<Route path="/products-search/:textSearch/:idPage/:price" component={SearchProducts} />

</Layout>
<Route component={NoMatch} />
            </Switch>
            </React.Fragment>
        );
    }
}

export default ContentRoot;
