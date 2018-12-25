import React, { Component } from 'react';
import ConstantSecondLeft from './ConstantSecondLeft';
import ConstantSecondRight from './ConstantSecondRight';
import {Switch,Route} from "react-router-dom";
import ProductsHotSale from '../components/products/ProductsHotSale';
class ConstantSecond extends Component {
constructor(props) {
  super(props);
  this.state={
  display:"block"
  }
}

  componentWillMount() {
    var link = window.location.pathname;

    if(link.indexOf('/admin') != -1){
      this.setState({
        display:'none'
      });
    }else{
      this.setState({
        display:'block'
      });
    }
  }

    render() {
        return (
<div style={{display:this.state.display}} id="main">
  <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
          <ConstantSecondLeft />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
          <ConstantSecondRight />
        </div>
        <Switch>
          <Route path="/products" component={ProductsHotSale} />
        </Switch>
      </div>
  </div>
</div>

        );
    }
}

export default ConstantSecond;
