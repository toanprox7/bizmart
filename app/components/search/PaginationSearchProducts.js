import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import axios from "axios";
import {tokenAuthorization} from "app/utils"
class PaginationSearchProducts extends Component {
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
    axios.post(`/productsapi/findProducts`,{title: {contains:this.props.textSearch},price:{ '>=': parseInt(start),'<=': parseInt(end) },status:'active'},{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then(function (res) {
      // console.log(res);
      self.setState({
        totalProducts:res.data.data,
        activePage:parseInt(pageNumber)
      });
    }).catch(function (err) {
      console.log(err);
    })
    }else if(price == 0){
      var pageNumber =this.props.idPage;
      var skipStart = (pageNumber - 1) * 12;
      var self = this;
      axios.post(`/productsapi/findProducts`,{title: {contains:this.props.textSearch},status:'active'},{
        headers: {
          'authorization':tokenAuthorization,
        }
      })
        .then(function (res) {
          // console.log(res,"hii");
          self.setState({
            totalProducts:res.data.data,
            activePage:parseInt(pageNumber)
          });
        }).catch(function (err) {
          console.log(err);
        })
    }
  }
componentWillReceiveProps(nextProps) {
  // console.log(nextProps,"next props total pagi");
  var price = nextProps.price;
  if(price != 0){
  let pageNumber =nextProps.idPage;
  let getStt = price.indexOf('-');
  let start = price.slice(0,getStt);
  let end = price.slice(getStt+1,price.length);
  let self =this;
  axios.post(`/productsapi/findProducts`,{title: {contains:nextProps.textSearch},price:{ '>=': parseInt(start),'<=': parseInt(end) },status:'active'},{
    headers: {
      'authorization':tokenAuthorization,
    }
  }).then(function (res) {
    // console.log(res);
    self.setState({
      totalProducts:res.data.data,
      activePage:parseInt(pageNumber)
    });
  }).catch(function (err) {
    console.log(err);
  })
  }else if(price == 0){
    var pageNumber =nextProps.idPage;
    var skipStart = (pageNumber - 1) * 12;
    var self = this;
    axios.post(`/productsapi/findProducts`,{title: {contains:nextProps.textSearch},status:'active'},{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
      .then(function (res) {
        // console.log(res,"hii");
        self.setState({
          totalProducts:res.data.data,
          activePage:parseInt(pageNumber)
        });
      }).catch(function (err) {
        console.log(err);
      })
  }
}

  handlePageChange(pageNumber) {
    this.handleRedirect(pageNumber);
  }

  handleRedirect(numberPage){
    // window.location.href = `/products-search/${this.props.textSearch}/${numberPage}/${this.props.price}`;
    this.props.history.push(`/products-search/${this.props.textSearch}/${numberPage}/${this.props.price}`);
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

export default PaginationSearchProducts;
