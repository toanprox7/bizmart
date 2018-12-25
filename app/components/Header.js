import React, { Component } from 'react';
import {Link,NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {addDataUserLocal} from "../actions";
import {addDataCategoryLocal} from "../actions";
import axios from "axios";
import ItemSearch from "./ItemSearch";
import { withRouter } from "react-router-dom";
var _ = require('lodash');
var jwt = require("jsonwebtoken");
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataUser:"",
      displayHead:"block",
      disPlaySearch:"hidden",
      dataSearch:[],
      textSearch:""
    }
  }

  componentWillMount() {
    // console.log(window.location.pathname == '/admin');
    var link = window.location.pathname;

    if(link.indexOf('/admin') != -1){
      this.setState({
        displayHead:'none'
      });
    }else{
      this.setState({
        displayHead:'block'
      });
    }
// console.log("hello2")
    let tokenUser = localStorage.getItem("tokenUser");
    if(tokenUser){
      if(tokenUser != ""){
        var self =this;
        jwt.verify(tokenUser, 'toanpro', function(err, decoded) {
          self.setState({
            displayHeadDropdown:"block",
            displayHeadRight:"none"
          });
          axios.get(`/usersapi/${decoded.id}`).then(function (res) {
            self.handleDataUser(self.props.addUserLocal(res.data));
          }).catch(function (err) {
            console.log(err)
          })
        });
      }else{
        this.setState({
          displayHeadDropdown:"none",
          displayHeadRight:"block"
        });
      }
    }else{
      this.setState({
        displayHeadDropdown:"none",
        displayHeadRight:"block"
      });
    }
    var self= this;
    axios.get("/categoryapi").then(function (res) {
      self.props.addCategoryLocal(res.data)
    }).catch(function (err) {
    throw err
    })


  }
  handleDataUser=async(data) => {
    await this.setState({
      dataUser:data.getDataUserLocal
    });
  }
  handleLogout=()=>{
    localStorage.removeItem("tokenUser");
  }
  handleSearch=_.debounce((text) => {
    var self=this;
    // e.preventDefault();
    // var name = e.target.name;
    // var value = e.target.value;
    // _.debounce((e) => {
    //   console.log('Debounced Event:', e);
    // }, 1000)
    // console.log('Debounced Event:', text,name);
    var infoSearch={
      title:{contains:text},
      limit:6
    }
    axios.post("/productsapi/findProducts",infoSearch).then(function (res) {
      self.setState({
        dataSearch:res.data.data
      });
    }).catch(function (err) {
      console.log(err);
    })
    if(text.length != 0){
      this.setState({
        disPlaySearch:"visible",
        textSearch:text
      });
    }else{
      this.setState({
        disPlaySearch:"hidden"
      });
    }
    // var resultBuffer = encoding.convert("test thu ty xem sao", 'ASCII', 'UTF-8');
// console.log(resultBuffer);
  },10)
checkMap(){
 if(this.state.dataSearch.length != 0){
  return this.state.dataSearch.map((item,index) => {
    return <ItemSearch key={index} data={item} />
  })
 }else{
   return null;
 }
}

_handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    this.handleClickSearchBtn();
  }
}
handleClickSearchBtn(e){
  // var self = this;
  if(this.state.textSearch != ""){
    window.location.reload();
    this.props.history.push(`/products-search/${this.state.textSearch}/1/0`);

  }else{
    return alert("No empty");
  }
}
    render() {
      var image = (this.state.dataUser != "")?this.state.dataUser.image:"/images/logo.png";
      var username = (this.state.dataUser != "")?this.state.dataUser.username:"Khach";
        return (
            <header id="head9009" style={{display:this.state.displayHead}}>
            <div id="wrap-full-header">
              <div id="top-menu">
                <div className="container">
                  <div className="top-menu-inside">
                    <div className="across-left-top">
                      <span>1900 68 88</span>
                      <span><a href="/post-new" onClick={()=> {window.location.reload()}}>Đăng tin miễn phí</a></span>
                    </div>
                    <div style={{display: `${this.state.displayHeadDropdown}`}} className="dropdown dropdown-bizmart">
                      <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><img src={image} width={25} height={25} alt="image-profile" />
                       {username} <i className="fa fa-caret-down" /></button>
                      <ul className="dropdown-menu dropdown-menu-bizmart">
                        <li><a href="/update-user">Cập nhật thông tin</a></li>
                        <li className="divider" />
                        <li><a onClick={this.handleLogout} href="/">Đăng xuất</a></li>
                      </ul>
                    </div>

                    <div style={{display: `${this.state.displayHeadRight}`}} className="across-right-top">
                      <span><i className="fa fa-user" />
                        <a href="/login">Đăng nhập</a></span>
                      <span><a href="/register">Đăng kí</a></span>
                    </div>
                  </div>
                </div>
              </div>
              {/* end top menu */}
              <div id="wrap-header-search-menu">
                <div className="category-list-icon-hidden">
                  <span><Link to="#" className="nav-button">Menu</Link></span>
                </div>
                <div className="container main-header-bizmart">
                  <div className="search-menu-aside">
                    <div className="icon-search-hidden">
                      <span><i className="fa fa-search" /></span>
                    </div>
                    <div className="logo-bizmart">
                      <a href="/">
                        <img src="/images/logo_bizmart.png" width="200px" className="img-thumbnail" alt="logo" />
                      </a>
                    </div>
                    <div className="search">
                    <div className="input-group">
                        <input onKeyPress={(e) => this._handleKeyPress(e)} type="text" className="form-control" name="name" onChange={e => this.handleSearch(e.target.value,e.target.name)} placeholder="Hôm nay bạn muốn mua gì?" />
                        <div className="input-group-btn">
                          <button onClick={e => this.handleClickSearchBtn(e)} className="btn btn-default" type="submit">
                            <i className="glyphicon glyphicon-search" />
                          </button>

                        </div>
                      </div>
                      <div style={{visibility:this.state.disPlaySearch}} className="block-search-bottom">
                          {this.checkMap()}
                        <div className="see-more">
                          <a onClick={e => this.handleClickSearchBtn(e)} >Xem thêm</a>
                        </div>
                      </div>

                    </div>

                    <div className="icon-across-header">
                      <ul>

                        <li style={{display: `${this.state.displayHeadRight}`}}><a href="/login">Đăng Nhập</a></li>
                        <li style={{display: `${this.state.displayHeadRight}`}}><a href="/register">Đăng Ký</a></li>
                        <li><a href="/post-new">Đăng Tin Mới</a></li>
                      </ul>
                    </div>
                    {/* <div className="shopping-cart"> */}
                    {/* <Link to="shopping-cart"><i className="fa fa-cart-arrow-down"><span>1</span></i></Link> */}
                    {/* </div> */}
                  </div>
                </div>
                <div className="setting-header-icon-hidden">
                  <span><i className="fa fa-chevron-down" /></span>
                </div>
              </div>
              <div className="block-info-header">
                <ul>
                  <li><a href="/login">Đăng Nhập</a></li>
                  <li><a href="/register">Đăng Ký</a></li>
                  <li><a href="/post-new">Đăng Tin Mới</a></li>
                </ul>
              </div>
              <div className="category-fixed">
                <div className="icon-delete-cate">
                  <span>{/* <i class="fa fa-times"></i> */}
                    <Link to="#" className="nav-close">Close Menu</Link>
                  </span>
                </div>
                <nav className="nav">
                  <div className="title-category-fixed">
                    <h3>Danh mục sản phẩm</h3>
                  </div>
                  <ul>
                    <li><Link to="./products">Clothes</Link></li>
                    <li><Link to="./products">Bags</Link></li>
                    <li className="nav-submenu"><Link to="products">Hats</Link>
                      <ul>
                        <li><Link to="products">Some Service</Link></li>
                        <li><Link to="products">Another Service</Link></li>
                        <li><Link to="products">Good Service</Link></li>
                        <li><Link to="products">Room Service</Link></li>
                      </ul>
                    </li>
                    <li className="nav-submenu"><Link to="products">Drinks and food</Link>
                      <ul>
                        <li><Link to="products">Food</Link></li>
                        <li className="nav-submenu"><Link to="products">Drinks</Link>
                          <ul>
                            <li><Link to="products">Water</Link></li>
                            <li className="nav-submenu"><Link to="products">Cola</Link>
                              <ul>
                                <li className="nav-submenu nav-left"><Link to="products">Coca Cola</Link>
                                  <ul>
                                    <li><Link to="products">This one goes left!</Link></li>
                                    <li><Link to="products">Too much sugar...</Link></li>
                                    <li><Link to="products">Yummy</Link></li>
                                  </ul>
                                </li>
                                <li><Link to="products">Pepsi</Link></li>
                                <li><Link to="products">River</Link></li>
                              </ul>
                            </li>
                            <li><Link to="products">Lemonade</Link></li>
                          </ul>
                        </li>
                        <li><Link to="products">Candy</Link></li>
                        <li><Link to="products">Ice Cream</Link></li>
                      </ul>
                    </li>
                    <li className="nav-submenu"><Link to="products">Albums</Link>
                      <ul>
                        <li><Link to="products">Christmas</Link></li>
                        <li><Link to="products">New Year</Link></li>
                        <li><Link to="products">Easter</Link></li>
                      </ul>
                    </li>
                    <li><Link to="products">full sorce</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>

        );
    }
}
const mapDispatchToProps=(dispatch) =>({
  addUserLocal: getDataUserLocal => dispatch(addDataUserLocal(getDataUserLocal)),
  addCategoryLocal: getDataCategoryLocal => dispatch(addDataCategoryLocal(getDataCategoryLocal))

})
const mapStateToProps = (state) => {
  return {
    getStateDataUserLocal: state.usersReducer.dataUserLocal
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
