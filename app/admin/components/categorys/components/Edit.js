import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack"
import createHistory from 'history/createBrowserHistory'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import Select from 'react-select';
import axios from "axios";
import {tokenAuthorization} from "app/utils"
export const ButtonCreate = ({ btnCreate }) => {

  return (
    <React.Fragment>
      <Link to="/admin/categorys/create.html"><button type="button" className="btn btn-warning"><b>{btnCreate}</b></button></Link>
    </React.Fragment>
  );
}


class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: 0 },
      displayModal:'none'
    }
  }
  componentDidMount() {
    // console.log(this.props.match.params.id,"sa");
    var self = this;
    axios.post('/categoryapi/find', { sort: 'createdAt DESC' },{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then(function (res) {
      self.setState({
        dataCategory: res.data
      });

      // console.log(res.data);
    }).catch(function (err) {
      console.log(err);
    })
    axios.get(`/categoryapi/${this.props.match.params.id}`,{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then(function (res) {
      self.setState({
        name: res.data.name
      });
      self.handleDataChecked(res.data.parentId);
    }).catch(function (err) {
      console.log(err);
    })
  }
  handleDataChecked(data){
if(this.state.dataCategory && this.state.dataCategory.length >0){
  var dataFilterLabel = this.state.dataCategory.filter((item)=> item.id === parseInt(data));
  // console.log(dataFilterLabel[0].name);
this.setState({
  selectedOption: { value: parseInt(data), label:dataFilterLabel[0].name }
});
}

  }
  checkName() {
    if (this.state.name && this.state.name !== null) {
      return this.state.name
    } else {
      return null;
    }
  }

  handleData() {
    let { dataCategory } = this.state

    if ((dataCategory != null) && (dataCategory.length > 0)) {
      var arrayOption = [];
      dataCategory.map((item, index) => {
        var option = { value: item.id, label: item.name };
        arrayOption.push(option);
      })
      return arrayOption;
    } else {
      return null
    }
  }
  checkCategory() {
    if (this.handleData()) {
      return <Select
        placeholder="Chọn danh mục"
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={this.handleData()}
      />
    } else {
      return null
    }
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
  }
  handleChangeField = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });

  }
  handleSubmitEdit = (event, errors, values) => {
    var self = this;
    if (errors.length === 0) {
      axios.post('/categoryapi/update', { id: self.props.match.params.id, name: values.name, parentId: self.state.selectedOption.value },{
        headers: {
          'authorization':tokenAuthorization,
        }
      }).then(function (res) {
        if (res.data) {
          self.props.history.goBack();
        }
      }).catch(function (err) {
        console.log(err);
      })
    }
  }
  handleDestroy() {
this.setState({
  displayModal:"block"
});

  }
  render() {
    const history = createHistory();
    const { selectedOption } = this.state;
    const style = {
      iconBack: { fontSize: "40px", cursor: "pointer", marginBottom: "10px", color: "grey" }
    }
    return (
      <React.Fragment>
        <section className="content-header">
          <h1>
            Chỉnh sửa danh mục mới
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
                  <h3 className="box-title">Chỉnh sửa danh mục mới</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <AvForm onSubmit={this.handleSubmitEdit}>
                    <AvField onChange={(e) => this.handleChangeField(e)} name="name" value={this.checkName()} placeholder="Vui lòng nhập tên danh mục" label="Tên danh mục" type="text" validate={{
                      required: { value: true, errorMessage: 'Tên danh mục không được để trống' },
                      pattern: { value: '^[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ ]+$', errorMessage: 'Tên danh mục bạn nhập không đúng' },
                      maxLength: { value: 30, errorMessage: 'Tên danh mục phải chứa nhiều nhất 30 ký tự ' }
                    }} />
                    <label>Lựa chọn danh mục</label>
                    {this.checkCategory()}
                    <Button style={{ marginTop: "15px" }} color="warning"><b>Lưu danh mục</b></Button>
                    <Button onClick={() => this.handleDestroy()} style={{ marginTop: "15px", marginLeft: "20px" }} color="danger"><b>Xóa</b></Button>

                  </AvForm>
                </div>
                {/* /.box-body */}
              </div>
            </div>

          </div>
        </section>
        <div className="modal fade in" id="modal-default" style={{ display:this.state.displayModal, paddingRight: '15px' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title">Xác nhận</h4>
              </div>
              <div className="modal-body">
        <p>Bạn có chắc chắn muốn xóa không?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default pull-left" onClick={() => {
this.setState({
  displayModal:"none"
})
        }}>Close</button>
        <button type="button" onClick={
          () => {
            var self = this;
            axios.post('/categoryapi/destroy', { id: self.props.match.params.id },{
              headers: {
                'authorization':tokenAuthorization,
              }
            }).then(function (res) {
              self.props.history.goBack();
            }).catch((err) => {
              console.log(err);
            })
          }
        } className="btn btn-danger">Đồng ý</button>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default EditForm;
