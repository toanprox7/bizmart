import React, { Component } from 'react';
import {Link,NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {addDataUserLocal} from "../actions";
import {addDataCategoryLocal} from "../actions";
import axios from "axios";
var jwt = require("jsonwebtoken");
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataUser:""
    }
  }

  componentWillMount() {
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
            // console.log(decoded);


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
    window.location.reload();
  }


    render() {
      var image = (this.state.dataUser != "")?this.state.dataUser.image:"/images/logo.png";
      var username = (this.state.dataUser != "")?this.state.dataUser.username:"Khach";
        return (
            <header>
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
                        <li><Link onClick={this.handleLogout} to="/">Đăng xuất</Link></li>
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
                <div className="container main-header">
                  <div className="search-menu-aside">
                    <div className="icon-search-hidden">
                      <span><i className="fa fa-search" /></span>
                    </div>
                    <div className="logo">
                      <a href="/">
                        <img src="/images/logo_bizmart.png" width="200px" className="img-thumbnail" alt="logo" />
                      </a>
                    </div>
                    <div className="search">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Hôm nay bạn muốn mua gì?" />
                        <div className="input-group-btn">
                          <button className="btn btn-default" type="submit">
                            <i className="glyphicon glyphicon-search" />
                          </button>
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
                    <div className="shopping-cart">
                    {/* <Link to="shopping-cart"><i className="fa fa-cart-arrow-down"><span>1</span></i></Link> */}
                    </div>
                  </div>
                </div>
                <div className="setting-header-icon-hidden">
                  <span><i className="fa fa-chevron-down" /></span>
                </div>
              </div>
              <div className="block-info-header">
                <ul>
                  <li><NavLink to="/login">Đăng Nhập</NavLink></li>
                  <li><NavLink to="/register">Đăng Ký</NavLink></li>
                  <li><NavLink to="/post-new">Đăng Tin Mới</NavLink></li>
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
export default connect(mapStateToProps, mapDispatchToProps)(Header)
