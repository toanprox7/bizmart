import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import axios from "axios";
class PaginationProductsHotRight extends Component {
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
    let self =this;
    axios.post(`/productsapi/find`,{price:{ '>=': parseInt(start),'<=': parseInt(end) },level:2,status:'active'}).then(function (res) {
      // console.log(res);
      self.setState({
        totalProducts:res.data,
        activePage:parseInt(pageNumber)
      });
    }).catch(function (err) {
      console.log(err);
    })
    }else if(price == 0){
      var pageNumber =this.props.idPage;
      var skipStart = (pageNumber - 1) * 12;
      var self = this;
      axios.post(`/productsapi/find`,{level:2,status:'active'})
        .then(function (res) {
          // console.log(res,"hii");
          self.setState({
            totalProducts:res.data,
            activePage:parseInt(pageNumber)
          });
        }).catch(function (err) {
          console.log(err);
        })
    }
  }

  handlePageChange(pageNumber) {
this.setState({
  activePage:pageNumber
});
    this.handleRedirect(pageNumber);
  }

  handleRedirect(numberPage){
    // this.props.history.push(`/products-hot/${numberPage}/${this.props.price}`);
    window.location.href=`/products-hot/${numberPage}/${this.props.price}`;
  }
  checkTotal(){
    if(this.state.totalProducts){
      return this.state.totalProducts.length
    }else{
      return null;
    }
  }
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

export default PaginationProductsHotRight;
