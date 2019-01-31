import React, { Component } from 'react';

class ContentWraper extends Component {
  render() {
    return (
<div className="content-wrapper">
  {/* Content Header (Page header) */}

    {/* Info boxes */}
    {/* Main row */}
    {this.props.children}
    {/* /.row */}
 
  {/* /.content */}
</div>

    );
  }
}

export default ContentWraper;
