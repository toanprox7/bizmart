import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {fetchAllPriceProducts2,fetchAllProductsCategoryId,activePageChange} from "../../actions/productsAction";
import {connect} from "react-redux";
class ConstantProductsPrice extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:""
    }

  }
// componentWillMount() {

  // var self=this;
  // axios.get(`/productsapi/getAllProductsById?categoryId=${this.props.match.params.idCategory}&sort=createdAt+desc`)
  //   .then(function (res) {
  //     self.setState({
  //       data:res.data
  //     })

  //   }).catch(function (err) {
  //     console.log(err);
  //   })
  // this.props.fetchAllProductsCategoryId(this.props.match.params.idCategory);
// }
// componentWillReceiveProps(nextProps) {
//   this.setState({
//     data:nextProps.data
//   });
// }

// checkPrice(start,end){
//   if(this.state.data){
//     var arrayNew=[];
//      this.state.data[0].map(item => {

//      if(item.price >= start && item.price <=end){

//         arrayNew.push(item);
//         // return arrayNew;
//      }

//    })
//    return arrayNew;
//   }else{
//     return null
//   }
// }

handleCheck(startl,endl){
// console.log(startl,endl);
var linkPage = window.location.href;
if(linkPage.indexOf('/products-search/') != -1){
let textSearch =this.props.match.params.textSearch;
  this.props.history.push(`/products-search/${textSearch}/1/${startl}-${endl}`);
  window.location.reload();
}else if(linkPage.indexOf('/products-sale/') != -1){
  this.props.history.push(`/products-sale/1/${startl}-${endl}`);
  window.location.reload();
}else if(linkPage.indexOf('/products/') != -1){
// console.log(this.props.match.params.0);
let obj=this.props.match.params;
let textCategory =obj[Object.keys(obj)[0]];
  this.props.history.push(`/products/${textCategory}-${this.props.match.params.idCategory}/1/${startl}-${endl}`);
  window.location.reload();
}
//  this.props.history.push()
}

    render() {
      // console.log(this.checkPrice2kTo50k());
// console.log(this.handleCheck(20000,50000))
        return (
        <div className="product-price-products">
          <ul>
            <li><h3>Mức Giá Sản Phẩm</h3></li>
            <li onClick={(startl,endl) => this.handleCheck(20000,50000)}>Từ 20.000 - 50.000đ</li>
            <li onClick={(startl,endl) => this.handleCheck(50000,100000)}>Từ 50.000 - 100.000đ</li>
            <li onClick={(startl,endl) => this.handleCheck(100000,200000)}>Từ 100.000 - 200.000đ</li>
            <li onClick={(startl,endl) => this.handleCheck(200000,300000)}>Từ 200.000 - 300.000đ</li>
            <li onClick={(startl,endl) => this.handleCheck(300000,500000)}>Từ 300.000 -  500.000đ</li>
            <li onClick={(startl,endl) => this.handleCheck(500000,1000000)}>Từ 500.000 - 1.000.000đ</li>
          </ul>
        </div>

        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllPriceProducts2: (priceProducts2) => {
      dispatch(fetchAllPriceProducts2(priceProducts2))
    },
    fetchAllProductsCategoryId: (idCategory) => {
      dispatch(fetchAllProductsCategoryId(idCategory))
    },

    activePageChange: (dataActivePage) => {
      dispatch(activePageChange(dataActivePage))
    },

  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.productsReducer.fetchAllProductsCategoryId
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConstantProductsPrice)
