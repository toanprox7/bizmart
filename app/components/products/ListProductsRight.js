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
  componentDidMount() {
    // console.log(this.props.id)
    var self=this;
    axios.get(`/productsapi/getAllProductsById?categoryId=${this.props.id}&skip=0&limit=12&sort=createdAt+desc`)
      .then(function (res) {
        self.setState({
          dataCategory:res.data
        })
        // self.props.dataProducts(res.data);
    }).catch(function (err) {
      console.log(err);
    })

  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if(nextProps.dataPriceProducts){
      var arrayNew=[];
      nextProps.dataPriceProducts.map((item,index) => {
        if(index <12 && index >=0){
          arrayNew.push(item);
        }else{
          return null
        }
      })

      return this.setState({
        dataCategory:arrayNew
      });
    }
  }

  handleDataPaginate(dataPaginate){
    this.setState({
      dataCategory:dataPaginate
    });
  }

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
            <PaginationProductsRight id={this.props.id} handleDataPaginate={(dataPaginate)=>{this.handleDataPaginate(dataPaginate)}}/>
          </div>
        );
    }
}const mapStateToProps = (state, ownProps) => {
  return {
    dataPriceProducts: state.PriceProductsReducer
  }
}
export default connect(mapStateToProps)(ListProductsRight)
