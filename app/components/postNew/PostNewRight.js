import React, { Component } from 'react';
import "./styles/postNew.css"
import jwt from "jsonwebtoken";
import NumberFormat from 'react-number-format';
import DropzoneWithPreview from './DropzoneWithPreview';
import axios from "axios";
import {connect} from "react-redux";
import Select from 'react-select'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {fetchUserById} from "../../actions/usersAction";
import {tokenAuthorization} from "app/utils"
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
    let token = localStorage.getItem("tokenUser");
    let self=this;
    if(!token){
      this.props.history.push("/login");
      // window.location.href="/login";
// this.props.history.push("/login")
    }else{
      jwt.verify(token, 'toanpro', function(err, decoded) {
        if(err) {
          localStorage.removeItem("tokenUser");
          self.props.history.push("/login")
        }else{
          self.props.getUserById(decoded.id);
        }
      });
    }
    // if(!this.props.dataUser.phone_number || this.props.dataUser.phone_number === ""){
    //   this.props.history.push("/update-user");
    // }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps,"he");
  //   // if(!nextProps.dataUser[0].phone_number || nextProps.dataUser[0].phone_number == ""){
  //   //   this.props.history.push("/update-user");
  //   // }
  // }


componentWillReceiveProps(nextProps) {
  console.log(nextProps,"helo");
  this.setState({
    image:nextProps.dataImage,
    email:nextProps.dataUser.email,
    username:nextProps.dataUser.username,
    phone_number:nextProps.dataUser.phone_number,
    id:nextProps.dataUser.id
  });
  if(!nextProps.dataUser.phone_number || nextProps.dataUser.phone_number === ""){
    this.props.history.push("/update-user");
  }
   
}

  handleChangeInput=(e)=>{
    e.preventDefault();
    // console.log(this.refs.title,"title");
var {name}= e.target;
var {value}= e.target;
    this.setState({
     [name]:value,
      // contentDes:this.refs.contentDes.value,
      // category:this.refs.category.value,
      price:this.refs.price.state.numAsString,

    });
    // console.log(this.refs.price.state.numAsString);
  }
  async componentDidMount() {
    const response = await axios.get('/categoryapi',{
      headers: {
        'authorization':tokenAuthorization,
      }
    });
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
   handleSubmitPost=(event, errors, values) =>{
    var arrayErr=[];
    if(this.refs.price.state.numAsString ==0){
      arrayErr.push("err");
      this.setState({
        errPrice:"Giá sản phẩm không được để trống"
      });
      }else{
        this.setState({
          errPrice:""
        });
      }
    if(this.state.contentDes =='<p>&nbsp;</p>'){
      arrayErr.push("err");
      this.setState({
        errContent:"Nội dung sản phẩm không được để trống"
      });
      }else{
        this.setState({
          errContent:""
        });
      }
    if(this.state.category == ""){
      arrayErr.push("err");
      this.setState({
        errCategory:"Vui lòng lựa chọn danh mục"
      });
      }else{
        this.setState({
          errCategory:""
        });
      }
    if(this.state.title == ""){
      arrayErr.push("err");
      }

    if(this.state.image.length == 0){
      arrayErr.push("err");
      this.setState({
        errImage:"Ảnh đăng không được để trống"
      });
      }else{
        this.setState({
          errImage:""
        });
      }


     if(arrayErr.length === 0 && errors.length ===0){
      //  console.log("ngon ko loi");
      let {title,price,contentDes,image,id} = this.state;
      let category = this.state.category.value;
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
      axios.get("/files/resizeImg",{
        headers: {
          'authorization':tokenAuthorization,
        }
      }).then(function (res) {
       console.log(res);
      }).catch(function (err) {
       console.log(err);
      })
      axios.post("/productsapi/create",infoData,{
        headers: {
          'authorization':tokenAuthorization,
        }
      })
       .then(function (res) {
         console.log(res)
         self.props.history.push("/");
        //  window.location.href=
       }).catch(function (err) {
         throw err;
       });
     }
   }
   handleBlurPrice(e){
    // console.log(e.target,"target");
    // console.log(this.refs.price.state.numAsString,"ref");
    let price=this.refs.price.state.numAsString;
    if(e.target.value.length ==0){
    this.setState({
      errPrice:"Giá sản phẩm không được để trống"
    });
    }
      }
    render() {
      // console.log(this.checkCategory(),"data root")
      const { selectedOption } = this.state;
        return (
        <div className="post-new">
          <div className="block-post-new">
            <div className="title-post-new">
              <h3>Đăng tin rao</h3>
            </div>
            <AvForm onSubmit={(event, errors, values)=>this.handleSubmitPost(event, errors, values)}>
            <div className="block-info-product-post">
              <div className="title-info-post">
              <AvField style={{marginBottom:0}} onChange={(e) => this.handleChangeInput(e)} ref="title" name="title" placeholder="Vui lòng nhập tên sản phẩm" label="Tên sản phẩm" type="text" validate={{
              required: {value: true, errorMessage: 'Tên sản phẩm không được để trống'},
              pattern: {value: '^[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ ]+$', errorMessage: 'tên sản phẩm bạn nhập không đúng'},
              maxLength: {value: 50, errorMessage: 'tên sản phẩm phải chứa nhiều nhất 50 ký tự '}
            }} />
                {/* <label>Tiêu đề</label>
                <input onChange={this.handleChangeInput} type="text" name="title" ref="title"/> */}
              </div>
              <div className="content-des-info-post">
                <label>Nội dung mô tả</label>
                <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.contentDes}
                    onChange={ ( event, editor ) => {
                        const contentDes = editor.getData();
                        // console.log(data);
                        // if(data)
                        this.setState({contentDes});
                    } }

                />
                <div class="invalid-feedback">{this.state.errContent?this.state.errContent:null}</div>
                {/* <textarea onChange={this.handleChangeInput} ref="contentDes" placeholder="Điền nội dung chi tiết bằng tiếng việt có dấu" /> */}
              </div>
              <div className="img-products-info-post">
                <h3>Hình ảnh sản phẩm</h3>
                <span>Được phép đăng tối đa 6 ảnh, mỗi ảnh không quá 4mb</span>

                <div className="file-and-area">
                  {/* <input type="file" name="file" id="file" className="inputfile" />
                  <label htmlFor="file"><img src="/images/upload.png" /><span>Tải ảnh lên</span></label> */}
                   <DropzoneWithPreview />
                   <div class="invalid-feedback">{this.state.errImage?this.state.errImage:null}</div>
                   <div className="select-custom">
                      {/* <select onChange={this.handleChangeInput} defaultValue={this.state.category} ref="category">
                        <option value="">Chọn danh mục</option>

                      </select> */}

                  {this.checkCategory()}
                  <div class="invalid-feedback">{this.state.errCategory?this.state.errCategory:null}</div>
                    </div>
                </div>
              </div>
              <div className="price-info-post">
              <p>Giá</p>
              <NumberFormat onChange={(e) => this.handleChangeInput(e)} maxLength="20" minLength="5" ref="price" onBlur={(e) => this.handleBlurPrice(e)} placeholder="Nhập giá sản phẩm" thousandSeparator={true} suffix={'đ'} />
              <div class="invalid-feedback">{this.state.errPrice?this.state.errPrice:null}</div>
                {/* <p>Giá</p>
                <NumberFormat
                onChange={this.handleChangeInput} ref="price" name="price" thousandSeparator={'.'} decimalSeparator={','} suffix={'đ'} /> */}
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
                <button>Đăng tin</button>
              </div>
            </div>
            </AvForm>
          </div>
        </div>
        );
    }
}
const mapStateToProps = (state) => ({
  dataImage:state.productsReducer.dataImageLocal,
  dataUser:state.userReducer
})
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserById: (getId) => {
      dispatch(fetchUserById(getId))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostNewRight)
