import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom'

import BannerMain from '../components/banner/BannerMain';
class BannerRoot extends Component {
    render() {
        return (
        <Switch>
            <Route exact path="/" component={BannerMain} />
            <Route exact path="/products" component={BannerMain} />
        </Switch>
        );
    }
}

export default BannerRoot;
