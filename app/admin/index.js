import React, { Component } from 'react';
import Admin from './Admin';
import Router from './Router';
import Layout from './containers/Layout';
import { BrowserRouter, Route,Switch,Link,NavLink,Redirect } from 'react-router-dom';
import DashBoard from './components/dashboard/DashBoard';
import Ratings from './components/ratings/Ratings';
import Category from './components/categorys/Category';
import Products from './components/products/Products';
import UsersPage from './components/users/Users';
import CreateForm from './components/categorys/components/Create';
import EditForm from './components/categorys/components/Edit';
import VerifyPassword from './components/common/VerifyPassword';
import ForgetPassword from './components/common/ForgetPassword';
import Show from './components/products/components/Show';
import CreateProduct from './components/products/components/Create';
import ChangePassword from './components/common/ChangePassword';
import EditProduct from './components/products/components/Edit';
class IndexAdmin extends Component {
  render() {
    return (
      <React.Fragment>

<Switch>
<Route exact path="/admin" component={Admin}/>
<Route exact path="/admin/verify/:tokenEmail" component={VerifyPassword}/>
<Route exact path="/admin/forget-password.html" component={ForgetPassword}/>

  <Layout>
      <Route exact path="/admin/dashboard.html" component={DashBoard}/>
      <Route exact path="/admin/categorys/:textSearch/page-:idPage.html" component={Category}/>
      <Route exact path="/admin/categorys/create.html" component={CreateForm}/>
      <Route exact path="/admin/products/create.html" component={CreateProduct}/>
      <Route exact path="/admin/categorys/:id/edit.html" component={EditForm}/>
      <Route exact path="/admin/products/:id/edit.html" component={EditProduct}/>
      <Route exact path="/admin/products/:id/show.html" component={Show}/>
      <Route exact path="/admin/products/:textSearch/page-:idPage.html" component={Products}/>
      <Route exact path="/admin/users/:textSearch/page-:idPage.html" component={UsersPage}/>
      <Route exact path="/admin/ratings/:textSearch/page-:idPage.html" component={Ratings}/>
      <Route exact path="/admin/change-password.html" component={ChangePassword}/>

  </Layout>
</Switch>



      </React.Fragment>


    );
  }
}

export default IndexAdmin;
