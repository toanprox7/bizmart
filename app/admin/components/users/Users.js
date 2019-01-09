
import React, { Component } from 'react';
import axios from 'axios';
import { ButtonCreate } from './components/Create';
import {Link} from "react-router-dom"
import Pagination from "react-js-pagination";
import {connect} from "react-redux";
import {fetchAllUser} from "../../../actions/usersAction"
import './users.css'
import ReactLoading from 'react-loading';
const Loading = () => (
  <ReactLoading type="bars" color="blue" style={{margin:"auto",width:"50px"}} />
);
class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      activePage: 1,
      checkedSwitch:"checked"
    }
  }


componentDidMount() {

  // this.props.fetchAllUserLimit()
  this.setState({
activePage:parseInt(this.props.match.params.idPage),
isLoading:true
  });
var self=this;
if(this.props.match.params.textSearch == " "){
  let skipStart = (parseInt(this.props.match.params.idPage) - 1) * 10;
  let infoData ={skip:skipStart,sort:'createdAt DESC',limit:10}
  this.props.fetchAllUserLimit(infoData);
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
      totalPageRecord:res.data.length,
      isLoading:false
    });
  }).catch(function (err) {
    console.log(err);
  })
  this.handleRequestSearch()
}
// this.getFullRecord();
}
componentWillUnmount() {
  this.setState({
    data:null,
    totalPageRecord:null
  });
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
componentWillReceiveProps(nextProps) {
  // console.log(nextProps);

  this.requestData(nextProps);
  // self.setState({
    //     data:res.data,
    //     totalPageRecord:res.data.length
    //   })

}
requestData= async (nextProps)=>{
  if(nextProps.dataUser.length > 0){
    await this.setState({
      data:nextProps.dataUser,
      totalPageRecord:nextProps.dataUser.length,
      isLoading:false
    });

  }else{
    await this.setState({
      data:"Không tìm thấy người dùng nào",
      totalPageRecord:0,
      isLoading:false
    });
  }
  await this.handleRefresh();
}
handleMapData(){
  var array=[];
  if(this.state.data){
if(this.state.data.length <= 10){// console.log(this.state.data,"length");
array.push(this.state.data);
// console.log(array,"hi");
  return   this.state.data.map((item,index) => {
    return <ItemRow dataStatus={(dataStatus) => this.handleDataStatus(dataStatus)} data={item} key={index} stt={index} />
  })
    }else{
      return null;
    }
}else{
return null
}

}
handleSearch=_.debounce((text) => {
  this.setState({
    textSearch:text,
    activePage:1,
    isLoading:true
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
      if(res.data.length > 0){
        self.setState({
          data:res.data,
          totalPageRecord:res.data.length,
          isLoading:false
        });
      }else{
        self.setState({
          data:"Không tìm thấy người dùng nào",
          totalPageRecord:0,
          isLoading:false
        });
      }

    }).catch(function (err) {
      console.log(err);
    })
    this.handleRequestSearch();
  }else if(this.props.match.params.textSearch == " "){
    axios.post('/usersapi/find',{skip:skipStart,sort:'createdAt DESC',limit:10}).then(function (res) {
      if(res.data.length > 0){
        self.setState({
          data:res.data,
          totalPageRecord:res.data.length,
          isLoading:false
        });
      }else{
        self.setState({
          data:"Không tìm thấy người dùng nào",
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
async handlePageChange(pageNumber) {
  await this.setState({
activePage:pageNumber,
  });
  await this.changeRoutePage(pageNumber);
await this.handleRequest(pageNumber)
}
handleRequest(pageNumber){
  var self=this;
  let skipStart = (pageNumber - 1) * 10;
  let limit = 10
  this.setState({
    isLoading:true
  });
if(this.props.match.params.textSearch == " "){
  const infoData={sort:'createdAt DESC',limit:limit,skip:skipStart};
  this.props.fetchAllUserLimit(infoData);
  // axios.post(`/usersapi/find`,{sort:'createdAt DESC',limit:limit,skip:skipStart}).then(function (res) {
  //   console.log(self.state.data,"handleRequest");
  //   self.setState({
  //     data:res.data,
  //     totalPageRecord:res.data.length
  //   })
  // }).catch(function (err) {
  //   console.log(err);
  // })
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
    if(res.data.length > 0){
      self.setState({
        data:res.data,
        totalPageRecord:res.data.length,
        isLoading:false
      });
    }else{
      self.setState({
        data:"Không tìm thấy người dùng nào",
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
  this.props.history.replace(`/admin/users/ /page-${numberPage}.html`);
}else if(this.props.match.params.textSearch != " "){
  this.props.history.replace(`/admin/users/${this.props.match.params.textSearch}/page-${numberPage}.html`);
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
handleRefresh(){
  this.forceUpdate();
}
  render() {
const style={
boxTitle:{
  display:"block",
  marginBottom:"10px"}
}
// console.log(this.state.data);
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
            <div className="input-Search pull-right" >

            <input value={this.handleValue()} onChange={e => this.handleSearch(e.target.value)} style={{height:"35px",paddingLeft:"10px",width:"360px"}} type="text" placeholder="Tìm kiếm" />
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
          {this.state.isLoading === true?<Loading />:null}
          {this.state.data && this.state.data !== "Không tìm thấy người dùng nào"?(

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

              {/* {this.handleMapData()} */}
{this.state.data?this.state.data.map((item,index) => (
  <ItemRow dataStatus={(dataStatus) => this.handleDataStatus(dataStatus)} data={item} key={index} stt={index} />
)
):null}
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
          ):this.state.data}
            <div style={{marginTop:"30px"}} className="pull-left">
<span><b>Hiển thị <span style={{color:"grey"}}>{this.totalPageCurrent()}/{this.checkTotalRecord()}</span></b></span>
            </div>
            <div className="pull-right">
            {/* <li onClick={() => this.props.history.replace("/admin/users/ /page-1.html")}>Click 1</li> */}
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllUserLimit: (data) => {
      dispatch(fetchAllUser(data))
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    dataUser: state.usersReducer.dataUserLimit
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
class ItemRow extends Component {
  constructor(props) {
    super(props);
    this.state={
      checkedSwitch:null
    }
  }
  handleSwitch(status,idUser){
    // console.log("Clicked");
    var self=this;
    if(status == "active"){
// console.log("da block");
var info={
id:parseInt(idUser),
status:"block"
}
axios.post('/usersapi/updateStatus',info).then(function (res) {
if(res){
return self.handletransmissionStatus(res.data[0]);

}

}).catch(function (err) {
console.log(err);
})
    }else if(status == "block"){
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
// handleCheckedStatus(data){
//     if(data){
//       if(data === "active") {return ""}
//       else{
//         return "checked"
//       }
//     }else{
// console.log("err");
//     }
//   }


// componentWillMount() {
//   if(this.props.data && this.props.data.status === "active")
//   {
//     this.setState({
//       checkedSwitch:"checked"
//     });
//   }else{
//     this.setState({
//       checkedSwitch:""
//     });
//   }
// }
componentWillReceiveProps(nextProps) {
  // console.log(nextProps,"test");
  this.requestData(nextProps);
}
componentWillUnmount() {
  this.setState({
    checkedSwitch:null,
    data:null
  });
}

requestData= async (nextProps) =>{
  if(nextProps.data.status){
    await this.setState({
      checkedSwitch:nextProps.data.status === "block"?true:false,
      data:nextProps.data
    });
  }else{
    alert("errr");
  }

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
    // const {image,phone_number,email,status,username,role,id}=this.state.data;
    return (
      <React.Fragment>
      <tr>
    <td>{stt}</td>
    <td><div className="info-name" style={style.info}><img src={this.state.data?this.state.data.image:null} className="img-circle" width="45px" /> {this.state.data?this.state.data.username:null}</div></td>
    <td>{this.state.data?this.state.data.phone_number:null}</td>
    <td>{this.state.data?this.state.data.email:null}</td>
    <td>{this.state.data && this.state.data.status === 'active'?<span style={style.active}>Hoạt động</span>:<span style={style.block}>Đã bị chặn</span>}</td>
    <td>{this.state.data && this.state.data.role == 2?<b>Thành viên</b>:<b style={{color:"red"}}>Quản trị viên</b>}</td>
  <td>
    <div className="material-switch">
        <input id={`switch${stt}`}
        checked={this.state.checkedSwitch?this.state.checkedSwitch:this.state.checkedSwitch}
         onClick={(data2,idUser2) => this.handleSwitch(`${this.state.data?this.state.data.status:null}`,`${this.state.data?this.state.data.id:null}`)} name="switch" type="checkbox" defaultChecked={this.state.checkedSwitch?this.state.checkedSwitch:this.state.checkedSwitch} />
        <label htmlFor={`switch${stt}`} className="label-primary"></label>
    </div>
                          </td>
  </tr>
    </React.Fragment>
    );
  }
}
