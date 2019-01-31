import React, { Component } from 'react'
import {tokenAuthorization} from "app/utils"
import ArrowBack from "@material-ui/icons/ArrowBack"
import createHistory from 'history/createBrowserHistory'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Select from 'react-select';
import { Button,Label,CustomInput,FormGroup } from 'reactstrap';
import axios from "axios";
import FileUploadProgress  from 'react-fileupload-progress';
const styles = {
  progressWrapper: {
    height: '10px',
    marginTop: '10px',
    width: '400px',
    float:'left',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
  },
  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#5cb85c',
    WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease'
  },
  cancelButton: {
    marginTop: '5px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  },

  bslabel: {
    display: 'inline-block',
    maxWidth: '100%',
    marginBottom: '5px',
    fontWeight: 700
  },

  bsHelp: {
    display: 'block',
    marginTop: '5px',
    marginBottom: '10px',
    color: '#737373'
  },

  bsButton: {
    padding: '1px 5px',
    fontSize: '12px',
    lineHeight: '1.5',
    borderRadius: '3px',
    color: '#fff',
    backgroundColor: '#337ab7',
    borderColor: '#2e6da4',
    display: 'inline-block',
    padding: '6px 12px',
    marginBottom: 0,
    fontWeight: 400,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    backgroundImage: 'none',
    border: '1px solid transparent'
  }
};
const header={
  headers:{
    'authorization':tokenAuthorization,
  }
}
// import "./style.css";
const optionsLevel = [
    { value: 1, label: 'Banner Chính' },
    { value: 2, label: 'Banner Trái' },
    { value: 3, label: 'Banner đối tác' },
    
  ];
