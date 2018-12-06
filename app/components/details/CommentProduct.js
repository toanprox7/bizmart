import React, { Component } from 'react';
import ListCommentProducts from './ListCommentProducts';

class CommentProduct extends Component {
    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="title-rating-products">
                    <h3>Đánh giá sản phẩm</h3>
                </div>
                <ListCommentProducts idProduct={this.props.idProduct}/>
            </div>


        );
    }
}

export default CommentProduct;
