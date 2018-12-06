import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import "./styles/navOwl.css";
const options = {
    margin:10,
    loop:true,
    dots:false,
    nav:true,
    responsive:{
      0:{
          items:1
      },
      300:{
        items:2
      },
      773:{
          items:3
      },
      1000:{
          items:4
      }
  },
  autoplay:true
};
class ListProductsHot extends Component {
    render() {
        return (
            // <div className="owl-carousel owl-one">
            <React.Fragment>
            <OwlCarousel ref="car" options={options} >
              <div className="thumbnail">
                <Link to="details"><img className="img-responsive" src="/images/hY27bh_simg_de2fe0_500x500_maxb.jpg" alt="img_product" /></Link>
                <div className="caption">
                  <Link to="details"><h5>Bộ quần áo nam</h5></Link>
                  <p className="price">
                    <span className="price-right">120.000</span>
                    <span>240.000</span>
                  </p>
                  <div className="rating">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                </div>
              </div>
              <div className="thumbnail">
                <Link to="details"><img className="img-responsive" src="/images/hY27bh_simg_de2fe0_500x500_maxb.jpg" alt="img_product" /></Link>
                <div className="caption">
                  <Link to="details"><h5>Bộ quần áo nam</h5></Link>
                  <p className="price">
                    <span className="price-right">120.000</span>
                    <span>240.000</span>
                  </p>
                  <div className="rating">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                </div>
              </div>
              <div className="thumbnail">
                <Link to="details"><img className="img-responsive" src="/images/hY27bh_simg_de2fe0_500x500_maxb.jpg" alt="img_product" /></Link>
                <div className="caption">
                  <Link to="details"><h5>Bộ quần áo nam</h5></Link>
                  <p className="price">
                    <span className="price-right">120.000</span>
                    <span>240.000</span>
                  </p>
                  <div className="rating">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                </div>
              </div>
              <div className="thumbnail">
                <Link to="details"><img className="img-responsive" src="/images/hY27bh_simg_de2fe0_500x500_maxb.jpg" alt="img_product" /></Link>
                <div className="caption">
                  <Link to="details"><h5>Bộ quần áo nam</h5></Link>
                  <p className="price">
                    <span className="price-right">120.000</span>
                    <span>240.000</span>
                  </p>
                  <div className="rating">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                </div>
              </div>
              <div className="thumbnail">
                <Link to="details"><img className="img-responsive" src="/images/hY27bh_simg_de2fe0_500x500_maxb.jpg" alt="img_product" /></Link>
                <div className="caption">
                  <Link to="details"><h5>Bộ quần áo nam</h5></Link>
                  <p className="price">
                    <span className="price-right">120.000</span>
                    <span>240.000</span>
                  </p>
                  <div className="rating">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                </div>
              </div>
              <div className="thumbnail">
                <Link to="details"><img className="img-responsive" src="/images/hY27bh_simg_de2fe0_500x500_maxb.jpg" alt="img_product" /></Link>
                <div className="caption">
                  <Link to="details"><h5>Bộ quần áo nam</h5></Link>
                  <p className="price">
                    <span className="price-right">120.000</span>
                    <span>240.000</span>
                  </p>
                  <div className="rating">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                </div>
              </div>
              <div className="thumbnail">
                <Link to="details"><img className="img-responsive" src="/images/hY27bh_simg_de2fe0_500x500_maxb.jpg" alt="img_product" /></Link>
                <div className="caption">
                  <Link to="details"><h5>Bộ quần áo nam</h5></Link>
                  <p className="price">
                    <span className="price-right">120.000</span>
                    <span>240.000</span>
                  </p>
                  <div className="rating">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                </div>
              </div>
              <div className="thumbnail">
                <Link to="details"><img className="img-responsive" src="/images/hY27bh_simg_de2fe0_500x500_maxb.jpg" alt="img_product" /></Link>
                <div className="caption">
                  <Link to="details"><h5>Bộ quần áo nam</h5></Link>
                  <p className="price">
                    <span className="price-right">120.000</span>
                    <span>240.000</span>
                  </p>
                  <div className="rating">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                </div>
              </div>	
            {/* </div> */}
           </OwlCarousel>
           </React.Fragment>
        );
    }
}

export default ListProductsHot;