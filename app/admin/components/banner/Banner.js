import React, { Component } from 'react'
import Pagination from "react-js-pagination"
import ReactLoading from 'react-loading';
import axios from 'axios';
import {tokenAuthorization} from "app/utils"
import {Link} from "react-router-dom"
const Loading = () => (
    <ReactLoading type="bars" color="blue" style={{margin:"auto",width:"50px"}} />
);
export default class Mails extends Component {
    constructor(props) {
        super(props);
        this.state={
            activePage: 1,
      data:null,
      displayModal:"none"
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
        axios.post('/banner/list',{skip:skipStart,sort:'createdAt DESC',limit:10},{
          headers: {
            'authorization':tokenAuthorization,
          }
        }).then(function (res) {
          if(res.data.length > 0){
            self.setState({
              data:res.data,
              totalPageRecord:res.data.length,
              isLoading:false
            });
          }else{
            self.setState({
              data:"Không tìm thấy banner nào",
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
              title:{contains:this.props.match.params.textSearch}
            }]
                },
          skip:skipStart,
          limit:10,
          sort:'createdAt DESC'
        }
        axios.post("/banner/search",infoSearch,{
          headers: {
            'authorization':tokenAuthorization,
          }
        }).then(function (res) {
          if(res.data.length > 0){
            self.setState({
              data:res.data,
              totalPageRecord:res.data.length,
              isLoading:false
            });
          }else{
            self.setState({
              data:"Không tìm thấy banner nào",
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
          id:modal
        });
      }
      handleMapData(){
        if(this.state.data){
      return this.state.data.map((item,index) => {
        return <ItemRow modalDisplay={(modal) => this.handleDisplayModal(modal) } data={item} key={index} stt={index} />
      })
        }else{
          return "Không tìm thấy banner nào";
        }
      }
      handleSearch=_.debounce((text) => {
        this.setState({
          textSearch:text,
          activePage:1,
          data:null,
          isLoading:true
        });
        this.changeRoute(this.state.textSearch);
        var self=this;
        let skipStart = (this.props.match.params.idPage - 1) * 10;
        if(this.props.match.params.textSearch != " "){
          var infoSearch={
            where:{
              or:[{
                title:{contains:this.props.match.params.textSearch}
              }]
                  },
            skip:skipStart,
            limit:10,
            sort:'createdAt DESC'
          }
          axios.post("/banner/search",infoSearch,{
            headers: {
              'authorization':tokenAuthorization,
            }
          }).then(function (res) {
            if(res.data.length > 0){
              self.setState({
                data:res.data,
                totalPageRecord:res.data.length,
                isLoading:false
              });
            }else{
              self.setState({
                data:"Không tìm thấy banner nào",
                totalPageRecord:0,
                isLoading:false
              });
            }
          }).catch(function (err) {
            console.log(err);
          })
          this.handleRequestSearch();
        }else if(this.props.match.params.textSearch == " "){
          axios.post('/banner/list',{skip:skipStart,sort:'createdAt DESC',limit:10},{
            headers: {
              'authorization':tokenAuthorization,
            }
          }).then(function (res) {
            if(res.data.length > 0){
              self.setState({
                data:res.data,
                totalPageRecord:res.data.length,
                isLoading:false
              });
            }else{
              self.setState({
                data:"Không tìm thấy banner nào",
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
          axios.post('/banner/list',{sort:'createdAt DESC'},{
            headers: {
              'authorization':tokenAuthorization,
            }
          }).then(function (res) {
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
        }else if(this.props.match.params.textSearch != " "){
          var infoSearch={
            where:{
              or:[{
                title:{contains:this.props.match.params.textSearch}
              }]
                  },
            sort:'createdAt DESC'
          }
          axios.post("/banner/search",infoSearch,{
            headers: {
              'authorization':tokenAuthorization,
            }
          }).then(function (res) {
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
          }).catch(function (err) {
            console.log(err)
          })
        }
      
      }
      changeRoute(textSearch){
        if(!textSearch){
          this.props.history.push(`/admin/banners/ /page-1.html`)
        }else{
          this.props.history.push(`/admin/banners/${textSearch}/page-1.html`)
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
        axios.post(`/banner/list`,{sort:'createdAt DESC',limit:limit,skip:skipStart},{
          headers: {
            'authorization':tokenAuthorization,
          }
        }).then(function (res) {
          if(res.data.length > 0){
            self.setState({
              data:res.data,
              totalPageRecord:res.data.length,
              isLoading:false
            });
          }else{
            self.setState({
              data:"Không tìm thấy banner nào",
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
              title:{contains:this.props.match.params.textSearch}
            }]
                },
          skip:skipStart,
          limit:10,
          sort:'createdAt DESC'
        }
        axios.post("/banner/search",infoSearch,{
          headers: {
            'authorization':tokenAuthorization,
          }
        }).then(function (res) {
          if(res.data.length > 0){
            self.setState({
              data:res.data,
              totalPageRecord:res.data.length,
              isLoading:false
            });
          }else{
            self.setState({
              data:"Không tìm thấy banner nào",
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
        this.props.history.push(`/admin/banners/ /page-${numberPage}.html`);
      }else if(this.props.match.params.textSearch != " "){
        this.props.history.push(`/admin/banners/${this.props.match.params.textSearch}/page-${numberPage}.html`);
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
    return (
     <React.Fragment>
          <section className="content-header">
      <h1>
      Quản lý Banner
      </h1>
     
    </section>
    <section className="content">
      <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title" style={{display:"block",marginBottom:"10px"}}>Tất cả Banner</h3>
            <Link to="/admin/banners/create.html"><button type="button" className="btn btn-warning"><b>Tạo banner mới</b></button></Link>

            <div className="input-Search pull-right" >

            <input value={this.handleValue()} onChange={e => this.handleSearch(e.target.value)} style={{height:"35px",paddingLeft:"10px",width:"360px"}} type="text" placeholder="Tìm kiếm" />
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
          {this.state.isLoading === true?<Loading />:null}
          {this.state.data && this.state.data !== "Không tìm thấy banner nào"?(
               <table  className="table table-bordered table-striped">
               <thead>
                 <tr>
                   <th>STT</th>
                   <th>Tên banner</th>
                   <th>Đường dẫn</th>
                   <th>Thuộc banner</th>
                   <th>Ảnh banner</th>
                   <th>Hành động</th>
                 </tr>
               </thead>
               <tbody>
               {this.handleMapData()}
               </tbody>
               <tfoot>
                 <tr>
                   <th>STT</th>
                   <th>Tên banner</th>
                   <th>Đường dẫn</th>
                   <th>Thuộc banner</th>
                   <th>Ảnh banner</th>
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
            axios.post('/banner/destroy', { id: self.state.id },{
              headers: {
                'authorization':tokenAuthorization,
              }
            }).then(function (res) {
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
    )
  }
}
const ItemRow=({data,stt,history,modalDisplay,...rest})=>{
  function checkTypeBanner() {
    if(data.category_banner == 1){
      return "Banner Chính"
    }else if(data.category_banner == 2){
      return "Banner Trái"
    }else{
      return "Banner nhà đối tác"
    }
 
  }
    return (
      <React.Fragment>
        <tr>
      <td>{stt}</td>
      <td>{data.title}</td>
      <td>{<Link to={data.link}>{data.link}</Link>}</td>
      <td>{checkTypeBanner()}</td>
      <td><img height="80px" src={`/images/upload/${data.image}`} /></td>
      <td>
    <Link to={`/admin/banners/${data.id}/edit.html`}>
    <button type="button" className="btn btn-info"><i style={{fontSize:"15px"}} className="fa fa-pencil-square-o" /></button>
    </Link>
    <button onClick={(modal) => modalDisplay(data.id)} type="button" className="btn btn-danger" ><i style={{fontSize:"15px"}} className="fa fa-trash-o" /></button>
  </td>
    </tr>
      </React.Fragment>
    );
    }
    
    