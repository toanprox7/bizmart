import React from 'react';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-header">
      {/* Logo */}
      <a href="index2.html" className="logo">
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
                  <div className="pull-left">
                    <a href="#" className="btn btn-default btn-flat">Profile</a>
                  </div>
                  <div className="pull-right">
                    <a href="#" className="btn btn-default btn-flat">Sign out</a>
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
