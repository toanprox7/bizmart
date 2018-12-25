
import React, { Component } from 'react';
import axios from 'axios';
import { ButtonCreate } from './components/Create';
import {Link} from "react-router-dom"
import Pagination from "react-js-pagination";
import './users.css'
class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      activePage: 1,
      checkedSwitch:"checked"
    }
  }


componentDidMount() {
  this.setState({
activePage:parseInt(this.props.match.params.idPage)
  });
var self=this;
if(this.props.match.params.textSearch == " "){
  let skipStart = (parseInt(this.props.match.params.idPage) - 1) * 10;
  axios.post('/usersapi/find',{skip:skipStart,sort:'createdAt DESC',limit:10}).then(function (res) {
    self.setState({
      data:res.data,
      totalPageRecord:res.data.length
    });
    // console.log(res.data);
}).catch(function (err) {
console.log(err);
})
this.handleRequestSearch();
}else{
  let skipStart = (parseInt(this.props.match.params.idPage) - 1) * 10;
  var infoSearch={
    where:{
or:[{
  username:{contains:this.props.match.params.textSearch}
},{
  phone_number:{contains:this.props.match.params.textSearch},
},{
  email:{
    contains:this.props.match.params.textSearch
  }
}]
    },
    skip:skipStart,
    limit:10,
    sort:'createdAt DESC'
  }
  axios.post("/usersapi/search",infoSearch).then(function (res) {
    self.setState({
      data:res.data,
      totalPageRecord:res.data.length
    });
  }).catch(function (err) {
    console.log(err);
  })
  this.handleRequestSearch()
}
// this.getFullRecord();
}
handleDataStatus(user){
  let self=this;
  // console.log(user);
  if(this.state.data){
this.state.data.map(item => {
if(item.id == user.id){
item.status=user.status;
return self.setState({
data:this.state.data
})
}
})
  }
}
handleMapData(){
  if(this.state.data){
return   this.state.data.map((item,index) => {
  return <ItemRow dataStatus={(dataStatus) => this.handleDataStatus(dataStatus)} data={item} key={index} stt={index} />
})
  }else{
    return null;
  }
}
handleSearch=_.debounce((text) => {
  this.setState({
    textSearch:text,
    activePage:1,
  });
  this.changeRoute(this.state.textSearch);
  var self=this;
  let skipStart = (this.props.match.params.idPage - 1) * 10;
  if(this.props.match.params.textSearch != " "){
    var infoSearch={
      where:{
        or:[{
          username:{contains:this.props.match.params.textSearch}
        },{
          phone_number:{contains:this.props.match.params.textSearch},
        },{
          email:{
            contains:this.props.match.params.textSearch
          }
        }]
            },
            skip:skipStart,
            limit:10,
            sort:'createdAt DESC'
    }
    axios.post("/usersapi/search",infoSearch).then(function (res) {
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length
      });
    }).catch(function (err) {
      console.log(err);
    })
    this.handleRequestSearch();
  }else if(this.props.match.params.textSearch == " "){
    axios.post('/usersapi/find',{skip:skipStart,sort:'createdAt DESC',limit:10}).then(function (res) {
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length
      });
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
    axios.post('/usersapi/find',{sort:'createdAt DESC'}).then(function (res) {
      self.setState({
        totalRecord:res.data.length
        // totalRecord:res.data.length
      });
      // console.log(res.data);
  }).catch(function (err) {
  console.log(err);
  })
  }else if(this.props.match.params.textSearch != " "){
    axios.post("/usersapi/search",{
      username:{contains:this.props.match.params.textSearch},
      phone_number:{contains:this.props.match.params.textSearch},
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
    this.props.history.push(`/admin/users/ /page-1.html`)
  }else{
    this.props.history.push(`/admin/users/${textSearch}/page-1.html`)
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
activePage:pageNumber
  });
  this.changeRoutePage(pageNumber);
this.handleRequest(pageNumber)
}
handleRequest(pageNumber){
  var self=this;
  let skipStart = (pageNumber - 1) * 10;
  let limit = 10
if(this.props.match.params.textSearch == " "){
  axios.post(`/usersapi/find`,{sort:'createdAt DESC',limit:limit,skip:skipStart}).then(function (res) {
    self.setState({
      data:res.data,
      totalPageRecord:res.data.length
    })
  }).catch(function (err) {
    console.log(err);
  })
}else if(this.props.match.params.textSearch != " "){
  var infoSearch={
    where:{
      or:[{
        username:{contains:this.props.match.params.textSearch}
      },{
        phone_number:{contains:this.props.match.params.textSearch},
      },{
        email:{
          contains:this.props.match.params.textSearch
        }
      }]
          },
          skip:skipStart,
          limit:10,
          sort:'createdAt DESC'
  }
  axios.post("/usersapi/search",infoSearch).then(function (res) {
    self.setState({
      data:res.data,
      totalPageRecord:res.data.length
    });
  }).catch(function (err) {
    console.log(err);
  })
}

}
changeRoutePage(numberPage){
if(this.props.match.params.textSearch == " "){
  this.props.history.push(`/admin/users/ /page-${numberPage}.html`);
}else if(this.props.match.params.textSearch != " "){
  this.props.history.push(`/admin/users/${this.props.match.params.textSearch}/page-${numberPage}.html`);
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
      Quản lý thành viên
        {/* <small>Version 2.0</small> */}
      </h1>
      <ol className="breadcrumb">
        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
        <li className="active">users</li>
      </ol>
    </section>
    {/* Main content */}
    <section className="content">
      <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
            <h3 style={style.boxTitle} className="box-title">Tất cả thành viên</h3>
            <ButtonCreate btnCreate="Tạo danh mục" />
            <div className="input-Search pull-right" >

            <input value={this.handleValue()} onChange={e => this.handleSearch(e.target.value)} style={{height:"35px",paddingLeft:"10px",width:"360px"}} type="text" placeholder="Tìm kiếm" />
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ Email</th>
                  <th>Trạng thái</th>
                  <th>Vai trò</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>

              {this.handleMapData()}

              </tbody>
              <tfoot>
                <tr>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ Email</th>
                  <th>Trạng thái</th>
                  <th>Vai trò</th>
                  <th>Hành động</th>
                </tr>
              </tfoot>
            </table>
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

export default UsersPage;

class ItemRow extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  handleSwitch(status,idUser){
    var self=this;
    if(status == "active"){
// console.log("da block");
var info={
id:parseInt(idUser),
status:"block"
}
axios.post('/usersapi/updateStatus',info).then(function (res) {
//   self.props.data.map(item => {
// if(item.id == parseInt(idUser)){
//   return item.status=res.data[0].status
// }
//   })
if(res){
  // console.log(self.props.data.status,res.data[0].status)
  // let update = self.props.data.status=res.data[0].status;
  // console.log(self.props.data);
return self.handletransmissionStatus(res.data[0]);

}

}).catch(function (err) {
console.log(err);
})
    }else{
// console.log("da active");
var info={
  id:parseInt(idUser),
  status:"active"
  }
  axios.post('/usersapi/updateStatus',info).then(function (res) {
    return self.handletransmissionStatus(res.data[0]);
  }).catch(function (err) {
  console.log(err);
  })
    }
  }
  handletransmissionStatus(user){
var info={
  id:user.id,
status:user.status
}
  this.props.dataStatus(info);
  }
  render() {
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
    const stt = this.props.stt;
    const data = this.props.data;

    return (
      <React.Fragment>
      <tr>
    <td>{stt}</td>
    <td><div className="info-name" style={style.info}><img src={data.image} className="img-circle" width="45px" /> {data.username}</div></td>
    <td>{data.phone_number}</td>
    <td>{data.email}</td>
    <td>{data.status == 'active'?<span style={style.active}>Hoạt động</span>:<span style={style.block}>Đã bị chặn</span>}</td>
    <td>{data.role == 2?<b>Thành viên</b>:<b style={{color:"red"}}>Quản trị viên</b>}</td>
  <td>
    <div className="material-switch">
        <input id={`switch${stt}`} onChange={(data2,idUser2) => this.handleSwitch(`${data.status}`,`${data.id}`)} name="switch" type="checkbox" defaultChecked={data.status=='active'?"":"checked"} />
        <label htmlFor={`switch${stt}`} className="label-primary"></label>
    </div>
                          </td>
  </tr>
    </React.Fragment>
    );
  }
}
