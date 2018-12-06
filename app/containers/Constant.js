import React, { Component } from 'react';
import BannerRoot from './BannerRoot';
import ContentRoot from './ContentRoot';

class Constant extends Component {
    render() {
        return (
            <React.Fragment>
                <BannerRoot />
                <ContentRoot />
            </React.Fragment>
        );
    }
}

export default Constant;