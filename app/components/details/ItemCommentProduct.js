import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
class ItemCommentProduct extends Component {
  constructor(props) {
    super(props);

  }
  checkImage(){
    var guess = "/images/rating/guess.jpg"
    if(this.props.dataRatingsItem.usersId){
      return this.props.dataRatingsItem.usersId.image;
    }else{
      return guess;
    }
  }
checkName(){
  var guess = "Khách"
    if(this.props.dataRatingsItem.usersId){
      return this.props.dataRatingsItem.usersId.username;
    }else{
      return guess;
    }
}
  render() {
    // console.log(this.props.dataRatingsItem,"data cmt");
    return (
    <div className="item-rating">
      <div className="img-rating">
        <img src={this.checkImage()} alt="img_product" />
      </div>
      <div className="info-rating">
        <h5>{this.checkName()}</h5>
        <StarRatingComponent
                  name="rate4"
                  starCount={5}
                  value={this.props.dataRatingsItem.star_item}
                  starColor="#b34c4c"
                  emptyStarColor={`#4b4b4b`}
                  editing={false}
                />
        <div className="content-rating">
          <p>{this.props.dataRatingsItem.content}</p>
          <span>{this.props.dataRatingsItem.createdAt.slice(0, 10)}</span>
        </div>
      </div>
    </div>
    );
  }
}

export default ItemCommentProduct;
