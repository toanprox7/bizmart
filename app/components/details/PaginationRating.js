import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import {connect} from "react-redux";
import axios from "axios";
class PaginationRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }
  componentDidMount() {
    var self = this;
    axios.get(`/ratingapi/getAllRatingsById?productsId=${this.props.idProduct}&sort=createdAt+desc`)
      .then(function (res) {
        self.setState({
          totalRating:res.data
        });
      }).catch(function (err) {
        console.log(err);
      })
  }

  handlePageChange(pageNumber) {
    // console.log(this.props.ratings.length)
    // console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    var skipStart = (pageNumber - 1) * 10;
    var self = this;
    axios.get(`/ratingapi/getAllRatingsById?productsId=${this.props.idProduct}&skip=${skipStart}&limit=10&sort=createdAt+desc`)
      .then(function (res) {
        self.props.handleDataPaginate(res.data)
      }).catch(function (err) {
        console.log(err);
      })
  }
  checkTotalRating(){
    if(this.state.totalRating){
      return this.state.totalRating.length
    }else{
      return null;
    }
  }
  render() {
    // console.log(,"total rating");
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.checkTotalRating()}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => this.handlePageChange(pageNumber)}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ratings: state.ratingsReducer
  }
}
export default connect(mapStateToProps, null)(PaginationRating)
