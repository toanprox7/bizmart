import React, { Component } from 'react';
import {NavLink,Link} from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
const history = createHistory({
  forceRefresh: true
});
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeRatings:"",
      activeCategorys:"",
      activeProducts:"",
      activeDashboard:"",
      activeUsers:"",

    }
  }

componentWillMount() {
let Link = window.location.pathname;
  if(Link.indexOf("/ratings") !== -1){
this.setState({
  activeRatings:"active treeview menu-open",
  activeCategorys:"",
  activeProducts:"",
  activeDashboard:"",
  activeUsers:""
});
  }else if(Link.indexOf("/products") !== -1){
  this.setState({
    activeRatings:"",
    activeCategorys:"",
    activeProducts:"active treeview menu-open",
    activeDashboard:"",
    activeUsers:""
  });
  }else if(Link.indexOf("/categorys") !== -1){
    this.setState({
      activeRatings:"",
      activeCategorys:"active treeview menu-open",
      activeProducts:"",
      activeDashboard:"",
      activeUsers:""
    });
  }else if(Link.indexOf("/dashboard") !== -1){
    this.setState({
      activeRatings:"",
      activeCategorys:"",
      activeProducts:"",
      activeDashboard:"active treeview menu-open",
      activeUsers:""
    });
  }else if(Link.indexOf("/users") !== -1){
    this.setState({
      activeRatings:"",
      activeCategorys:"",
      activeProducts:"",
      activeDashboard:"",
      activeUsers:"active treeview menu-open"
    });
  }
}

  render() {
    return (
<aside className="main-sidebar">
  {/* sidebar: style can be found in sidebar.less */}
  <section className="sidebar">
    {/* Sidebar user panel */}
    <div className="user-panel">
      <div className="pull-left image">
        <img src="/images/user2-160x160.jpg" className="img-circle" alt="User Image" />
      </div>
      <div className="pull-left info">
        <p>Admin Bizmart</p>
        <Link to="#"><i className="fa fa-circle text-success" /> Online</Link>
      </div>
    </div>

    <ul className="sidebar-menu" data-widget="tree">
      <li className="header">DANH MỤC CHÍNH</li>
      {/* <li onClick={()=>{
this.setState({
  activeRatings:"",
  activeCategorys:"",
  activeProducts:"",
  activeDashboard:"active treeview menu-open",
  activeUsers:""
});
      }} className={this.state.activeDashboard}>
        <Link to="/admin">
          <i className="fa fa-dashboard" /> <span>Dashboard</span>
        </Link>
      </li> */}
      <li onClick={()=>{
this.setState({
  activeRatings:"",
  activeCategorys:"active treeview menu-open",
  activeProducts:"",
  activeDashboard:"",
  activeUsers:""
});
      }} className={this.state.activeCategorys}>
        <Link to="/admin/categorys/0/page-1.html">
          <i className="fa fa-calendar" /> <span>Quản lý danh mục</span>
        </Link>
      </li>
      <li onClick={()=>{
this.setState({
  activeRatings:"",
  activeCategorys:"",
  activeProducts:"active treeview menu-open",
  activeDashboard:"",
  activeUsers:""
});
      }} className={this.state.activeProducts}>
        <Link to="/admin/products/ /page-1.html">
          <i className="fa fa-bell" /> <span>Quản lý sản phẩm</span>
        </Link>
      </li>
      <li onClick={()=>{
        this.setState({
          activeRatings:"active treeview menu-open",
          activeCategorys:"",
          activeProducts:"",
          activeDashboard:"",
          activeUsers:""
        });
      }} className={this.state.activeRatings}>
        <Link to="/admin/ratings/ /page-1.html">
          <i className="fa fa-commenting-o" /> <span> Quản lý đánh giá</span>
        </Link>
      </li>
      <li onClick={()=>{
          this.setState({
            activeRatings:"",
            activeCategorys:"",
            activeProducts:"",
            activeDashboard:"",
            activeUsers:"active treeview menu-open"
          });
      }} className={this.state.activeUsers}>
        <Link to="/admin/users/ /page-1.html">
          <i className="fa fa-user-circle" /> <span> Quản lý người dùng</span>
        </Link>
      </li>

      <li className="header">SYSTEM</li>
      <li><Link to="/admin/change-password.html"><i className="fa fa-lock" /> <span>Đổi mật khẩu</span></Link></li>
      <li onClick={()=>{
// history.replace('/admin');
if(localStorage.getItem('acess_admin')){
  localStorage.removeItem('acess_admin');
}
      }}><Link to="/admin"><i className="fa fa-user" /> <span>Đăng xuất</span></Link></li>
    </ul>
  </section>
  {/* /.sidebar */}
</aside>

    );
  }
}

export default SideBar;
