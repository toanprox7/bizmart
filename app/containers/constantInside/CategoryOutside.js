import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom'
import ConstantCategoryLeft from './ConstantCategoryLeft';

class CategoryOutside extends Component {
    render() {
        return (
           <Switch>
               <Route path="/post-new" component={ConstantCategoryLeft} />
               <Route path="/update-user" component={ConstantCategoryLeft} />
               <Route exact path="/" component={ConstantCategoryLeft} />
               <Route path="/products/*-:idCategory" component={ConstantCategoryLeft} />
           </Switch>
        );
    }
}

export default CategoryOutside;
