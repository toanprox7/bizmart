import React, { Component } from 'react';
import InfoProductsDetailsMain from './InfoProductsDetailsMain';
import RatingProductsDetails from './RatingProductsDetails';
import './styles/details.css';
import SimilarProductsDetails from './SimilarProductsDetails';
import {connect} from "react-redux";
import {addDataProductsLocal} from "../../actions";
import axios from "axios"
import {fetchProductById} from "../../actions/productsAction";
import {checkProcess} from "../../actions/settings";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state={
      params:null
    }
  }
componentWillMount = () => {
   this.setState({
    params:this.props.match.params

  });
}

    async componentDidMount(){
      await this.props.checkProcess({
        isLoading:true,
        percent:30
      });
      await this.props.fetchProductById(this.props.match.params.idProducts);
     
   }
componentWillReceiveProps = (nextProps) => {
  // console.log(nextProps,"details");
  if(nextProps.match.params.idProducts !== this.props.match.params.idProducts){
    this.setState({
      params:nextProps.match.params
    })
     nextProps.fetchProductById(nextProps.match.params.idProducts);
    
  }

  
}

    render() {
      // const idProduct = this.props.match.params.idProducts;
      // const idCategory = this.props.match.params.idCategory;
      const {params}= this.state;
      const {product}=this.props;
        return (
        <div id="main">
			    <div className="container">
            <InfoProductsDetailsMain dataProducts={product}/>
            <RatingProductsDetails idProduct={params.idProducts}/>
            <SimilarProductsDetails idCategory={params.idCategory} dataProducts={product}/>
          </div>
		    </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
  addDataProducts: getDataProductsLocal => dispatch(addDataProductsLocal(getDataProductsLocal)),
  fetchProductById: productId => dispatch(fetchProductById(productId)),
  checkProcess: dataProcess => dispatch(checkProcess(dataProcess)),
  
})
const mapStateToProps = (state) => ({
  dataProducts:state.productsReducer.dataProductsLocal,
  product: state.productReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(Details)
