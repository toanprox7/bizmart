import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink,Redirect } from 'react-router-dom';
import ViewClient from './containers/ViewClient';
import AdminTemplate from './admin';
import ViewMain from './containers/ViewMain';
import Layout from './containers/Layout';
import ScrollToTop from './components/ScrollToTop';
// import {NoMatch} from './containers/NoMatch';
// import { Redirect } from 'react-router-dom'
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
class Router extends Component {
  render() {
    return (
  <React.Fragment>
    <BrowserRouter>
      <ScrollToTop>
      <Switch>
        <Route path="/" component={ViewClient} />
        {/* <Redirect exact from="/" to="/home" /> */}
        <Route path="/admin" component={AdminTemplate}/>
        <Route component={NoMatch} />
      </Switch>
      </ScrollToTop>
    </BrowserRouter>
  </React.Fragment>

    );
  }
}

export default Router;
