import React, { Component } from 'react';
import jwt from "jsonwebtoken";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import PaginationRating from "./PaginationRating";
import ItemCommentProduct from "./ItemCommentProduct";
import {connect} from "react-redux";
import * as ratingAction from "../../actions/ratingsAction";
import * as userActions from "../../actions/usersAction";
import {tokenAuthorization} from "app/utils"
class ListCommentProducts extends Component {
  constructor(props) {
    super(props);
    this.state={
      rating: 0,
      contentRating:"",
      idProduct:parseInt(this.props.idProduct),
      displayModal:"none",
    }
  }
  componentDidMount() {
    // console.log(tokenAuthorization,"token test");
    if(localStorage.getItem("tokenUser")){
      let token = localStorage.getItem("tokenUser");
      var decoded = jwt.verify(token, 'toanpro');
      this.props.fetchUserById(decoded.id);
    }
    var self = this;
    axios.post(`/ratingapi/getAllRatingsById`,{
      productsId:this.props.idProduct,
      skip:0,
      limit:10,
      sort:"createdAt+desc"
    },{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
      .then(function (res) {
        self.setState({
          dataPaginate:res.data
        });
      }).catch(function (err) {
        console.log(err);
      })
  }


  componentWillReceiveProps(nextProps) {
    // console.log(nextProps,"nextProps list cmt");
    var self = this;
    axios.post(`/ratingapi/getAllRatingsById`,{
      productsId:nextProps.idProduct,
      skip:0,
      limit:10,
      sort:"createdAt+desc"
    },{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
      .then(function (res) {
        self.setState({
          dataPaginate:res.data,
          idProduct:parseInt(nextProps.idProduct)
        });
      }).catch(function (err) {
        console.log(err);
      })

    if(localStorage.getItem("tokenUser")){
      this.setState({
        // dataPaginate:nextProps.ratings,
        idUser:nextProps.user.id,
        image:nextProps.user.image
      });
    }else{
      this.setState({
        image:"/images/rating/guess.jpg",
        idUser:0,
        // dataPaginate:nextProps.ratings,
      });
    }
  }

  onHandleClick(nextValue, prevValue, name) {
    var self= this;
    self.setState({
      rating:nextValue
    });
  }

  handleChangeDataText(event){
    event.preventDefault();
    let value = event.target.value;
    this.setState({
      contentRating:value
    });
  }
 async handleButtonSend(){
   if(this.state.rating != 0){
    var self=await this;
    var infoRating=await {
      content:this.state.contentRating,
      star_item:this.state.rating,
      productsId:this.state.idProduct,
      usersId:this.state.idUser
    }
   
    await this.props.createRating(infoRating);
    // let arrayInfoRating=await [...infoRating];
    let paginateOld=await [...this.state.dataPaginate];
    await paginateOld.pop();
    // console.log(paginateOld,"old")
    await this.setState({
      dataPaginate:[Object.assign({}, this.props.ratings[0]),...paginateOld],
      contentRating:"",
      rating: 0,
      displayModal:"none",
    });
    await axios.post("/ratingapi/getAllRatingsById",{productsId:this.state.idProduct},{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
    .then(function (response) {
      // debugger;
      var arrayToltal=[];
      response.data.map(item => {
        arrayToltal.push(parseInt(item.star_item));
      })
      return arrayToltal;
      // console.log(arrayToltal,"get rating flow id");
    }).then(function (total) {
      // console.log(total,"total");
      function getSum(total, num) {
        return total + num;
      }
      var totalLength = total.length;
      var totalStar = total.reduce(getSum);
      var totalStarRoot = Math.ceil(totalStar/totalLength);
      return totalStarRoot;
    }).then(function (totalStar) {
    //  console.log(totalStar,"total star");
     self.setState({
       total_star:totalStar,
       
     })
    })
    .catch(function (err) {
      console.log(err);
    })
    await this.updateTotalStar();
    // await window.location.reload();
   }else if(this.state.rating == 0){
     alert("Bạn vui lòng đánh giá sao trước khi đánh giá")
   }
  }

  updateTotalStar(){
    axios.post("/productsapi/updateRatingProducts",{total_star:this.state.total_star,id:this.state.idProduct},{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then(function (response) {
      // console.log(response)
    }).catch(function (err) {
      return err;
    })
  }
  checkMapData(){

    let ratings = this.state.dataPaginate;
    // console.log(dataPaginate);
    if(ratings){
      if(ratings.length >0){
        return ratings.map((item,index) => {
          return <ItemCommentProduct key={index} dataRatingsItem={item} />
        })
      }

    }else{
      return null
    }
  }
  checkUser(){
    let {user} = this.props;
    if(user.length >0){
      return user;
    }else{
      return null
    }
  }
  handleDataPaginate(dataPaginate){
    this.setState({
      dataPaginate
    });
  }
    render() {
        const { rating } = this.state;
        return (
        <div className="list-rating-products">
 <div className="modal fade in" id="modal-default" style={{ display:this.state.displayModal, paddingRight: '15px' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" onClick={() => {
this.setState({
  displayModal:"none"
})}}>×</span>
                </button>
                <h4 className="modal-title">Đánh giá</h4>
              </div>
              <div className="modal-body" style={{fontSize: "200%",
    textAlign: "center"}}>
              <StarRatingComponent
                  name="rate5"
                  starCount={5}
                  value={rating}
                  onStarHover ={this.handleOnHoverStar}
                  onStarClick={(nextValue, prevValue, name) => this.onHandleClick(nextValue, prevValue, name)}
                />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default pull-left" onClick={() => {
this.setState({
  displayModal:"none"
})
        }}>Close</button>
<button onClick={()=> this.handleButtonSend()} className="btn btn-danger">Đồng ý</button>
           </div>
            </div>
          </div>
        </div>
            <div className="input-item-rating">
              <div className="img-rating">
                <img src={this.state.image?this.state.image:"/images/rating/guess.jpg"} alt="img_product" />
              </div>
              <div className="input-comment">
                <textarea onChange={(event) => this.handleChangeDataText(event)} ref="inputRating" value={this.state.contentRating} style={{paddingLeft:10}} name="inputRating" placeholder="Đánh giá sản phẩm..."  />

                <button onClick={() => {
if(this.state.contentRating == ""){
alert("Bạn vui lòng nhập bình luận trước khi đánh giá");
}else if(this.state.contentRating !== ""){
  this.setState({
    displayModal:"block"
  });
}

                }}>Gửi</button>
              </div>
            </div>
          {this.checkMapData()}
          <PaginationRating idProduct={this.state.idProduct} handleDataPaginate={(dataPaginate)=>{this.handleDataPaginate(dataPaginate)}} />
          </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // This dispatch will trigger
    // the Ajax request we setup
    // in our actions
    createRating: rating => dispatch(ratingAction.createRating(rating)),
    fetchUserById: userId => dispatch(userActions.fetchUserById(userId)),
    fetchAllRatingsByProductId: productId => dispatch(ratingAction.fetchAllRatingsByProductId(productId))

  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ratings: state.ratingsReducer,
    user: state.userReducer,
    ratingsProduct:state.ratingsProductReducer
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListCommentProducts)
