import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class BannerLeft extends Component {
    render() {
        return (
            <div className="banner-left">
            <div className="banner-left-1">
              <Link to="/details">
                <img className="img-responsive" src="/images/banner-left-beauty-garden-xo-so-kieu-my.png" alt="banner" />
              </Link>
            </div>
            <div className="banner-left-2">
              <Link to="/details">
                <img className="img-responsive" src="/images/banner-left-beauty-garden-xo-so-kieu-my.png" alt="banner" />
              </Link>
            </div>
          </div>
          
        );
    }
}

export default BannerLeft;