export default class EditBanner extends Component {
    constructor(props) {
        super(props);
        this.state={
          levelSelected:{ value: 1, label: 'Banner Chính' },
          title:null,
          link:"#",
          image:null
        }
    }
    componentDidMount = () => {
      var self=this;
      axios.post("/banner/show",{id:self.props.match.params.id},header).then(res =>{
        self.setState({
          title:res.data.title,
          image:res.data.image,
          link:res.data.link,
          levelSelected:{value:parseInt(res.data.category_banner),label:self.handleLabel(res.data.category_banner)}
        
        })
      }
      ).catch(err => {
        alert("Hệ thống đang bị lỗi, vui lòng thử lại sau!");
      })
    
  }
    handleLabel(data){
      
        if(data == 1){
          return "Banner Chính"
         
        }else if(data == 2){
          return 'Banner Trái'
        }else{
          return 'Banner đối tác'
        }
    }
    handleChangeLevel = (levelSelected) => {
      this.setState({ levelSelected });
      // console.log(`Option selected:`, levelSelected);
    }
    formGetter(){
      return new FormData(document.getElementById('customForm'));
    }
    customFormRenderer(onSubmit){
      return (
        <form id='customForm' style={{marginBottom: '15px',marginTop:'15px'}}>
          <label style={styles.bslabel} htmlFor="exampleInputFile">Upload banner của bạn</label>
          <input style={{display: 'block'}} type="file" name='file' id="exampleInputFile" />
          <p style={styles.bsHelp}>Vui lòng upload file ở đây</p>
          <button type="button" style={styles.bsButton} onClick={onSubmit}>Tải ảnh lên</button>
        </form>
      );
    }
    customProgressRenderer(progress, hasError, cancelHandler) {
    
      if (hasError || progress > -1 ) {
        let barStyle = Object.assign({}, styles.progressBar);
        barStyle.width = progress + '%';
        let message = (<span>{barStyle.width}</span>);
        if (hasError) {
          barStyle.backgroundColor = '#d9534f';
          message = (<span style={{'color': '#a94442'}}>Tải lên ảnh thất bại ...</span>);
        }
        if (progress === 100){
          message = (<span style={{color:"green"}} >Bạn đã tải lên ảnh thành công</span>);
          setTimeout(()=>{
            this.setState({
              processDone:"out"
            });
          },1000)
        }
        if(!this.state.processDone){
          return (
            <div>
            <div style={styles.progressWrapper}>
              <div style={barStyle}></div>
            </div>
            <button style={styles.cancelButton} onClick={cancelHandler}>
              <span>&times;</span>
            </button>
            <div style={{'clear':'left'}}>
              {message}
            </div>
          </div>
        );
        }else{
          return null
        }
         
      } else {
        return;
      }
    }
    handleChange(e){
      var {name,value}=e.target;
      this.setState({
        [name]:value
      });
    }
    handleSubmit(e,err,value){
      var errArray=[];
      if(this.state.image===null){
        errArray.push("err");
        this.setState({
          errImage:"Bạn chưa tải lên ảnh nào!"
        })
      }
      if(errArray.length===0 && err.length === 0){
        var self=this;
        let info={
          id:this.props.match.params.id,
          image:this.state.image,
          link:this.state.link,
          title:this.state.title,
          category_banner:this.state.levelSelected.value
        }
        axios.post("/banner/update",info,header).then(res=>{
          if(res.data === "success"){
            self.props.history.goBack();
          }else{
            alert("Hệ thống đang bị lỗi, vui lòng thử lại sau");
          }
        })
      }
    }
  render() {
    const history = createHistory();
    const { selectedOption } = this.state;
    const style={
      iconBack:{fontSize:"40px",cursor:"pointer",marginBottom:"10px",color:"grey"},
    }
    return (
      <React.Fragment>
    <section className="content-header">
      <h1>
      Sửa banner của bạn
        {/* <small>Version 2.0</small> */}
      </h1>
     
    </section>
    <section className="content">
    <ArrowBack onClick={() => history.goBack()} style={style.iconBack} />
      <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Sửa banner của bạn</h3>
          </div>
          {/* /.box-header */}
          <div className="box-body">
          <AvForm onSubmit={this.handleSubmit.bind(this)} >
            <div className="row">
          <div className="col-md-12">
          <AvField name="title" value={this.state.title?this.state.title:null} defaultValue={this.state.title?this.state.title:null} onChange={this.handleChange.bind(this)} placeholder="Vui lòng nhập tên banner" label="Tên banner" type="text" validate={{
              required: {value: true, errorMessage: 'Tên banner không được để trống'},
              pattern: {value: '^[A-Za-zAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ ]+$', errorMessage: 'Tên banner bạn nhập không đúng'},
              maxLength: {value: 50, errorMessage: 'Tên banner phải chứa nhiều nhất 50 ký tự '}
            }} />
            <AvField onChange={this.handleChange.bind(this)} name="link" placeholder="Vui lòng nhập đường dẫn banner" label="Đường dẫn banner" value={this.state.link} defaultValue={this.state.link?this.state.link:null} type="text" validate={{
              required: {value: true, errorMessage: 'Đường dẫn không được để trống'},
            }} />
            <label>Thuộc kiểu banner</label>
            <Select
            placeholder="Chọn kiểu banner"
                       value={this.state.levelSelected}
                       onChange={this.handleChangeLevel}
                       options={optionsLevel}
                     />
                     <br />
            {!this.state.process?(<img src={`/images/upload/${this.state.image}`} height="80px" />):null}
            
             <FileUploadProgress key='ex2' url='/banner/uploadImage'
          onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
          onChange={(e) => console.log(e,"test")}
          onLoad={ async (e, request) => {
            let data =await JSON.parse(request.response)[0].fd;
            let cutStr=await data.slice(data.indexOf("/upload/")+8,data.length);
            await this.setState({
              image:cutStr,
              errImage:null,
              process:"done"
            });
          }}
          onError={ (e, request) => {console.log('error', e, request);}}
          onAbort={ (e, request) => {console.log('abort', e, request);}}
          formGetter={this.formGetter.bind(this)}
          formRenderer={this.customFormRenderer.bind(this)}
          progressRenderer={this.customProgressRenderer.bind(this)}
          />
          <div class="invalid-feedback">{this.state.errImage?this.state.errImage:null}</div>

          </div>
          </div>
          <Button style={{marginTop:"15px"}} color="warning"><b>Sửa banner</b></Button>
          </AvForm>
          </div>
          </div>
          </div>
          </div>
          </section>
      </React.Fragment>
    )
  }
}
