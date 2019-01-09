import React, { Component } from 'react';
import axios from 'axios';
import { ButtonCreate } from './components/Create';
import {Link} from "react-router-dom"
import Pagination from "react-js-pagination";
import ReactLoading from 'react-loading';

const Loading = () => (
    <ReactLoading type="bars" color="blue" style={{margin:"auto",width:"50px"}} />
);
class Category extends Component {
  constructor(props) {
    super(props);
    this.state={
      activePage: 1,
      data:null
    }
  }


componentDidMount() {
  this.setState({
activePage:parseInt(this.props.match.params.idPage),
isLoading:true
  });
var self=this;
if(this.props.match.params.textSearch == 0){
  let skipStart = (parseInt(this.props.match.params.idPage) - 1) * 10;
  axios.post('/categoryapi/find',{skip:skipStart,sort:'createdAt DESC',limit:10}).then(function (res) {
    if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      });
    }else{
      self.setState({
        data:"Không tìm thấy danh mục nào",
        totalPageRecord:0,
        isLoading:false
      });
    }
    // console.log(res.data);
}).catch(function (err) {
console.log(err);
})
this.handleRequestSearch();
}else{
  let skipStart = (parseInt(this.props.match.params.idPage) - 1) * 10;
  var infoSearch={
    name:{contains:this.props.match.params.textSearch},
    skip:skipStart,
    limit:10,
    sort:'createdAt DESC'
  }
  axios.post("/categoryapi/search",infoSearch).then(function (res) {
    if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      });
    }else{
      self.setState({
        data:"Không tìm thấy danh mục nào",
        totalPageRecord:0,
        isLoading:false
      });
    }
  }).catch(function (err) {
    console.log(err);
  })
  this.handleRequestSearch()
}
// this.getFullRecord();
}
handleMapData(){
  if(this.state.data){
return   this.state.data.map((item,index) => {
  return <ItemRow data={item} key={index} stt={index} />
})
  }else{
    return null;
  }
}
handleSearch=_.debounce((text) => {
  this.setState({
    textSearch:text,
    activePage:1,
    isLoading:true,
    data:null
  });
  this.changeRoute(this.state.textSearch);
  var self=this;
  let skipStart = (this.props.match.params.idPage - 1) * 10;
  if(this.props.match.params.textSearch != 0){
    var infoSearch={
      name:{contains:this.props.match.params.textSearch},
      skip:skipStart,
      limit:10,
      sort:'createdAt DESC'
    }
    axios.post("/categoryapi/search",infoSearch).then(function (res) {
      if(res.data.length > 0){
        self.setState({
          data:res.data,
          totalPageRecord:res.data.length,
          isLoading:false
        });
      }else{
        self.setState({
          data:"Không tìm thấy danh mục nào",
          totalPageRecord:0,
          isLoading:false
        });
      }
    }).catch(function (err) {
      console.log(err);
    })
    this.handleRequestSearch();
  }else if(this.props.match.params.textSearch == 0){
    axios.post('/categoryapi/find',{skip:skipStart,sort:'createdAt DESC',limit:10}).then(function (res) {
      if(res.data.length > 0){
        self.setState({
          data:res.data,
          totalPageRecord:res.data.length,
          isLoading:false
        });
      }else{
        self.setState({
          data:"Không tìm thấy danh mục nào",
          totalPageRecord:0,
          isLoading:false
        });
      }
      // console.log(res.data);
  }).catch(function (err) {
  console.log(err);
  })
  this.handleRequestSearch();
  }

},1)
handleRequestSearch(){
  var self=this;
  if(this.props.match.params.textSearch == 0){
    axios.post('/categoryapi/find',{sort:'createdAt DESC'}).then(function (res) {
      if(res.data.length > 0){
        self.setState({
          totalRecord:res.data.length,
          isLoading:false
        });
      }else{
        self.setState({
          totalRecord:0,
          isLoading:false
        });
      }

      // console.log(res.data);
  }).catch(function (err) {
  console.log(err);
  })
  }else if(this.props.match.params.textSearch != 0){
    axios.post("/categoryapi/search",{ name:{contains:this.props.match.params.textSearch},
    sort:'createdAt DESC'}).then(function (res) {
self.setState({
totalRecord:res.data.length
})
    }).catch(function (err) {
      console.log(err)
    })
  }

}
changeRoute(textSearch){
  if(!textSearch){
    this.props.history.push(`/admin/categorys/0/page-1.html`)
  }else{
    this.props.history.push(`/admin/categorys/${textSearch}/page-1.html`)
  }

}
handleValue(){
if(this.props.match.params.textSearch != 0){
return this.props.match.params.textSearch
}else{
  return ""
}
}
handlePageChange(pageNumber) {
  this.setState({
activePage:pageNumber,
isLoading:true,
data:null
  });
  this.changeRoutePage(pageNumber);
this.handleRequest(pageNumber)
}
handleRequest(pageNumber){
  var self=this;
  let skipStart = (pageNumber - 1) * 10;
  let limit = 10
if(this.props.match.params.textSearch == 0){
  axios.post(`/categoryapi/find`,{sort:'createdAt DESC',limit:limit,skip:skipStart}).then(function (res) {
    if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      });
    }else{
      self.setState({
        data:"Không tìm thấy danh mục nào",
        totalPageRecord:0,
        isLoading:false
      });
    }
  }).catch(function (err) {
    console.log(err);
  })
}else if(this.props.match.params.textSearch != 0){
  var infoSearch={
    name:{contains:this.props.match.params.textSearch},
    skip:skipStart,
    limit:10,
    sort:'createdAt DESC'
  }
  axios.post("/categoryapi/search",infoSearch).then(function (res) {
    if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      });
    }else{
      self.setState({
        data:"Không tìm thấy danh mục nào",
        totalPageRecord:0,
        isLoading:false
      });
    }
  }).catch(function (err) {
    console.log(err);
  })
}

}
changeRoutePage(numberPage){
if(this.props.match.params.textSearch == 0){
  this.props.history.push(`/admin/categorys/0/page-${numberPage}.html`);
}else if(this.props.match.params.textSearch != 0){
  this.props.history.push(`/admin/categorys/${this.props.match.params.textSearch}/page-${numberPage}.html`);
}

}
// getFullRecord(){
//   var self=this;
// axios.get('/categoryapi').then(function (res) {
//     self.setState({
// totalRecord:res.data.length
//     });
//   }).catch(function (err) {
// console.log(err);
//   })
// }
checkTotalRecord(){
if(this.state.totalRecord){
  return this.state.totalRecord
}else{
  return null
}
}
totalPageCurrent(){
  if(this.state.totalPageRecord){
    return this.state.totalPageRecord
  }else{
    return null
  }
}
  render() {
const style={
boxTitle:{
  display:"block",
  marginBottom:"10px"}
}

    return (
      <React.Fragment>
      <section className="content-header">
      <h1>
      Quản lý danh mục
        {/* <small>Version 2.0</small> */}
      </h1>
      <ol className="breadcrumb">
        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
        <li className="active">categorys</li>
      </ol>
    </section>
    {/* Main content */}
    <section className="content">
      <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
            <h3 style={style.boxTitle} className="box-title">Tất cả danh mục</h3>
            <ButtonCreate btnCreate="Tạo danh mục" />
            <div className="input-Search pull-right" >

            <input value={this.handleValue()} onChange={e => this.handleSearch(e.target.value)} style={{height:"35px",paddingLeft:"10px",width:"360px"}} type="text" placeholder="Tìm kiếm" />
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
          {this.state.isLoading === true?<Loading />:null}
           {this.state.data && this.state.data !== "Không tìm thấy danh mục nào"?( <table className="table table-bordered table-striped">
              <thead>
                <tr>
                   <th>STT</th>
                  <th>Tên danh mục</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>

              {this.handleMapData()}

              </tbody>
              <tfoot>
                <tr>
                  <th>STT</th>
                  <th>Tên danh mục</th>
                  <th>Hành động</th>
                </tr>
              </tfoot>
            </table>):this.state.data}
            <div style={{marginTop:"30px"}} className="pull-left">
<span><b>Hiển thị <span style={{color:"grey"}}>{this.totalPageCurrent()}/{this.checkTotalRecord()}</span></b></span>
            </div>
            <div className="pull-right">
          <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.checkTotalRecord()}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => this.handlePageChange(pageNumber)}
        />
          </div>
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

export default Category;

const ItemRow=({data,stt,history})=>{
return (
  <React.Fragment>
    <tr>
  <td>{stt}</td>
  <td>{data.name}
  </td>
  <td><Link to={`/admin/categorys/${data.id}/edit.html`}><button type="button" className="btn btn-info"><i style={{fontSize:"15px"}} className="fa fa-pencil-square-o" /></button></Link></td>
</tr>
  </React.Fragment>
);
}

