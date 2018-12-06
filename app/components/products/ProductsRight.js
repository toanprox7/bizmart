import React, { Component } from 'react';
import ListProductsRight from './ListProductsRight';
import "./styles/products.css";
import axios from "axios";
class ProductsRight extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataName:""
    }
  }
componentDidMount() {
  var self=this;
axios.get(`/categoryapi/${this.props.match.params.idCategory}`).then(function (res) {
  self.setState({
    dataName:res.data.name
  });
}).catch(function (err) {
  console.log(err);
})

}
checkName(){
  if(this.state.dataName != ""){
    return this.state.dataName;
  }else{
    return null
  }
}
    render() {
        return (

        <div className="main-products-right">
          <div className="top-products-right">
            <h4>Sản Phẩm {this.checkName()}</h4>
          </div>
         <ListProductsRight id={this.props.match.params.idCategory}/>
        </div>
        );
    }
}

export default ProductsRight;
