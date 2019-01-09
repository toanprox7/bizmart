import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack"
import createHistory from 'history/createBrowserHistory'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import Select from 'react-select';
import axios from "axios";
import NumberFormat from 'react-number-format';
import {connect} from "react-redux";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DropzoneWithPreview from '../../../../components/postNew/DropzoneWithPreview';
const optionsLevel = [
  { value: 1, label: 'Cá nhân' },
  { value: 2, label: 'Doanh nghiệp' }
];

export const ButtonCreate=({btnCreate}) => {

    return (
      <React.Fragment>
<Link to="/admin/products/create.html"><button type="button" className="btn btn-warning"><b>{btnCreate}</b></button></Link>
      </React.Fragment>
    );
}


class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedOption: {value:0},
      levelSelected:{ value: 1, label: 'Cá nhân' },
      selectedUser:null,
      content:''
    }
  }
  componentDidMount() {
    var self=this;
    axios.post('/categoryapi/find',{sort:'createdAt DESC'}).then(function (res) {
        self.setState({
          dataCategory:res.data
        });
        // console.log(res.data);
    }).catch(function (err) {
    console.log(err);
    })

    axios.post('/usersapi/find',{sort:'createdAt DESC'}).then(function (res) {
      self.setState({
        dataUsers:res.data
      });
      // console.log(res.data);
  }).catch(function (err) {
  console.log(err);
  })
  }
  handleChangeLevel = (levelSelected) => {
    this.setState({ levelSelected });
    console.log(`Option selected:`, levelSelected);
  }
  handleData(){
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
  handleDataUser(){
    let {dataUsers} = this.state

    if((dataUsers != null) &&(dataUsers.length > 0)){
      var arrayOption=[];
      dataUsers.map((item,index) => {
                var option = { value:item.id, label: `${item.username}-${item.id}` };
                arrayOption.push(option);
          })
          return arrayOption;
    }else{
      return null
    }
  }

  checkCategory(){
    if(this.handleData()){
      return <Select
      placeholder="Chọn danh mục"
                       value={this.state.category}
                       onChange={this.handleChange}
                       options={this.handleData()}
                     />
    }else{
      return null
    }
  }
  handleChangeUser(selectedUser){
// this.setState({ selectedUser });
console.log(selectedUser,"user");
this.setState({
  selectedUser
});
  }
  checkUsers(){
    if(this.handleDataUser()){
      return <Select
      placeholder="Chọn user"

                       onChange={(e) => this.handleChangeUser(e)}
                       options={this.handleDataUser()}
                     />
    }else{
      return null
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
  }
  handleChangeField=(e) =>{
    let {name,value} = e.target;
this.setState({
  [name]:value
});

  }
  handleSubmitCreate=(event, errors, values)=>{
    var arrayErr=[];
if(this.state.selectedUser == null){
  arrayErr.push("err");
  this.setState({
    errUser:"Vui lòng lựa chọn người đăng"
  });
}
if(this.state.selectedOption.value === 0){
  arrayErr.push("err");
// console.log("err");
  this.setState({
    errListCategory:"Vui lòng lựa chọn danh mục"
  });
}
if(this.refs.price.state.numAsString ==0){
  arrayErr.push("err");
  this.setState({
    errPrice:"Giá sản phẩm không được để trống"
  });
  }
  let dataImageUpload=this.props.dataImage;
  if(dataImageUpload.length == 0){
    arrayErr.push("err");
    this.setState({
      errImg:"Images không được để trống"
    });
  }
  // console.log(this.state.content.length,"array err");
var self=this;
if(errors.length === 0 && arrayErr.length === 0){
  let {title,price,content} =this.state;
let usersId=this.state.selectedUser.value;
let categoryId=this.state.selectedOption.value;
let level=this.state.levelSelected.value;
let image=dataImageUpload;
let status="active";
let total_star= 0;
  let info={
    title,price,usersId,categoryId,level,content,image,status,total_star

  }

  console.log(image,"info");
  axios.get("/files/resizeImg").then(function (res) {
    console.log(res);
   }).catch(function (err) {
    console.log(err);
   })
axios.post('/productsapi/create',info).then(function (res) {
if(res.data){
self.props.history.goBack();
}
}).catch(function (err) {
console.log(err);
})
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
}else{
  this.setState({
    price
    });
}
  }
  render() {
    const history = createHistory();
    const { selectedOption } = this.state;
    const style={
      iconBack:{fontSize:"40px",cursor:"pointer",marginBottom:"10px",color:"grey"},
      numberForm:{
        display:"block",
        width: "100%",
        height: "35px",
        border: "1px solid #cccccc",
        borderRadius: "4px",
        paddingLeft:"12px",
        marginBottom:"15px"
      }
    }
    return (
      <React.Fragment>
      <section className="content-header">
      <h1>
      Tạo sản phẩm mới
        {/* <small>Version 2.0</small> */}
      </h1>
      <ol className="breadcrumb">
        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
        <li className="active">products</li>

      </ol>
    </section>
    {/* Main content */}

    <section className="content">
    <ArrowBack onClick={() => history.goBack()} style={style.iconBack} />
      <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Tạo sản phẩm mới</h3>
          </div>
          {/* /.box-header */}
          <div className="box-body">
          <AvForm onSubmit={this.handleSubmitCreate}>
            <div className="row">
          <div className="col-md-6">
          <AvField onChange={(e) => this.handleChangeField(e)} name="title" placeholder="Vui lòng nhập tên sản phẩm" label="Tên sản phẩm" type="text" validate={{
              required: {value: true, errorMessage: 'tên sản phẩm không được để trống'},
              pattern: {value: '^[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ ]+$', errorMessage: 'tên sản phẩm bạn nhập không đúng'},
              maxLength: {value: 50, errorMessage: 'tên sản phẩm phải chứa nhiều nhất 50 ký tự '}
            }} />
            <label>Giá sản phẩm</label>
           <NumberFormat maxLength="20" minLength="5" ref="price" onBlur={(e) => this.handleBlurPrice(e)} placeholder="Nhập giá sản phẩm" style={style.numberForm} thousandSeparator={true} suffix={'đ'} />
           <div class="invalid-feedback">{this.state.errPrice?this.state.errPrice:null}</div>
            <label>Lựa chọn danh mục</label>
            {this.checkCategory()}
            <div class="invalid-feedback">{this.state.errListCategory?this.state.errListCategory:null}</div>
            <label>Lựa chọn cấp độ</label>
            <Select
            placeholder="Chọn cấp độ"
                       value={this.state.levelSelected}
                       onChange={this.handleChangeLevel}
                       options={optionsLevel}
                     />
            <label>Lựa chọn người đăng</label>
{this.checkUsers()}
<div class="invalid-feedback">{this.state.errUser?this.state.errUser:null}</div>
            {/* <Select
              placeholder="Chọn người đăng"
                       value={this.state.levelSelected}
                       onChange={this.handleChangeLevel}
                       options={optionsLevel}
                     /> */}
          </div>
          <div className="col-md-6">
            <label>Nội dung sản phẩm</label>
            <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.content}
                    onChange={ ( event, editor ) => {
                        const content = editor.getData();
                        // console.log(data);
                        // if(data)
                        this.setState({content});
                    } }

                />
                <div class="invalid-feedback">{this.state.errContent?this.state.errContent:null}</div>
                <label>Tải lên hình ảnh</label>
<DropzoneWithPreview/>
<div class="invalid-feedback">{this.state.errImg?this.state.errImg:null}</div>
          </div>

            </div>
          <Button style={{marginTop:"15px"}} color="warning"><b>Tạo sản phẩm</b></Button>
          </AvForm>
          </div>
          {/* /.box-body */}
        </div>
      </div>

    </div>
    </section>
    </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  dataImage:state.productsReducer.dataImageLocal
})
export default connect(mapStateToProps)(CreateProduct)
