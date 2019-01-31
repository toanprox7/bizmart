import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink,Redirect } from 'react-router-dom';
import DashBoard from './components/dashboard/DashBoard';
import Layout from './containers/Layout';

class Router extends Component {
  render() {
    return (
    <Layout>
        {/* <Switch> */}
        <Route exact path="/admin/dashboard.html" component={DashBoard}/>
       {/* </Switch> */}
    </Layout>
    );
  }
}

export default Router;
