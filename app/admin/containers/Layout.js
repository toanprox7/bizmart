import React, { Component } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import ContentWraper from './ContentWraper';
import Footer from './Footer';

class Layout extends Component {
  render() {
    return (
      <div className="wrapper">
<Header />
<SideBar />
<ContentWraper>
{this.props.children}
</ContentWraper>
<Footer />
      </div>
    );
  }
}

export default Layout;
