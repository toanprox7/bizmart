import React, { Component } from 'react';
import axios from 'axios';
import { ButtonCreate } from './components/Create';
import {Link} from "react-router-dom"
import Pagination from "react-js-pagination";
import createHistory from 'history/createBrowserHistory'
import NumberFormat from 'react-number-format';
import ReactLoading from 'react-loading';

const Loading = () => (
    <ReactLoading type="bars" color="blue" style={{margin:"auto",width:"50px"}} />
);
class Products extends Component {
  constructor(props) {
    super(props);
    this.state={
      activePage: 1,
      displayModal:"none",
      isLoading:false,
      data:null
    }
  }


componentDidMount() {
  this.setState({
activePage:parseInt(this.props.match.params.idPage),
isLoading:true
  });
var self=this;
if(this.props.match.params.textSearch == " "){
  let skipStart = (parseInt(this.props.match.params.idPage) - 1) * 10;
  axios.post('/productsapi/find',{skip:skipStart,sort:'createdAt DESC',limit:10}).then(function (res) {
    if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      });
    }else{
      self.setState({
        data:"Không tìm thấy sản phẩm nào",
        totalPageRecord:0,
        isLoading:false
      });
    }
    // console.log(res.data,"res");
}).catch(function (err) {
console.log(err);
})
this.handleRequestSearch();
}else{
  let skipStart = (parseInt(this.props.match.params.idPage) - 1) * 10;
  var infoSearch={
    where:{
      or:[{
        content:{contains:this.props.match.params.textSearch}
      },{
        title:{contains:this.props.match.params.textSearch},
      },{
        price:{contains:this.props.match.params.textSearch},
      }]
          },
    skip:skipStart,
    limit:10,
    sort:'createdAt DESC'
  }
  axios.post("/productsapi/search",infoSearch).then(function (res) {
    if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      });
    }else{
      self.setState({
        data:"Không tìm thấy sản phẩm nào",
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
handleDisplayModal(modal){
  // console.log(modal,"modal");
  this.setState({
    displayModal:"block",
    idRating:modal
  });
}
handleMapData(){
  if(this.state.data && this.state.data !== "Không tìm thấy sản phẩm nào"){
return   this.state.data.map((item,index) => {
  return <ItemRow modalDisplay={(modal) => this.handleDisplayModal(modal) } data={item} key={index} stt={index} />
})
  }else{
    return "Không tìm thấy sản phẩm nào";
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
  if(this.props.match.params.textSearch != " "){
    var infoSearch={
      where:{
        or:[{
          content:{contains:this.props.match.params.textSearch}
        },{
          title:{contains:this.props.match.params.textSearch},
        },{
          price:{contains:this.props.match.params.textSearch},
        }]},

      skip:skipStart,
      limit:10,
      sort:'createdAt DESC'
    }
    axios.post("/productsapi/search",infoSearch).then(function (res) {
     if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      });
     }else{
        self.setState({
          data:"Không tìm thấy sản phẩm nào",
          totalPageRecord:0,
          isLoading:false
        });
      }
    }).catch(function (err) {
      console.log(err);
    })
    this.handleRequestSearch();
  }else if(this.props.match.params.textSearch == " "){
    axios.post('/productsapi/find',{skip:skipStart,sort:'createdAt DESC',limit:10}).then(function (res) {
      if(res.data.length > 0){
        self.setState({
          data:res.data,
          totalPageRecord:res.data.length,
          isLoading:false
        });
      }else{
        self.setState({
          data:"Không tìm thấy sản phẩm nào",
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
  if(this.props.match.params.textSearch == " "){
    axios.post('/productsapi/find',{sort:'createdAt DESC'}).then(function (res) {
      if(res.data.length > 0){
        self.setState({
          totalRecord:res.data.length,
          isLoading:false
          // totalRecord:res.data.length
        });
      }else{
        self.setState({
          totalRecord:0,
          isLoading:false
          // totalRecord:res.data.length
        });
      }

      // console.log(res.data);
  }).catch(function (err) {
  console.log(err);
  })
  }else if(this.props.match.params.textSearch != " "){
    var infoSearch={
      where:{
        or:[{
          content:{contains:this.props.match.params.textSearch}
        },{
          title:{contains:this.props.match.params.textSearch},
        },{
          price:{contains:this.props.match.params.textSearch},
        }]},
      sort:'createdAt DESC'
    }
    axios.post("/productsapi/search",infoSearch).then(function (res) {
self.setState({
totalRecord:res.data.length,
isLoading:false
})
    }).catch(function (err) {
      console.log(err)
    })
  }

}
changeRoute(textSearch){
  if(!textSearch){
    this.props.history.push(`/admin/products/ /page-1.html`)
  }else{
    this.props.history.push(`/admin/products/${textSearch}/page-1.html`)
  }

}
handleValue(){
if(this.props.match.params.textSearch != " "){
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
if(this.props.match.params.textSearch == " "){
  axios.post(`/productsapi/find`,{sort:'createdAt DESC',limit:limit,skip:skipStart}).then(function (res) {
    if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      })
    }else{
      this.setState({
        data:"Không tìm thấy sản phẩm nào",
        totalPageRecord:0,
        isLoading:false
      });
    }

  }).catch(function (err) {
    console.log(err);
  })
}else if(this.props.match.params.textSearch != " "){
  var infoSearch={
    where:{
      or:[{
        content:{contains:this.props.match.params.textSearch}
      },{
        title:{contains:this.props.match.params.textSearch},
      },{
        price:{contains:this.props.match.params.textSearch},
      }]},
    skip:skipStart,
    limit:10,
    sort:'createdAt DESC'
  }
  axios.post("/productsapi/search",infoSearch).then(function (res) {
    if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      });
    }else{
      self.setState({
        data:"Không tìm thấy sản phẩm nào",
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
if(this.props.match.params.textSearch == " "){
  this.props.history.push(`/admin/products/ /page-${numberPage}.html`);
}else if(this.props.match.params.textSearch != " "){
  this.props.history.push(`/admin/products/${this.props.match.params.textSearch}/page-${numberPage}.html`);
}

}

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
      Quản lý sản phẩm
        {/* <small>Version 2.0</small> */}
      </h1>
      <ol className="breadcrumb">
        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
        <li className="active">products</li>
      </ol>
    </section>
    {/* Main content */}
    <section className="content">
      <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
            <h3 style={style.boxTitle} className="box-title">Tất cả sản phẩm</h3>
            <ButtonCreate btnCreate="Tạo sản phẩm" />
            <div className="input-Search pull-right" >

            <input value={this.handleValue()} onChange={e => this.handleSearch(e.target.value)} style={{height:"35px",paddingLeft:"10px",width:"360px"}} type="text" placeholder="Tìm kiếm" />
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">

{this.state.isLoading === true?<Loading />:null}
{this.state.data && this.state.data !== "Không tìm thấy sản phẩm nào"?(
<table className="table table-bordered table-striped">
<thead>
  <tr>
    <th>ID</th>
    <th>Tên sản phẩm</th>
    <th>Giá sản phẩm</th>

    <th>Tên danh mục</th>
    <th>Người đăng</th>
    <th>Cấp bậc</th>
    <th>Trạng thái</th>
    <th>Hành động</th>
  </tr>
</thead>
<tbody>

{this.handleMapData()}

</tbody>
<tfoot>
  <tr>
    <th>ID</th>
    <th>Tên sản phẩm</th>
    <th>Giá sản phẩm</th>

    <th>Tên danh mục</th>
    <th>Người đăng</th>
    <th>Cấp bậc</th>
    <th>Trạng thái</th>
    <th>Hành động</th>
  </tr>
</tfoot>
</table>
):this.state.data}


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
            axios.post('/productsapi/destroy', { id: self.state.idRating }).then(function (res) {
              // self.props.history.push("/admin/ratings/ /page-1.html");
self.setState({
displayModal:"none"
})
// console.log(res.data[0].id,"res");
return res.data[0].id;
            }).then(dataId => {
// console.log(data);
let dataFull = self.state.data;
if(dataFull){
// console.log();
self.setState({
  data:dataFull.filter(item => {
    return item.id != dataId
    })
})
// console.log(dataFull,"datafull");
}
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

export default Products;


const ItemRow=({data,stt,history,modalDisplay,...props})=>{
  const style={
    info:{
      background: "rgba(245, 222, 179, 0.38)",
      width: "90%",
      borderRadius: "40px",
      fontWeight: 600,
      fontSize: "15px",
    },
    active:{
      background: "#07c5074d",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "13px",
      fontWeight: 700,
      color: "green",
    },
    block:{
      background: "#f9929299",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "13px",
      fontWeight: 700,
      color: "#dd4b39",
    }
  }
return (
  <React.Fragment>
    <tr>
  <td><Link to={`/admin/products/${data.id}/show.html`}>{data.id}</Link></td>
  <td>{data.title}</td>
  <td><NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></td>
  <td>{data.categoryId.name}</td>
  <td>{data.usersId.username}</td>
  <td>{data.level == 1?"Cá nhân":"Doanh nghiệp"}</td>
  <td>{data.status == 'active'?<span style={style.active}>Hoạt động</span>:<span style={style.block}>Đã bị chặn</span>}</td>
  <td>
    <Link to={`/admin/products/${data.id}/edit.html`}>
    <button type="button" className="btn btn-info"><i style={{fontSize:"15px"}} className="fa fa-pencil-square-o" /></button>
    </Link>
    <button type="button" className="btn btn-danger" onClick={(modal) => modalDisplay(data.id)}><i style={{fontSize:"15px"}} className="fa fa-trash-o" /></button>
  </td>
</tr>
  </React.Fragment>
);
}

