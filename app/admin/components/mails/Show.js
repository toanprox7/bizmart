import React, { Component } from 'react'
import axios from "axios";
import {tokenAuthorization} from "app/utils"
import monent from "moment";
import ArrowBack from "@material-ui/icons/ArrowBack"
import createHistory from 'history/createBrowserHistory'
export default class ShowMail extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount() {
        axios.post("/mail/show",{id:this.props.match.params.id},{
            headers: {
              'authorization':tokenAuthorization,
            }
          }).then(res => {
              this.setState({
                  data:res.data
              })
          }).catch(err => console.log(err))
    }
    
  render() {
    const history = createHistory();
    const style = {
      iconBack: { fontSize: "40px", cursor: "pointer", marginBottom: "10px", color: "grey" }
    }
    return (
        <React.Fragment>
        <section className="content-header">
  <h1>
  Đọc phản hồi
  </h1>
 
</section>
<section className="content">
<ArrowBack onClick={() => history.goBack()} style={style.iconBack} />
  <div className="row">
    {/* /.col */}
    <div className="col-md-12">
      <div className="box box-primary">
        <div className="box-header with-border">
        
          <h3 className="box-title">Đọc phản hồi</h3>
        
        </div>
        {/* /.box-header */}
        <div className="box-body no-padding">
          <div className="mailbox-read-info">
            <h3>{this.state.data?this.state.data.name:null}</h3>
            <h5>{`${this.state.data?this.state.data.email:null}-${this.state.data?this.state.data.phone:null}-${this.state.data?this.state.data.address:null}`}
              <span className="mailbox-read-time pull-right">{this.state.data?monent(this.state.data.createdAt).format("DD/MM/YYYY - hh:mm:ss"):null}</span></h5>
          </div>
          {/* /.mailbox-read-info */}
          {/* /.mailbox-controls */}
          <div className="mailbox-read-message">
            {this.state.data?this.state.data.content:null}
          </div>
          {/* /.mailbox-read-message */}
        </div>
        {/* /.box-body */}
        {/* /.box-footer */}
        <div className="box-footer">
          <button type="button" onClick={() => {
            var self=this;
            axios.post('/mail/destroy',{id:this.props.match.params.id},{
              headers: {
                'authorization':tokenAuthorization,
              }
            }).then(res=>{
              if(res.data === "success"){
                return self.props.history.goBack();
              }else{
                alert("Hệ thống đang bảo trì vui lòng thử lại sau!")
                setTimeout(()=>{
                  self.props.history.goBack();
                },1000)
              }
            }).catch(err => {
              alert(`Lỗi ${err}`)
              setTimeout(()=>{
                self.props.history.goBack();
              },1000)
            })
          }} className="btn btn-default"><i className="fa fa-trash-o" /> Xóa</button>
        </div>
        {/* /.box-footer */}
      </div>
      {/* /. box */}
    </div>
    {/* /.col */}
  </div>
  {/* /.row */}
  <div>
  </div></section>

      </React.Fragment>
    )
  }
}
