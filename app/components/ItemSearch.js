import React, { Component } from 'react';
import NumberFormat from "react-number-format";
import StarRatingComponent from 'react-star-rating-component';
import {Link} from "react-router-dom";
class ItemSearch extends Component {
  constructor(props) {
    super(props);

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
  // console.log(this.props.data)
    return (
 <Link to={`/details/${ChangeToSlug(this.props.data.title)}-${this.props.data.id}-${this.props.data.categoryId}`}>
      <div className="item-search">
        <div className="img-products-search">
          <img src={`/images/upload/small/${this.handleLinkImage()}`} width="70px" height="70px" alt="img-search" />
        </div>
        <div className="info-products-search">
          <div className="title-products-search">
            <p>{this.props.data.title}</p>
          </div>
          <div className="info-bottom-products-search">
            <div className="price-search">
              <span><NumberFormat thousandSeparator={true} displayType={'text'} value={this.props.data.price} /></span>
            </div>
            <div className="star-search">
            <StarRatingComponent
            starColor="yellow"
            emptyStarColor="#d5d5d5"
            name="rate6"
            editing={false}
            starCount={5}
            value={this.props.data.total_star} />
            </div>
          </div>
        </div>
      </div>
      </Link>

    );
  }
}

export default ItemSearch;
