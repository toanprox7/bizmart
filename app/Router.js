import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink,Redirect } from 'react-router-dom';
import ViewClient from './containers/ViewClient';
import Admin from './admin';
import Layout from './containers/Layout';
import ScrollToTop from './components/ScrollToTop';
import IndexAdmin from './admin';
import ProviderHOC from "./containers/ProviderHOC";
import {NoMatch} from "./containers/NoMatch";
// import {NoMatch} from './containers/NoMatch';
// import { Redirect } from 'react-router-dom'
const NoMatchFound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
const RouteManager  = ProviderHOC(NoMatchFound);
class Router extends Component {
  render() {
    return (
  <React.Fragment>
    <ViewClient />
    {/* <BrowserRouter> */}
    {/* <RouteManager> */}
      {/* <Switch> */}
        {/* <Route path="/" component={ViewClient} /> */}
        {/* <NoMatch /> */}
      {/* </Switch> */}
      {/* </RouteManager> */}
    {/* </BrowserRouter> */}
  </React.Fragment>

    );
  }
}

export default Router;
