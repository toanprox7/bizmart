import React, { Component } from 'react';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom';
import ConstantSecond from './ConstantSecond';

class WrapConstentSecond extends Component {
  render() {
    return (
      <React.Fragment>
      <Switch>
<Route exact path="/" component={ConstantSecond}/>
{/* <Route exact path="/post-new" component={PostNewRight} /> */}
<Route exact path="/products/*-:idCategory/:idPage/:price" component={ConstantSecond  } />
<Route exact path="/post-new" component={ConstantSecond} />
<Route exact path="/products-search/:textSearch/:idPage/:price" component={ConstantSecond} />
      </Switch>
      </React.Fragment>
    );
  }
}

export default WrapConstentSecond;
