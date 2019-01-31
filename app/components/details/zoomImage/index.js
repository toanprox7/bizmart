import React, { Component } from 'react';
import ReactSlick from './GalleryImage';

import '../styles/zoomImage.css';

export default class ZoomImage extends Component {
    render() {
        return (
            <div className="fluid react-slick">
                <div className="fluid__image-container">
                    <ReactSlick {...{
                        rimProps: {
                            enlargedImagePortalId: 'portal',
                            enlargedImageContainerDimensions: {
                                width: '200%',
                                height: '100%'
                            }
                        }
                    }}/>
                </div>
                <div className="fluid__instructions" style={{position: 'relative'}}>
                    <div
                        id="portal"
                        className="portal"
                    />
                </div>
                <div style={{height: '1000px'}} />
            </div>
        );
    }
}
