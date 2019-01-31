import React, { Component } from 'react';
import NumberFormat from "react-number-format";
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {checkProcess} from "../../actions/settings";
class InfoProductsDetailRight extends Component {
  constructor(props) {
    super(props);
    this.state={
      rating: 1
    }
  }
  checkProducts(){
    let {dataProducts} = this.props
    if(dataProducts){
     return dataProducts
    }else if(dataProducts.length == 0){
      return null;
    }
  }

  checkPhone(){
    let {dataProducts} = this.props
    if(dataProducts.usersId){
     return dataProducts.usersId.phone_number
    }else{
      return null;
    }
  }
  checkUsername(){
    let {dataProducts} = this.props
    if(dataProducts.usersId){
     return dataProducts.usersId.username
    }else{
      return null;
    }
  }

componentWillReceiveProps(nextProps) {
  console.log(nextProps,"tets");
}

  createMarkup(){
    return {__html: 'First &middot; Second'};
  }
// componentDidMount() {
//   this.refs.content.innerHTML = "<b>Hello</b>";
// }

    render() {
      const dataProduct = this.checkProducts();
     const dataPhone = this.checkPhone();
     const dataUsername = this.checkUsername();
const {dangerouslySetInnerHTML} =this.props;
    //  console.log(dataProduct)
    //  console.log(dataUser,"data user");
        return (
        <div className="info-products-details">
            <h3>{dataProduct.title}</h3>

            {/* <div className="rating-star"> */}
            <StarRatingComponent
            starColor="yellow"
            emptyStarColor="#d5d5d5"
            name="rate2"
            editing={false}
            // renderStarIcon={() => <span></span>}
            starCount={5}
            value={dataProduct.total_star}
        />
            {/* </div> */}
            {/* <div className="old-price">
              <p>Giá cũ: 230.000đ</p>
            </div> */}
            <div className="new-price">
              <p>Giá:  <NumberFormat value={dataProduct.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={'đ'} /></p>
              {/* <span class="promotion">-7%</span> */}
            </div>
            <div className="info-details">
              <h3>Thông tin chi tiết:</h3>
              <div dangerouslySetInnerHTML={{ __html: dataProduct.content }} />
                {/* {dataProduct.content} */}
                {/* <a href="#">Xem thêm</a> */}
              {/* </div> */}

            </div>
            <div className="commitment">
              {/* <h3>Cam kết:</h3>
              <p>
                Giao hàng đúng thời hạn
                Free Ship các đơn  có Giá &gt; 200.000đ
                Hàng lỗi có thể đổi lại hàng khí đã nhận được hàng
              </p> */}
            </div>
            <div className="two-buttons-main">
              <div className="button-add-cart">
                <button><i className="fa fa-phone" /> {dataPhone}</button>
              </div>
              <div className="button-buy-now">
                <button>{dataUsername}</button>
              </div>
            </div>
          </div>

        );
    }
}
InfoProductsDetailRight.propTypes = {
  dataProducts: PropTypes.object
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkProcess: (process) => {
      dispatch(checkProcess(process))
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ratings: state.ratingsReducer,
    user: state.userReducer
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(InfoProductsDetailRight)
