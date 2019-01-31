import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Details from '../components/details/Details';
import Contacts from '../components/contacts';
import VerifyPassword from '../admin/components/common/VerifyPassword';
import ForgetPassword from '../admin/components/common/ForgetPassword';
import HomeRight from '../components/home/HomeRight';
import Admin from '../admin/Admin';
import ProductsRight from "../components/products/ProductsRight";
import ScrollToTop from "../components/ScrollToTop";
import PostNewRight from "../components/postNew/PostNewRight";
import ListProductSaleRight from "../components/productsSale/ListRight";
import SearchProducts from "../components/search/SearchProducts";
import InfoUserRight from "../components/updateInfoUser/InfoUserRight";
import ListProductMyselfRight from "../components/productsMyself/ListRight";
import ListProductHotRight from "../components/productsHot/ListRight"
import {ClientRoute,SideBarRoute,ProductRoute,PostNewRoute,AdminRoute} from "./utils/wraperLayout";
import Ratings from '../admin/components/ratings/Ratings';
import Category from '../admin/components/categorys/Category';
import Mails from "../admin/components/mails/Mails";
import Banner from "../admin/components/banner/Banner";
import CreateBanner from "../admin/components/banner/Create";
import EditBanner from "../admin/components/banner/Edit";

import Products from '../admin/components/products/Products';
import UsersPage from '../admin/components/users/Users';
import CreateForm from '../admin/components/categorys/components/Create';
import EditForm from '../admin/components/categorys/components/Edit';
import Show from '../admin/components/products/components/Show';
import ShowMail from '../admin/components/mails/Show';
import CreateProduct from '../admin/components/products/components/Create';
import ChangePassword from '../admin/components/common/ChangePassword';
import EditProduct from '../admin/components/products/components/Edit';
class ContentRoot extends Component {
    render() {
        return (
            <React.Fragment>
                 <BrowserRouter>
                 <ScrollToTop>
            <Switch>
    {/* <Route path="/admin" component={IndexAdmin} /> */}
    <Route exact path="/admin" component={Admin}/>
    <Route exact path="/admin/verify/:tokenEmail" component={VerifyPassword}/>
    <Route exact path="/admin/forget-password.html" component={ForgetPassword}/>
    <AdminRoute exact path="/admin/categorys/:textSearch/page-:idPage.html" component={Category}/>
      <AdminRoute exact path="/admin/categorys/create.html" component={CreateForm}/>
      <AdminRoute exact path="/admin/products/create.html" component={CreateProduct}/>
      <AdminRoute exact path="/admin/categorys/:id/edit.html" component={EditForm}/>
      <AdminRoute exact path="/admin/products/:id/edit.html" component={EditProduct}/>
      <AdminRoute exact path="/admin/products/:id/show.html" component={Show}/>
      <AdminRoute exact path="/admin/products/:textSearch/page-:idPage.html" component={Products}/>
      <AdminRoute exact path="/admin/users/:textSearch/page-:idPage.html" component={UsersPage}/>
      <AdminRoute exact path="/admin/mails/:textSearch/page-:idPage.html" component={Mails}/>
      <AdminRoute exact path="/admin/mails/:id/show.html" component={ShowMail}/>
      <AdminRoute exact path="/admin/banners/:textSearch/page-:idPage.html" component={Banner}/>
      <AdminRoute exact path="/admin/banners/create.html" component={CreateBanner}/>
      <AdminRoute exact path="/admin/banners/:id/edit.html" component={EditBanner}/>
      <AdminRoute exact path="/admin/ratings/:textSearch/page-:idPage.html" component={Ratings}/>
      <AdminRoute exact path="/admin/change-password.html" component={ChangePassword}/>
    <ClientRoute exact path="/login" component={Login}/>
    <ClientRoute exact path="/register" component={Register}/>
    <ClientRoute exact path="/details/*-:idProducts-:idCategory" component={Details}/>
    <ClientRoute exact path="/contact" component={Contacts}/>
    <SideBarRoute exact path="/" component={HomeRight}/>
    <PostNewRoute exact path="/post-new" component={PostNewRight}/>
    <PostNewRoute exact path="/products-hot/:idPage/:price" component={ListProductHotRight}/>
    <PostNewRoute exact path="/products-search/:textSearch/:idPage/:price" component={SearchProducts}/>
    <PostNewRoute exact path="/products-sale/:idPage/:price" component={ListProductSaleRight}/>
    <PostNewRoute exact path="/products-myself/:idPage/:price" component={ListProductMyselfRight}/>
    
    <ProductRoute exact path="/products/*-:idCategory/:idPage/:price" component={ProductsRight} />
    <PostNewRoute exact path="/update-user" component={InfoUserRight} />
    <Route render={(props) => (
    <h1 style={{color:"blue"}}>Not found</h1>
    )} /> 

            </Switch>
            </ScrollToTop>
            </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default ContentRoot;
