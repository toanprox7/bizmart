import React, { Component } from 'react';
import InfoProductsDetailsMain from './InfoProductsDetailsMain';
import RatingProductsDetails from './RatingProductsDetails';
import './styles/details.css';
import SimilarProductsDetails from './SimilarProductsDetails';
import {connect} from "react-redux";
import {addDataProductsLocal} from "../../actions";
import axios from "axios"
import {fetchProductById} from "../../actions/productsAction";
class Details extends Component {
  constructor(props) {
    super(props);

  }

    componentDidMount(){
      this.props.fetchProductById(this.props.match.params.idProducts);
   }

    render() {
      const idProduct = this.props.match.params.idProducts;
      const idCategory = this.props.match.params.idCategory;

        return (
        <div id="main">
			    <div className="container">
            <InfoProductsDetailsMain dataProducts={this.props.product}/>
            <RatingProductsDetails idProduct={idProduct}/>
            <SimilarProductsDetails idCategory={idCategory} dataProducts={this.props.product}/>
          </div>
		    </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
  addDataProducts: getDataProductsLocal => dispatch(addDataProductsLocal(getDataProductsLocal)),
  fetchProductById: productId => dispatch(fetchProductById(productId))
})
const mapStateToProps = (state) => ({
  dataProducts:state.productsReducer.dataProductsLocal,
  product: state.productReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(Details)
