import React from 'react';
import jwt from 'jsonwebtoken';
import { withRouter,Link} from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
// import {Link} from 'react-'
const history = createHistory({
  forceRefresh: false
});
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

componentWillMount() {
  var self=this;
  var tokenAdmin = localStorage.getItem('acess_admin');
if(tokenAdmin){
// console.log(tokenAdmin,"toke");
try {
  var decoded = jwt.verify(tokenAdmin, 'toanpro');
if(!decoded){
  this.props.history.push('/admin');
}
} catch(err) {
  // err
this.props.history.push('/admin');
}

}else if(!tokenAdmin){
// this.props.history.push('/admin');
this.props.history.push('/admin');
}
}


  render() {
    return (
      <div className="main-header">
      {/* Logo */}
      <a href="/" className="logo">
        {/* mini logo for sidebar mini 50x50 pixels */}
        <span className="logo-mini"><b>B</b>M</span>
        {/* logo for regular state and mobile devices */}
        <span className="logo-lg"><b>Admin</b>Bizmart</span>
      </a>
      {/* Header Navbar: style can be found in header.less */}
      <nav className="navbar navbar-static-top">
        {/* Sidebar toggle button*/}
        <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
          <span className="sr-only">Toggle navigation</span>
        </a>
        {/* Navbar Right Menu */}
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            {/* User Account: style can be found in dropdown.less */}
            <li className="dropdown user user-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src="/images/user2-160x160.jpg" className="user-image" alt="User Image" />
                <span className="hidden-xs">Admin-Bizmart</span>
              </a>
              <ul className="dropdown-menu">
                {/* User image */}
                <li className="user-header">
                  <img src="/images/user2-160x160.jpg" className="img-circle" alt="User Image" />
                  <p>
                    Admin-Bizmart - Web Developer
                    <small>Member since Nov. 2018</small>
                  </p>
                </li>
                {/* Menu Body */}
                {/* Menu Footer*/}
                <li className="user-footer">
                  {/* <div className="pull-left">
                    <a href="#" className="btn btn-default btn-flat">Profile</a>
                  </div> */}
                  <div className="pull-right">
                    <Link onClick={()=>{
// history.replace('/admin');
if(localStorage.getItem('acess_admin')){
  localStorage.removeItem('acess_admin');
}
      }} to="/admin" className="btn btn-default btn-flat">Đăng xuất</Link>
                  </div>
                </li>
              </ul>
            </li>
            {/* Control Sidebar Toggle Button */}
          </ul>
        </div>
      </nav>
    </div>

    );
  }
}
export default withRouter(Header);
