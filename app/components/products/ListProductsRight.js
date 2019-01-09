import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from "axios";
import ItemProductsRight from './ItemProductsRight';
import PaginationProductsRight from './PaginationProductsRight';
class ListProductsRight extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  componentWillMount() {
    // console.log(this.props.id)
    var price = this.props.price;
    if(price != 0){
      let pageNumber =this.props.idPage;
      let skipStart = (pageNumber - 1) * 12;
      let getStt = price.indexOf('-');
      let start = price.slice(0,getStt);
      let end = price.slice(getStt+1,price.length);
      let self =this;
      axios.post(`/productsapi/getAllProductsById`,{categoryId:this.props.id,skip:skipStart,price:{ '>=': parseInt(start),'<=': parseInt(end) },limit:12,status:'active',sort:'createdAt DESC'})
      .then(function (res) {
        // console.log(res);
        self.setState({
          dataCategory:res.data
        })
    }).catch(function (err) {
      console.log(err);
    })
    }else if(price == 0){
      let pageNumber =this.props.idPage;
      let skipStart = (pageNumber - 1) * 12;
      let self =this;
      axios.post(`/productsapi/getAllProductsById`,{categoryId:this.props.id,skip:skipStart,limit:12,status:'active',sort:'createdAt DESC'})
      .then(function (res) {
        // console.log(res);
        self.setState({
          dataCategory:res.data
        })
    }).catch(function (err) {
      console.log(err);
    })
    }

  }
  // componentWillReceiveProps(nextProps) {
  //   // console.log(nextProps);
  //   if(nextProps.dataPriceProducts){
  //     var arrayNew=[];
  //     nextProps.dataPriceProducts.map((item,index) => {
  //       if(index <12 && index >=0){
  //         arrayNew.push(item);
  //       }else{
  //         return null
  //       }
  //     })

  //     return this.setState({
  //       dataCategory:arrayNew
  //     });
  //   }
  // }

  // handleDataPaginate(dataPaginate){
  //   this.setState({
  //     dataCategory:dataPaginate
  //   });
  // }

  checkData(){
    if(this.state.dataCategory){
      return this.state.dataCategory.map((item,index) => {
        return <ItemProductsRight key={index} data={item} />
      })
    }else{
      return null
    }
  }

    render() {
        return (
            <div className="center-products-right">
            <div className="row">
              {this.checkData()}
            </div>
            <PaginationProductsRight idPage={this.props.idPage}
            price={this.props.price}
            id={this.props.id} handleDataPaginate={(dataPaginate)=>{this.handleDataPaginate(dataPaginate)}}/>
          </div>
        );
    }
}const mapStateToProps = (state, ownProps) => {
  return {
    dataPriceProducts: state.PriceProductsReducer
  }
}
export default connect(mapStateToProps)(ListProductsRight)
