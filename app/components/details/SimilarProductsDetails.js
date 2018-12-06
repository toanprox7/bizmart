import React, { Component } from 'react';
import ListProductsSimilar from './ListProductsSimilar';

class SimilarProductsDetails extends Component {
    render() {
        return (
<div className="block-similar-products-details">
  <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div className="title-similar-products">
        <h3>Sản phẩm tương tự</h3>
      </div>
      <ListProductsSimilar idCategory={this.props.idCategory} dataProducts={this.props.dataProducts}/>
    </div>
  </div>
</div>

        );
    }
}

export default SimilarProductsDetails;
