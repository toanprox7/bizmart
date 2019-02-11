import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserById } from "../actions/usersAction";
import { addDataCategoryLocal } from "../actions";
import axios from "axios";
import ItemSearch from "./ItemSearch";
import { withRouter } from "react-router-dom";
import {tokenAuthorization} from "app/utils"
import ConstantCategoryLeft from "../containers/constantInside/ConstantCategoryLeft";
import {checkAuthenticate} from "../actions/settings";
import {DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Line, Circle } from 'rc-progress';
var _ = require('lodash');
var jwt = require("jsonwebtoken");
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: null,
      isProcess:{
        isLoading:false,
        percent:0
      },
      displayHead: "block",
      disPlaySearch: "hidden",
      isAuthentication:false,
      dataSearch: [],
      textSearch: "",
      displayInputSearch:false,
      toggleChevron:false,
      style: {
        listCategory: {
          top: "-1024px"
        },
        listInfo:{
          right:"-300px"
        }
      }
    }
  }

  componentWillMount() {
    let tokenUser = localStorage.getItem("tokenUser");
    if (tokenUser) {
      if (tokenUser != "") {
        var self = this;
        jwt.verify(tokenUser, 'toanpro', function (err, decoded) {
          if(err){
            this.setState({
              isAuthentication:false
            });
            localStorage.removeItem("tokenUser");
          }else{
            self.props.getUserById(decoded.id);
            self.props.isAuthenticate(true);
          }
        });
      } else {
        this.setState({
          isAuthentication:false
        });
        localStorage.removeItem("tokenUser");
      }
    } else {
      this.setState({
        isAuthentication:false
      });
    }
    var self = this;
    axios.get("/categoryapi",{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then(function (res) {
      self.props.addCategoryLocal(res.data)
    }).catch(function (err) {
      throw err
    })
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps,"next props");
    this.setState({
      isAuthentication:nextProps.getIsAuthenticate,
      dataUser:nextProps.getStateDataUserLocal,
      isProcess:nextProps.isProcessBar,
      textSearch:nextProps.textSearch
    });
    // setTimeout(() => {
    //   this.setState({ isProcess:{
    //     ...nextProps.isProcessBar,percent:50
    //   } });
    // }, 300);
    // this.scrollToTop();
  }

  handleDataUser = async (data) => {
    await this.setState({
      dataUser: data.getDataUserLocal
    });
  }
  handleLogout = () => {
    localStorage.removeItem("tokenUser");
    this.props.isAuthenticate(false);
  }
  handleSearch = _.debounce((text) => {
    var self = this;
    self.setState({
      textSearch:text
    });
    var infoSearch = {
      title: { contains: text },
      limit: 6
    }
    axios.post("/productsapi/findProducts", infoSearch,{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then(function (res) {
      self.setState({
        dataSearch: res.data.data
      });
    }).catch(function (err) {
      console.log(err);
    })
    if (text.length != 0) {
      this.setState({
        disPlaySearch: "visible",
        textSearch: text
      });
    } else {
      this.setState({
        disPlaySearch: "hidden"
      });
    }
    // var resultBuffer = encoding.convert("test thu ty xem sao", 'ASCII', 'UTF-8');
    // console.log(resultBuffer);
  }, 10)
  checkMap() {
    if (this.state.dataSearch.length != 0) {
      return this.state.dataSearch.map((item, index) => {
        return <ItemSearch key={index} data={item} />
      })
    } else {
      return null;
    }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClickSearchBtn();
    }
  }
  handleClickSearchBtn(e) {
    // var self = this;
    if (this.state.textSearch != "") {
      // window.location.href = ``;
      // this.props.history.push();
      this.props.history.push(`/products-search/${this.state.textSearch}/1/0`);
      this.setState({
        textSearch:"",
        dataSearch:[]
      })
    } else {
      return alert("No empty");
    }
  }
  handleChangePasswordDisplay(){
    var token = localStorage.getItem("tokenUser");
    if(token){
      var decoded = jwt.verify(token, 'toanpro');
      if(!decoded || decoded.googleId || decoded.facebookId){
        return null
      }else if(decoded && !decoded.googleId && !decoded.facebookId){
        return <li><Link to="/change-password">Đổi mật khẩu</Link></li>
      }
    }
  }
  render() {
    var {dataUser} = this.state;
    var username = "Khach";
    return (
      <header id="head9009" style={{ display: this.state.displayHead }}>
     {this.state.isProcess.isLoading === true?(<Line style={{position: "fixed",
zIndex: 1000}} percent={this.state.isProcess.percent} strokeWidth="0.2" strokeColor="orange" />):null} 
        <div id="wrap-full-header">
          <div id="top-menu">
            <div className="container">
              <div className="top-menu-inside">
                <div className="across-left-top">
                  <span>1900 68 88</span>
                  <span><Link to="/post-new" >Đăng tin miễn phí</Link></span>
                </div>

                {this.state.isAuthentication === true?(
                  <div className="dropdown dropdown-bizmart">
                  <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><img src={dataUser?dataUser.image:null} width={25} height={25} alt="image-profile" />
                    {dataUser?dataUser.username:null} <i className="fa fa-caret-down" /></button>
                  <ul className="dropdown-menu dropdown-menu-bizmart">
                    <li><Link to="/update-user">Cập nhật thông tin</Link></li>
                    {this.handleChangePasswordDisplay()}
                    <li className="divider" />
                    <li><Link onClick={this.handleLogout} to="/">Đăng xuất</Link></li>
                  </ul>
                </div>
                ):(
                  <div className="across-right-top">
                  <span><i className="fa fa-user" />
                    <Link to="/login">Đăng nhập</Link></span>
                  <span><Link to="/register">Đăng kí</Link></span>
                </div>
                )}
              </div>
            </div>
          </div>
          {/* end top menu */}
          <div id="wrap-header-search-menu">
          {this.state.displayInputSearch === true?null:(
            <div className="category-list-icon-hidden">
            <span><i className="fa fa-list" onClick={() => {
              this.setState({
                style: {
                  listCategory: {
                    top: 0
                  }
                }
              });
            }}></i></span>
          </div>

          )}

            <div className="container main-header-bizmart">
              <div className="search-menu-aside">
                <div className="icon-search-hidden">
                  <span><i onClick={()=>{
                    this.setState({
                      displayInputSearch:!this.state.displayInputSearch
                    });
                  }} className="fa fa-search" /></span>
                </div>
                {this.state.displayInputSearch === true?null: (
 <div className="logo-bizmart">
 <Link to="/">
   <img src="/images/logo_bizmart.png" width="200px" className="img-responsive" alt="logo" />
 </Link>
</div>
                )}

                <div className="search">
                  <div className="input-group">
                    <input onKeyPress={(e) => this._handleKeyPress(e)} type="text" className="form-control" name="name" onChange={e => this.handleSearch(e.target.value, e.target.name)} value={this.state.textSearch} placeholder="Hôm nay bạn muốn mua gì?" />
                    <div className="input-group-btn">
                      <button onClick={e => this.handleClickSearchBtn(e)} className="btn btn-default" type="submit">
                        <i className="glyphicon glyphicon-search" />
                      </button>

                    </div>
                  </div>
                  {this.state.textSearch !== ""?(<div className="block-search-bottom">
                    {this.checkMap()}
                    <div className="see-more">
                      <a onClick={e => this.handleClickSearchBtn(e)} >Xem thêm</a>
                    </div>
                  </div>):null}

                </div>

                <div className="icon-across-header">
                    {this.state.isAuthentication === true?(
                       <ul>
                      <li><Link to="/post-new">Đăng Tin Mới</Link></li>
                      </ul>
                    ):(
                      <ul>
                      <li><Link to="/login">Đăng Nhập</Link></li>
                      <li><Link to="/register">Đăng Ký</Link></li>
                      <li><Link to="/post-new">Đăng Tin Mới</Link></li>
                      </ul>
                    )}
                </div>
                {/* <div className="shopping-cart"> */}
                {/* <Link to="shopping-cart"><i className="fa fa-cart-arrow-down"><span>1</span></i></Link> */}
                {/* </div> */}
              </div>
            </div>
            {this.state.displayInputSearch === true?null: (
              <div className="setting-header-icon-hidden">
              <span><i onClick={()=>{
                this.setState({
                  toggleChevron:!this.state.toggleChevron,
                });
              }} className="fa fa-chevron-down" /></span>
            </div>
                )}

          </div>
          {this.state.toggleChevron === true?( <div style={{display:"block"}} className="block-info-header">
          <ul>
            <li><Link to="/post-new">Đăng Tin Mới</Link></li>
            {localStorage.getItem("tokenUser") ? <li><a href="/update-user">Cập nhật thông tin</a></li> : <li><a href="/login">Đăng Nhập</a></li>}

            {localStorage.getItem("tokenUser") ? <li><a onClick={this.handleLogout} href="/">Đăng xuất</a></li> : <li><a href="/register">Đăng Ký</a></li>}
          </ul>
        </div>):null}

          <div style={this.state.style.listCategory} className="list-category">
            <div className="head-list-res">
              <div className="pull-right close-nav-list">
                <i onClick={() => {
                  this.setState({
                    style: {
                      listCategory: {
                        top: "-1024px"
                      }
                    }
                  });
                }} className="fa fa-close"></i>
              </div>
            </div>
            <ConstantCategoryLeft />
          </div>

        </div>
      </header>

    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getUserById: getId => dispatch(fetchUserById(getId)),
  addCategoryLocal: getDataCategoryLocal => dispatch(addDataCategoryLocal(getDataCategoryLocal)),
  isAuthenticate: getIsAuthenticate => dispatch(checkAuthenticate(getIsAuthenticate))
})
const mapStateToProps = (state) => {
  return {
    getStateDataUserLocal: state.userReducer,
    getIsAuthenticate:state.loginReducer.isAuthenticate,
    isProcessBar:state.loginReducer.isProcessBar,
    textSearch:state.productsReducer.textSearch
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
