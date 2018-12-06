import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class BannerMain extends Component {
    render() {
        return (
          <div id="banner">
            <div id="banner-1" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#banner-1" data-slide-to={0}  />
                <li data-target="#banner-1" data-slide-to={1}  />
                <li data-target="#banner-1" data-slide-to={2} className="active" />
              </ol>
              <div className="carousel-inner">
                <div className="item">
                  <Link to="/details">
                    <img src="/images/2018-05-18531826-hinh-anh-vne.jpg" alt="banner" />
                  </Link>
                </div>
                <div className="item">
                  <Link to="/details">
                    <img src="/images/banner.jpg" alt="banner" />
                  </Link>
                </div>
                <div className="item active">
                  <Link to="/details">
                    <img src="/images/banner_page.jpg" alt="banner" />
                  </Link>
                </div>
              </div>
              <a className="left carousel-control" href="#banner-1" data-slide="prev"><span className="glyphicon glyphicon-chevron-left" /></a>
              <a className="right carousel-control" href="#banner-1" data-slide="next"><span className="glyphicon glyphicon-chevron-right" /></a>
            </div>
          </div>
          
        );
    }
}

export default BannerMain;