import React, { Component } from 'react';
import ProductsSale from './ProductsSale';
import ProductsHot from './ProductsHot';
import SpendMyself from './SpendMyself';
import "./styles/style.css";
import {connect} from "react-redux";
import axios from "axios";
import {addDataProductsLocal} from "../../actions";
class HomeRight extends Component {
  async componentDidMount() {
    const response = await axios.get('/productsapi?sort=createdAt+desc');
    const data = await response.data;
    this.props.addDataProducts(data);
  }

    render() {
        return (
            <React.Fragment>
                <ProductsSale dataProducts={this.props.dataProducts} />
                <ProductsHot />
                <SpendMyself />
            </React.Fragment>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
  addDataProducts: getDataProductsLocal => dispatch(addDataProductsLocal(getDataProductsLocal))
})
const mapStateToProps = (state) => ({
  dataProducts:state.productsReducer.dataProductsLocal
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeRight)
