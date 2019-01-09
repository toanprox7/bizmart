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
               <Route exact path="/products/*-:idCategory/:idPage/:price" component={ConstantCategoryLeft} />
               <Route path="/products-sale/:idPage/:price" component={ConstantCategoryLeft} />
               <Route path="/products-hot/:idPage/:price" component={ConstantCategoryLeft} />
               <Route path="/products-myself/:idPage/:price" component={ConstantCategoryLeft} />
               <Route path="/products-search/:textSearch/:idPage/:price" component={ConstantCategoryLeft} />

           </Switch>
        );
    }
}

export default CategoryOutside;
