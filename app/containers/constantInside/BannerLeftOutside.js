import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom'
import ConstantBannerLeft from './ConstantBannerLeft';

class BannerLeftOutside extends Component {
    render() {
        return (
           <Switch>
               <Route exact path="/" component={ConstantBannerLeft} />
               <Route path="/products" component={ConstantBannerLeft} />
           </Switch>
        );
    }
}

export default BannerLeftOutside;
