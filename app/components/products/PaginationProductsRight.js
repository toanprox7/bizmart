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
    var self = this;
    axios.get(`/productsapi/getAllProductsById?categoryId=${this.props.id}&sort=createdAt+desc`)
      .then(function (res) {
        self.setState({
          totalProducts:res.data
        });
      }).catch(function (err) {
        console.log(err);
      })

  }
  handlePageChange(pageNumber) {
    // console.log(this.props.ratings.length)
    // console.log(`active page is ${pageNumber}`);
    this.props.activePageChange({activePage:false})
    this.setState({activePage: pageNumber});
    var skipStart = (pageNumber - 1) * 12;
    var endPage = skipStart+12;
    if(this.props.dataPriceProducts.length >0){
      var arrayData=[]
      this.props.dataPriceProducts.map((item,index) => {
        if(index < endPage && index >= skipStart){
          arrayData.push(item);
        }else{
          return null
        }
        return this.props.handleDataPaginate(arrayData)
      })
    }else{
      var self = this;
      axios.get(`/productsapi/getAllProductsById?categoryId=${this.props.id}&skip=${skipStart}&limit=12&sort=createdAt+desc`)
        .then(function (res) {
          self.props.handleDataPaginate(res.data)
        }).catch(function (err) {
          console.log(err);
        })
    }

  }
  checkTotal(){
    if(this.state.totalProducts){
      return this.state.totalProducts.length
    }else{
      return null;
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps,"pagination");
    if(nextProps.dataPriceProducts && nextProps.dataPriceProducts.length >0){
      this.setState({
        totalProducts:nextProps.dataPriceProducts
      });
    }
    if(nextProps.activePageData !== null && nextProps.activePageData != undefined){
      if(nextProps.activePageData.activePage == true){
        this.setState({
          activePage:1
        });
      }

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
