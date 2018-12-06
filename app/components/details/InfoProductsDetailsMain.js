import React, { Component } from 'react';
import ImgProductsDetailsLeft from './ImgProductsDetailsLeft';
import InfoProductsDetailRight from './InfoProductsDetailRight';

class InfoProductsDetailsMain extends Component {
    render() {
        return (
        <div className="block-info-products-details">
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
            <ImgProductsDetailsLeft dataProducts={this.props.dataProducts}/>
            </div>
			<div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
            <InfoProductsDetailRight dataProducts={this.props.dataProducts}/>
            </div>
        </div>
        );
    }
}

export default InfoProductsDetailsMain;
