import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import "./js/owl/css/navOwl.css";
import ItemProductsSimilar from "./ItemProductsSimilar";
import {fetchAllProductsByCategoryId} from "../../actions/productsAction";
import {connect} from "react-redux";
const options = {
    margin:10,
    loop:false,
    dots:false,
    nav:true,
    responsive:{
      0:{
          items:1
      },
      300:{
        items:2
      },
      773:{
          items:3
      },
      1000:{
          items:4
      }
  },
  autoplay:false
};

class ListProductsSimilar extends Component {
  constructor(props) {
    super(props);
  }
componentDidMount() {
  this.props.fetchAllProductsByCategoryId({categoryId:this.props.idCategory})
}
checkData(){
  let categoryId = this.props.categoryProducts
  if(categoryId.length > 0){
    return categoryId.map((item,index) => {
      return <ItemProductsSimilar idCategory={this.props.idCategory} key={index} data={item} />
    })
  }else{
    return null;
  }
}


    render() {
      // this.checkIdCategory();
        return (
    <div className="list-similar-product">
        <OwlCarousel options={options} >
        {this.checkData()}

        </OwlCarousel>
      </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAllProductsByCategoryId: categoryId => dispatch(fetchAllProductsByCategoryId(categoryId))
})
const mapStateToProps = (state, ownProps) => {
  return {
    categoryProducts: state.productsCategoryReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListProductsSimilar)
