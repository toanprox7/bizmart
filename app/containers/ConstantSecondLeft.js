import React, { Component } from 'react';
import BannerLeftOutside from './constantInside/BannerLeftOutside';
import CategoryOutside from './constantInside/CategoryOutside';
import ProductsPriceOutside from './constantInside/ProductsPriceOutside';
import "./styles/products.css";
class ConstantSecondLeft extends Component {
    render() {
        return (
           <React.Fragment>
               <CategoryOutside />
               <ProductsPriceOutside />
               <BannerLeftOutside />
           </React.Fragment>
        );
    }
}

export default ConstantSecondLeft;