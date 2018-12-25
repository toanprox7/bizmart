import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack"
import createHistory from 'history/createBrowserHistory'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import Select from 'react-select';
import axios from "axios";

export const ButtonCreate=({btnCreate}) => {

    return (
      <React.Fragment>
<Link to="/admin/users/create.html"><button type="button" className="btn btn-warning"><b>{btnCreate}</b></button></Link>
      </React.Fragment>
    );
}


class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedOption: {value:0},
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
var self=this;
if(errors.length === 0){
axios.post('/categoryapi/create',{name:values.name,parentId:self.state.selectedOption.value}).then(function (res) {
if(res.data){
self.props.history.goBack();
}
}).catch(function (err) {
console.log(err);
})
}
  }
  render() {
    const history = createHistory();
    const { selectedOption } = this.state;
    const style={
      iconBack:{fontSize:"40px",cursor:"pointer",marginBottom:"10px",color:"grey"}
    }
    return (
      <React.Fragment>
      <section className="content-header">
      <h1>
      Tạo danh mục mới
        {/* <small>Version 2.0</small> */}
      </h1>
      <ol className="breadcrumb">
        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
        <li className="active">categorys</li>

      </ol>
    </section>
    {/* Main content */}

    <section className="content">
    <ArrowBack onClick={() => history.goBack()} style={style.iconBack} />
      <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Tạo danh mục mới</h3>
          </div>
          {/* /.box-header */}
          <div className="box-body">
          <AvForm onSubmit={this.handleSubmitCreate}>
            <AvField onChange={(e) => this.handleChangeField(e)} name="name" placeholder="Vui lòng nhập tên danh mục" label="Tên danh mục" type="text" validate={{
              required: {value: true, errorMessage: 'Tên danh mục không được để trống'},
              pattern: {value: '^[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ ]+$', errorMessage: 'Tên danh mục bạn nhập không đúng'},
              maxLength: {value: 30, errorMessage: 'Tên danh mục phải chứa nhiều nhất 30 ký tự '}
            }} />
             <label>Lựa chọn danh mục</label>
            {this.checkCategory()}
          <Button style={{marginTop:"15px"}} color="warning"><b>Tạo danh mục</b></Button>
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

export default CreateForm;
