import React, { Component } from 'react';
import {Link} from "react-router-dom";
import $ from "jquery";
import {connect} from "react-redux";
import "../styles/category.css";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
class ConstantCategoryLeft extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      collapse1: false 
    };
  }
  toggle(data) {
    console.log(data,"e day hihi");
    var data2 = eval(`!this.state.${data}`);
    var data3=eval(data);
    console.log(data2,"dataa2")
    this.setState({ collapse1: data2 });
  }
  
  cay = (parentId) =>{
    if(this.props.dataCategory.length > 0){

      return this.props.dataCategory.filter( (item) => {
        return item.parentId == parentId;
        }).map( (item) => {
          const result=[];
           result.push({
            id:item.id,
            name:item.name,
            parentId:this.cay(item.id)
          })
          return result;
        })
      //  return result;
    }else{
      return null
    }

  }
  ChangeToSlug(title){
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
  mapping = (data) => {
    if(data){
      if(data.length > 0 && typeof data !== "undefined"){
        return data.map(item => {
          return item.map((item2,index) => {
            return <li key={item2.id}><i data-toggle="collapse" href={`#collapse${item2.id}`}class="fa fa-chevron-down"></i><Link to={`/products/${this.ChangeToSlug(item2.name)}-${item2.id}/1/0`}>{item2.name}</Link><ul id={`collapse${item2.id}`} className="collapse">{this.mapping(item2.parentId)}</ul></li>
          })
        })
      }else{
        return null
      }
    }
    else{
      return null
    }

  }

    render() {
      const dataCate =this.cay(0);
      // console.log(dataCate,"cay2");
      // console.log(this.mapping(this.cay(0,this.props.dataCategory)),"fddf")
      const data=1;
        return (
            <div className="category-products">
            <div className="title-category-products">
              <h3>Danh mục sản phẩm</h3>
            </div>
            {/* <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button> */}
            <ul className="nav-cate">
            <li onClick={(data) => this.toggle(`collapse1`)}><Link to="#">Quần áo</Link></li>
            <Collapse isOpen={this.state.collapse1}>
            <ul style={{
              paddingLeft:10
            }}>
            <li onClick={(data) => this.toggle(`collapse2`)}><Link to="#">Quần áo nam</Link></li>
            <Collapse isOpen={this.state.collapse2}>
            <li><Link to="#">Quần áo nữ</Link></li>
            <li><Link to="#">hello3</Link></li>
            </Collapse>
            </ul>
           
            
        </Collapse>
              {this.mapping(dataCate)}
            </ul>
            {/* <h3>Danh mục sản phẩm2</h3> */}
           
      
          </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    dataCategory: state.categorysReducer
  }
}
export default connect(mapStateToProps)(ConstantCategoryLeft)
