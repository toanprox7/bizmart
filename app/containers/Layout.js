import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConstantCategoryLeft from "./constantInside/ConstantCategoryLeft";
import ConstantBannerLeft from "./constantInside/ConstantBannerLeft";
import ConstantProductsPrice from "./constantInside/ConstantProductsPrice";
import ProductsHotSale from "../components/products/ProductsHotSale"
class Layout extends Component {
    render() {
        return (
        <React.Fragment>
            <Header {...this.props.rest}/>
            {this.props.children}
            <Footer {...this.props.rest}/>
        </React.Fragment>
        );
    }
}

export default Layout;

export const SideBarLayout = ({children, ...rest}) => {
    return (
        <div id="main">
        <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <ConstantCategoryLeft {...rest} />
                <ConstantBannerLeft {...rest} />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                {children}
              </div>
              
            </div>
        </div>
      </div>
    )
  }

  export const ProductsLayout = ({children, ...rest}) => {
    return (
        <div id="main">
        <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <ConstantCategoryLeft {...rest} />
                <ConstantProductsPrice {...rest} />
                <ConstantBannerLeft {...rest} />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                {children}
              </div>
              <ProductsHotSale {...rest} />
            </div>
        </div>
      </div>
    )
  }
  export const PostNewLayout = ({match,children, ...rest}) => {
    return (
        <div id="main">
        <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <ConstantCategoryLeft {...rest} />
                <ConstantProductsPrice 
                match={match} 
                {...rest}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                {children}
              </div>
            </div>
        </div>
      </div>
    )
  }
