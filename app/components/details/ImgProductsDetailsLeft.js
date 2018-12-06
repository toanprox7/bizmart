import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import "./js/owl/css/navOwl.css";
import ReactImageMagnify from 'react-image-magnify';
const options = {
    margin:10,
    loop:false,
    dots:false,
    nav:false,
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
class ImgProductsDetailsLeft extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  checkProducts(){
    let {dataProducts} = this.props
    if(dataProducts){
      if(dataProducts.image){
        var data = dataProducts.image.split(",");
        return data.map(item => {
          return  <a key={item.id} className="fancybox-thumb" rel="fancybox-thumb" href={`/images/upload/${item}`} title="Golden Manarola (Sanjeev Deo)">
          <img src={`/images/upload/${item}`} alt="img-dep" />
         </a>
        })
      }
    }else if(dataProducts.length == 0){
      return null;
    }
  }
  checkImageMain(){
    let {dataProducts} = this.props
    if(dataProducts){
      if(dataProducts.image){
        var data = dataProducts.image.split(",");
        return data[0];
      }
    }else if(dataProducts.length == 0){
      return null;
    }
  }
    render() {
      const LinkImg =this.checkProducts();
      const linkImgMain = this.checkImageMain();
      const LinkImgLarge = `/images/upload/${linkImgMain}`;
      const LinkImgSmall = `/images/upload/small/${linkImgMain}`;

        return (
<div className="img-products-zoom">
<ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: LinkImgSmall,

    },
    largeImage: {
        src: LinkImgLarge,
        width:1500,
        height:1000,
    },
    style:{zIndex:13}
}} />
  {/* <div className="img-zoom-main">
    <a className="fancybox-thumb" rel="fancybox-thumb" href={`/images/upload/${linkImgMain}`} title="Golden Manarola (Sanjeev Deo)">
      <img className="img-responsive" id="img_01" src={`/images/upload/small/${linkImgMain}`} data-zoom-image={`/images/upload/${linkImgMain}`} />
    </a>
  </div> */}
  <OwlCarousel options={options} >
    {LinkImg}
  </OwlCarousel>
</div>

        );
    }
}

export default ImgProductsDetailsLeft;
