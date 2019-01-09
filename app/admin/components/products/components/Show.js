import React, { Component } from 'react';
import "../styles/index.css";
import axios from 'axios';
import NumberFormat from 'react-number-format';
import ArrowBack from "@material-ui/icons/ArrowBack"
import createHistory from 'history/createBrowserHistory'

class Show extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
componentDidMount() {
  var self=this;
  axios.get(`/productsapi/${this.props.match.params.id}`).then((res) =>{
self.setState({
  data:res.data
})
  }).catch((err) => {
    console.log(err);
  })
}
checkImg(){
  let {data} = this.state
  if(data){
    if(data.image){
      var dataImg = data.image.split(",");
      return dataImg.map(item => {
        return  <div key={item.id} className="wraper-img-show" style={{width:"120px",height:"120px",overflow: "hidden", margin:"15px",lineHeight:"120px"
        }}>
            <img width="100%" src={`/images/upload/small/${item}`} />
            </div>
      })
    }
  }else{
    return null;
  }
}
  render() {
    const history = createHistory();
    const style = {
      iconBack: { fontSize: "40px", cursor: "pointer", marginBottom: "10px", color: "grey" }
    }
    return (
      <React.Fragment>
        <section className="content-header"><h1>Chi tiết sản phẩm</h1></section>
        <section className="content">
        <ArrowBack onClick={() => history.goBack()} style={style.iconBack} />
          <div className="box wraper-show">
            <div className="row">
            <section className="content-header info-header"><h3>Thông tin sản phẩm</h3></section>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <div className="block-1">
      <ul className="spacing-aline">
<li className="title-aline">Tên sản phẩm:</li>
<li className="content-aline">{(this.state.data)?this.state.data.title:null}</li>
      </ul>
      <ul className="spacing-aline">
<li className="title-aline">Giá sản phẩm:</li>
<li className="content-aline">{this.state.data?<NumberFormat value={this.state.data.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />:null}</li>
      </ul>
      <ul className="spacing-aline">
<li className="title-aline">Thể loại:</li>
<li className="content-aline">{(this.state.data && this.state.data.categoryId)?this.state.data.categoryId.name:null}</li>
      </ul>
      <ul className="spacing-aline">
<li className="title-aline">Cấp độ:</li>
<li className="content-aline">{(this.state.data && this.state.data.level == 1)?"Cá nhân":"Doanh nghiệp"}</li>
      </ul>
      <ul className="spacing-aline">
<li className="title-aline">Đánh giá:</li>
<li className="content-aline">{(this.state.data)?this.state.data.total_star:null}</li>
      </ul>
      <ul className="spacing-aline">
<li className="title-aline">Ngày đăng:</li>
<li className="content-aline">{(this.state.data)?this.state.data.createdAt.slice(0, 10):null}</li>
      </ul>
      <ul className="spacing-aline">
<li className="title-aline">Trạng thái:</li>
<li className="content-aline">{(this.state.data && this.state.data.status == "active")?"Hoạt động":"Đã bị chặn"}</li>
      </ul>

                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="block-2">
<section className="content-products">
<h4>Nội dung sản phẩm:</h4>
<p>{this.state.data?this.state.data.content:null}</p>
</section>
      <section className="img-products">
      <h4>Ảnh sản phẩm:</h4>
      <div className="wraper-big-img" style={{display:"flex"}}>
   {this.checkImg()}
      </div>


      </section>
                </div>
              </div>
            </div>
            <div className="row">
            <section className="content-header info-header"><h3>Thông tin người dùng </h3></section>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="block-3">
<div className="row">
<div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
<ul className="spacing-aline">
<li className="title-aline" style={{width:"13%"}}>Trạng thái:</li>
<li className="content-aline"><span style={{
  background: "rgba(7, 197, 7, 0.3)",
  padding: "5px 10px",
  borderRadius: "15px",
  fontSize: "13px",
  fontWeight: 700,
  color: "green",
}}>Hoạt động </span></li>
      </ul>
</div>
</div>
<div className="row">
<div className="wraper-content-main">
<ul className="ul-users">
  <li className="title-user">Họ và tên:</li>
  <li className="body-user">{this.state.data&&this.state.data.usersId?this.state.data.usersId.username:null}</li>
</ul>
<ul className="ul-users">
  <li className="title-user">Số điện thoại:</li>
  <li className="body-user">{this.state.data&&this.state.data.usersId?this.state.data.usersId.phone_number:null}</li>
</ul>
<ul className="ul-users">
  <li className="title-user">Địa chỉ email:</li>
  <li className="body-user">{this.state.data&&this.state.data.usersId?this.state.data.usersId.email:null}</li>
</ul>

</div>
</div>
                </div>
            </div>
            </div>
          </div>
        </section>

      </React.Fragment>
    );
  }
}

export default Show;
