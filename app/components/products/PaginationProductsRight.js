import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import axios from "axios";
import {connect} from "react-redux";
import {activePageChange} from "../../actions/productsAction"
class PaginationProductsRight extends Component {
  constructor(props) {
    super(props);
    this.state={
      activePage: 1
    }
  }
  componentDidMount() {
    var price = this.props.price;
    if(price != 0){
    let pageNumber =this.props.idPage;
    let skipStart = (pageNumber - 1) * 12;
    let getStt = price.indexOf('-');
    let start = price.slice(0,getStt);
    let end = price.slice(getStt+1,price.length);
    let self = this;
    axios.post(`/productsapi/getAllProductsById`,{categoryId:this.props.id,skip:skipStart,price:{ '>=': parseInt(start),'<=': parseInt(end) },limit:12})
      .then(function (res) {
        // console.log(res);
        self.setState({
          totalProducts:res.data
        })
    }).catch(function (err) {
      console.log(err);
    })
    }else if(price == 0){
      let pageNumber =this.props.idPage;
      let skipStart = (pageNumber - 1) * 12;
      let self =this;
      axios.post(`/productsapi/getAllProductsById`,{categoryId:this.props.id,skip:skipStart,limit:12})
      .then(function (res) {
        // console.log(res);
        self.setState({
          totalProducts:res.data
        })
    }).catch(function (err) {
      console.log(err);
    })
    }
  }

  handlePageChange(pageNumber) {
    this.handleRedirect(pageNumber);
  }

  handleRedirect(numberPage){
    var linkProducts = window.location.pathname;
    let textCategory = linkProducts.slice(linkProducts.indexOf('/products/')+10, linkProducts.indexOf(`/${this.props.idPage}/`));
    this.props.history.push(`/products/${textCategory}/${numberPage}/${this.props.price}`);
    window.location.reload();
  }
  checkTotal(){
    if(this.state.totalProducts){
      return this.state.totalProducts.length
    }else{
      return null;
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   // console.log(nextProps,"pagination");
  //   if(nextProps.dataPriceProducts && nextProps.dataPriceProducts.length >0){
  //     this.setState({
  //       totalProducts:nextProps.dataPriceProducts
  //     });
  //   }
  //   if(nextProps.activePageData !== null && nextProps.activePageData != undefined){
  //     if(nextProps.activePageData.activePage == true){
  //       this.setState({
  //         activePage:1
  //       });
  //     }

  //   }
  // }

  render() {
    return (
      <div>
 <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={12}
          totalItemsCount={this.checkTotal()}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => this.handlePageChange(pageNumber)}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    activePageChange: (dataActivePage) => {
      dispatch(activePageChange(dataActivePage))
    },

  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    dataPriceProducts: state.PriceProductsReducer,
    activePageData:state.productsReducer.activePage
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PaginationProductsRight)
