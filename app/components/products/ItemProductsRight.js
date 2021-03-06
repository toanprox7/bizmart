import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NumberFormat from "react-number-format";
import StarRatingComponent from 'react-star-rating-component';
class ItemProductsRight extends Component {
  constructor(props) {
    super(props);
    this.state={
      rating:2
    }
  }

handleLinkImage=() =>{
  var position = this.props.data.image.indexOf(",");
  if(position != -1){
    return this.props.data.image.split(",",1);
  }else{
    return this.props.data.image;
  }
}

  render() {
    function ChangeToSlug(title){
      var slug;

      //Lấy text từ thẻ input title

      //Đổi chữ hoa thành chữ thường
      slug = title.toLowerCase();

      //Đổi ký tự có dấu thành không dấu
      slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
      slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
      slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
      slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
      slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
      slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
      slug = slug.replace(/đ/gi, 'd');
      //Xóa các ký tự đặt biệt
      slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
      //Đổi khoảng trắng thành ký tự gạch ngang
      slug = slug.replace(/ /gi, "-");
      //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
      //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
      slug = slug.replace(/\-\-\-\-\-/gi, '-');
      slug = slug.replace(/\-\-\-\-/gi, '-');
      slug = slug.replace(/\-\-\-/gi, '-');
      slug = slug.replace(/\-\-/gi, '-');
      //Xóa các ký tự gạch ngang ở đầu và cuối
      slug = '@' + slug + '@';
      slug = slug.replace(/\@\-|\-\@|\@/gi, '');
      //In slug ra textbox có id “slug”
      return slug;
  }
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div className="thumbnail">
          <Link to={`/details/${ChangeToSlug(this.props.data.title)}-${this.props.data.id}-${this.props.data.categoryId}`}>
          <div className="wrap-img">
          <img className="img-item" src={`/images/upload/${this.handleLinkImage()}`} alt="image_products" />
          </div>
          </Link>
          <div className="caption">

            <Link to={`/details/${ChangeToSlug(this.props.data.title)}-${this.props.data.id}-${this.props.data.categoryId}`}><h5>{this.props.data.title}</h5></Link>
            <p className="price">
              <span className="price-right"></span>
              <span><NumberFormat thousandSeparator={true} displayType={'text'} value={this.props.data.price} /></span>
            </p>
            <StarRatingComponent
            starColor="yellow"
            emptyStarColor="#d5d5d5"
            name="rate6"
            editing={false}
            // renderStarIcon={() => <span></span>}
            starCount={5}
            value={this.props.data.total_star} />
          </div>
        </div>
      </div>

    );
  }
}

export default ItemProductsRight;
