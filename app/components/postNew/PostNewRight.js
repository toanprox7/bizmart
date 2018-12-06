import React, { Component } from 'react';
import "./styles/postNew.css"
import jwt from "jsonwebtoken";
import NumberFormat from 'react-number-format';
import DropzoneWithPreview from './DropzoneWithPreview';
import axios from "axios";
import {connect} from "react-redux";
import Select from 'react-select'
// import ImageUploader from 'react-images-upload';
// import 'react-select2-wrapper/css/select2.css';
// const uuidv1 = require('uuid/v1');

class PostNewRight extends Component {
constructor(props) {
  super(props);
  this.state={
    username:"",
    phone_number:"",
    email:"",
    title:"",
    contentDes:"",
    price:"",
    dataCategory:null,
    image:[],
    category: "",
    id:""
  }
}
handleChange = (category) => {
  this.setState({ category });
  // console.log(`Option selected:`, selectedOption);
}
  componentWillMount(){
    // console.log("halo")
    if(!localStorage.getItem("tokenUser")){
      this.props.history.push("/login");
      window.location.reload();
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps,"he");
  //   // if(!nextProps.dataUser[0].phone_number || nextProps.dataUser[0].phone_number == ""){
  //   //   this.props.history.push("/update-user");
  //   // }
  // }


componentWillReceiveProps(nextProps) {
  // console.log(nextProps,"helo");
  this.setState({
    image:nextProps.dataImage,
    email:nextProps.dataUser[0].email,
    username:nextProps.dataUser[0].username,
    phone_number:nextProps.dataUser[0].phone_number,
    id:nextProps.dataUser[0].id
  });
  if(!nextProps.dataUser[0].phone_number || nextProps.dataUser[0].phone_number == ""){
    this.props.history.push("/update-user");
    window.location.reload();
  }
}

  handleChangeInput=(e)=>{
    e.preventDefault();
    this.setState({
      title: this.refs.title.value,
      contentDes:this.refs.contentDes.value,
      // category:this.refs.category.value,
      price:this.refs.price.state.numAsString,

    });
    // console.log(this.refs.price.state.numAsString);
  }
  async componentDidMount() {
    const response = await axios.get('/categoryapi');
    const data = await response.data;
    this.setState({ dataCategory: data });
  }
  listCategory(){
    //khoong tra ve cai gi ak
    let {dataCategory} = this.state

    if((dataCategory != null) &&(dataCategory.length > 0)){
      var arrayOption=[];
          dataCategory.map((item,index) => {
                var option = { value:item.id, label: item.name };
                arrayOption.push(option);
          })
          return arrayOption;
    }else{
      return null
    }

   }
   checkCategory(){
     if(this.listCategory()){
       return <Select
       placeholder="Chọn danh mục"
                        value={this.state.category}
                        onChange={this.handleChange}
                        options={this.listCategory()}
                      />
     }else{
       return null
     }
   }
   handleSubmitPost=() =>{
     let {title,price,contentDes,image,id} = this.state;
     let category = this.state.category.value;
     if(title != "" && price != "" && contentDes != "" && image.length > 0 && id != "" && category != ""){
      //  let categoryInt = parseInt(category);
       var infoData = {
         title:title,
         price:price,
         content:contentDes,
         image:image,
         usersId:id,
         level:"1",
         status:"active",
         total_star:0,
         categoryId:category
       }
       let self = this;
       axios.get("/files/resizeImg").then(function (res) {
        console.log(res);
       }).catch(function (err) {
        console.log(err);
       })
       axios.post("/productsapi/create",infoData)
        .then(function (res) {
          console.log(res)
          self.props.history.push("/");
        }).catch(function (err) {
          throw err;
        });
     }else{
       alert("ban vui long nhap day du thong tin truoc khi post");
     }
   }
    render() {
      // console.log(this.checkCategory(),"data root")
      const { selectedOption } = this.state;
      // const options = this.listCategory();
      // console.log(options,"options");
      // console.log(dataUser,"user");
        return (
        <div className="post-new">
          <div className="block-post-new">
            <div className="title-post-new">
              <h3>Đăng tin rao</h3>
            </div>
            <div className="block-info-product-post">
              <div className="title-info-post">
                <label>Tiêu đề</label>
                <input onChange={this.handleChangeInput} type="text" name="title" ref="title"/>
              </div>
              <div className="content-des-info-post">
                <label>Nội dung mô tả</label>
                <textarea onChange={this.handleChangeInput} ref="contentDes" placeholder="Điền nội dung chi tiết bằng tiếng việt có dấu" />
              </div>
              <div className="img-products-info-post">
                <h3>Hình ảnh sản phẩm</h3>
                <span>Được phép đăng tối đa 6 ảnh, mỗi ảnh không quá 4mb</span>

                <div className="file-and-area">
                  {/* <input type="file" name="file" id="file" className="inputfile" />
                  <label htmlFor="file"><img src="/images/upload.png" /><span>Tải ảnh lên</span></label> */}
                   <DropzoneWithPreview />
                   <div className="select-custom">
                      {/* <select onChange={this.handleChangeInput} defaultValue={this.state.category} ref="category">
                        <option value="">Chọn danh mục</option>

                      </select> */}

                  {this.checkCategory()}
                    </div>
                </div>
              </div>
              <div className="price-info-post">
                <p>Giá</p>
                <NumberFormat
                onChange={this.handleChangeInput} ref="price" name="price" thousandSeparator={'.'} decimalSeparator={','} suffix={'đ'} />
                {/* <p className="price-info-post red">0 nghìn đồng</p> */}
              </div>
              <div className="user-sell-phone-info-post">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="user-sell-info-post">
                      <label>Tên người bán</label>
                      <input disabled value={this.state.username} type="text" />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="phone-info-post">
                      <label>Số điện thoại</label>
                      <input disabled value={this.state.phone_number} type="text"  />
                    </div>
                  </div>
                </div>
              </div>
              <div className="email-info-post">
                <label>Email</label>
                <input disabled value={this.state.email} type="email" placeholder="Nhập email để được tạo tài khoản miễn phí" />
              </div>
              <div className="button-post-new">
                <button onClick={this.handleSubmitPost}>Đăng tin</button>
              </div>
            </div>
          </div>
        </div>
        );
    }
}
const mapStateToProps = (state) => ({
  dataImage:state.productsReducer.dataImageLocal,
  dataUser:state.usersReducer.dataUserLocal
})
export default connect(mapStateToProps)(PostNewRight)
