import React, { Component } from 'react';
import CommentProduct from './CommentProduct';

class RatingProductsDetails extends Component {
    render() {
        return (
        <div className="block-rating-products-details">
            <div className="row">
             <CommentProduct idProduct={this.props.idProduct}/>
            </div>
          </div>

        );
    }
}

export default RatingProductsDetails;
