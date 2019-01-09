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




class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedOption: {value:0},
      levelSelected:{ value: 1, label: 'Cá nhân' },
      selectedUser:null,
      content:''
    }
  }

  componentWillMount() {
    var self=this;
    axios.post('/productsapi/find',{id:self.props.match.params.id}).then(function (res) {
      // console.log(res.data,"data");

      self.setState({
        DataProductsCurrent:res.data,
        levelSelected:{value:res.data.level,label:res.data.level==1?'Cá nhân':'Doanh nghiệp'},
        selectedUser:{value:res.data.usersId.id,label: `${res.data.usersId.username}-${res.data.usersId.id}`},
        selectedOption:{value:res.data.categoryId.id,label:res.data.categoryId.name},
image:res.data.image.split(","),
checkImg:res.data.image.split(",")[0],
price:res.data.price,
content:res.data.content
      });
      // console.log(res.data);
  }).catch(function (err) {
  console.log(err);
  })
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
                       value={this.state.selectedOption}
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
      value={this.state.selectedUser}
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
  handleSubmitEdit=(event, errors, values)=>{
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
  if(this.state.image.length == 0){
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
let image=this.state.image;
let status=this.state.DataProductsCurrent.status;
let total_star= this.state.DataProductsCurrent.total_star;
let id=this.props.match.params.id;
  let info={id,
    title,price,usersId,categoryId,level,content,image,status,total_star

  }

  console.log(image,"info");
  axios.get("/files/resizeImg").then(function (res) {
    console.log(res);
   }).catch(function (err) {
    console.log(err);
   })
axios.post('/productsapi/updateData',info).then(function (res) {
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
componentWillReceiveProps(nextProps) {
  // console.log(nextProps,"next prop");
this.setState({
  image:nextProps.dataImage
});
}

  render() {
    // console.log(this.props.dataImage,"dataimg");

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
      Sửa sản phẩm mới
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
            <h3 className="box-title">Sửa sản phẩm mới</h3>
          </div>
          {/* /.box-header */}
          <div className="box-body">
          <AvForm onSubmit={this.handleSubmitEdit}>
            <div className="row">
          <div className="col-md-6">
          <AvField value={this.state.DataProductsCurrent?this.state.DataProductsCurrent.title:null} onChange={(e) => this.handleChangeField(e)} name="title" placeholder="Vui lòng nhập tên sản phẩm" label="Tên sản phẩm" type="text" validate={{
              required: {value: true, errorMessage: 'tên sản phẩm không được để trống'},
              pattern: {value: '^[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ ]+$', errorMessage: 'tên sản phẩm bạn nhập không đúng'},
              maxLength: {value: 50, errorMessage: 'tên sản phẩm chứa nhiều nhất 50 ký tự '}
            }} />
            <label>Giá sản phẩm</label>
           <NumberFormat value={this.state.price?this.state.price:null} maxLength="20" minLength="5" ref="price" onBlur={(e) => this.handleBlurPrice(e)} placeholder="Nhập giá sản phẩm" style={style.numberForm} thousandSeparator={true} suffix={'đ'} />
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
                    data={this.state.content?this.state.content:''}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
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
{this.state.image && this.state.image[0] ==this.state.checkImg?<aside style={{display: 'flex', flexFlow: 'row wrap', marginTop: '16px'}}>

{this.state.image?this.state.image.map(item => {
return (
  <div style={{display: 'inline-flex', borderRadius: '2px', border: '1px solid rgb(234, 234, 234)', marginBottom: '8px', marginRight: '8px', width: '100px', height: '100px', padding: '4px', boxSizing: 'border-box'}}>

  <div style={{display: 'flex', minWidth: '0px', overflow: 'hidden'}}><img src={`/images/upload/small/${item}`} style={{display: 'block', width: 'auto', height: '100%'}} />
  </div>

  </div>
)

}):null}


</aside>:null }


<div class="invalid-feedback">{this.state.errImg?this.state.errImg:null}</div>
          </div>

            </div>
          <Button style={{marginTop:"15px"}} color="warning"><b>Sửa sản phẩm</b></Button>
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
export default connect(mapStateToProps)(EditProduct)
