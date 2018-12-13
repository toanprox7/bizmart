import React, { Component } from 'react';
import ItemSearchProducts from './ItemSearchProducts';
import PaginationSearchProducts from './PaginationSearchProducts';
import Axios from 'axios';

class SearchProducts extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:""
    }
  }
componentWillMount() {
  var price = this.props.match.params.price;
  if(price != 0){
    let pageNumber =this.props.match.params.idPage;
    let skipStart = (pageNumber - 1) * 12;
    let getStt = price.indexOf('-');
    let start = price.slice(0,getStt);
    let end = price.slice(getStt+1,price.length);
    let self =this;
    Axios.post(`/productsapi/findProducts`,{title: {contains:this.props.match.params.textSearch},price:{ '>=': parseInt(start),'<=': parseInt(end) },limit:12,skip:skipStart}).then(function (res) {
      // console.log(res);
      self.setState({
        data:res.data.data
      });
    }).catch(function (err) {
      console.log(err);
    })
  }else if(price == 0){
    let pageNumber =this.props.match.params.idPage;
    let skipStart = (pageNumber - 1) * 12;
    var self =this;
    Axios.post(`/productsapi/findProducts`,{title: {contains:this.props.match.params.textSearch},limit:12,skip:skipStart}).then(function (res) {
      // console.log(res);
      self.setState({
        data:res.data.data
      });
    }).catch(function (err) {
      console.log(err);
    })
  }
}

  checkData(){
    if(this.state.data != ""){
      return this.state.data.map((item,index) => {
        return <ItemSearchProducts key={index} data={item} />
      })
    }else{
      return null
    }
  }
  render() {
    return (
      <div className="main-products-right">
          <div className="top-products-right">
            <h4>Từ khóa: <span style={{color:"white"}}>{this.props.match.params.textSearch}</span> </h4>
          </div>
          <div className="center-products-right">
            <div className="row">
              {this.checkData()}
            </div>
            <PaginationSearchProducts price={this.props.match.params.price} idPage={this.props.match.params.idPage} textSearch={this.props.match.params.textSearch} />
          </div>
        </div>
    );
  }
}

export default SearchProducts;
