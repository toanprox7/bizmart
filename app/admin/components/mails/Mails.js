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
        axios.post('/mail/list',{skip:skipStart,sort:'createdAt DESC',limit:10},{
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
              data:"Không tìm thấy phản hồi nào",
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
              name:{contains:this.props.match.params.textSearch},
            }]
                },
          skip:skipStart,
          limit:10,
          sort:'createdAt DESC'
        }
        axios.post("/mail/search",infoSearch,{
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
              data:"Không tìm thấy phản hồi nào",
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
    //   handleDisplayModal(modal){
    //     // console.log(modal,"modal");
    //     this.setState({
    //       displayModal:"block",
    //       idRating:modal
    //     });
    //   }
      handleMapData(){
        if(this.state.data){
      return this.state.data.map((item,index) => {
        return <ItemRow data={item} key={index} stt={index} />
      })
        }else{
          return "Không tìm thấy phản hồi nào";
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
                content:{contains:this.props.match.params.textSearch}
              },{
                name:{contains:this.props.match.params.textSearch},
              }]
                  },
            skip:skipStart,
            limit:10,
            sort:'createdAt DESC'
          }
          axios.post("/mail/search",infoSearch,{
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
                data:"Không tìm thấy phản hồi nào",
                totalPageRecord:0,
                isLoading:false
              });
            }
          }).catch(function (err) {
            console.log(err);
          })
          this.handleRequestSearch();
        }else if(this.props.match.params.textSearch == " "){
          axios.post('/mail/list',{skip:skipStart,sort:'createdAt DESC',limit:10},{
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
                data:"Không tìm thấy phản hồi nào",
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
          axios.post('/mail/list',{sort:'createdAt DESC'},{
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
                content:{contains:this.props.match.params.textSearch}
              },{
                name:{contains:this.props.match.params.textSearch},
              }]
                  },
            sort:'createdAt DESC'
          }
          axios.post("/mail/search",infoSearch,{
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
          this.props.history.push(`/admin/mails/ /page-1.html`)
        }else{
          this.props.history.push(`/admin/mails/${textSearch}/page-1.html`)
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
        axios.post(`/mail/find`,{sort:'createdAt DESC',limit:limit,skip:skipStart},{
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
              data:"Không tìm thấy phản hồi nào",
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
              name:{contains:this.props.match.params.textSearch},
            }]
                },
          skip:skipStart,
          limit:10,
          sort:'createdAt DESC'
        }
        axios.post("/mail/search",infoSearch,{
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
              data:"Không tìm thấy phản hồi nào",
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
        this.props.history.push(`/admin/mails/ /page-${numberPage}.html`);
      }else if(this.props.match.params.textSearch != " "){
        this.props.history.push(`/admin/mails/${this.props.match.params.textSearch}/page-${numberPage}.html`);
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
      Quản lý phản hồi
      </h1>
     
    </section>
    <section className="content">
      <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Tất cả phản hồi từ người dùng</h3>
            <div className="input-Search pull-right" >

            <input value={this.handleValue()} onChange={e => this.handleSearch(e.target.value)} style={{height:"35px",paddingLeft:"10px",width:"360px"}} type="text" placeholder="Tìm kiếm" />
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
          {this.state.isLoading === true?<Loading />:null}
          {this.state.data && this.state.data !== "Không tìm thấy phản hồi nào"?(
               <table  className="table table-bordered table-striped">
               <thead>
                 <tr>
                   <th>STT</th>
                   <th>Họ Và Tên</th>
                   <th>Nội dung phản hồi</th>
                 </tr>
               </thead>
               <tbody>
               {this.handleMapData()}
               </tbody>
               <tfoot>
                 <tr>
                   <th>STT</th>
                   <th>Họ Và Tên</th>
                   <th>Nội dung phản hồi</th>
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
    
    
     </React.Fragment>
    )
  }
}
const ItemRow=({data,stt,history,...rest})=>{
    return (
      <React.Fragment>
        <tr>
      <td>{stt}</td>
      <td><Link to={`/admin/mails/${data.id}/show.html`}>{data.name}</Link></td>
      <td>{`${data.content.slice(0,100)}...`}</td>
    </tr>
      </React.Fragment>
    );
    }
    
    