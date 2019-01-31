import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import "./js/owl/css/navOwl.css";
import ReactImageMagnify from 'react-image-magnify';
const options = {
    margin:10,
    loop:false,
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
  autoplay:false,
  navText:["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"]
};
class ImgProductsDetailsLeft extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  handleClick(data){
    this.setState({
      imgMain:data
    });
  }

  
  checkProducts(){
    let {dataImg} = this.state
    if(dataImg){
        return dataImg.map(item => {
          return <div key={item.id} style={{
            height: "120px",
            overflow: "hidden",
            /* line-height: 107px; */
            display: "flex",
            alignItems: "center",
            marginTop: "16px",
          }}>
            <a key={item.id} onMouseOver={() => this.handleClick(item)} title="Golden Manarola (Sanjeev Deo)">
          <img src={`/images/upload/small/${item}`} alt="img-dep" />
         </a>
          </div>

        })
      
    }else{
      return null;
    }
  }
  componentWillReceiveProps(nextProps) {
    var data = nextProps.dataProducts.image.split(",");
    // console.log(nextProps.dataProducts.image,"nextProp")
    // if(nextProps.image){
    //
    //   console.log(data);
    // }

    this.setState({
      dataImg:data,
      imgMain:data[0]
    });
  }

    render() {
      const {imgMain} =this.state;
      const LinkImg =this.checkProducts();
      // const linkImgMain = this.checkImageMain();
      const LinkImgLarge = `/images/upload/${this.state.dataImg}`;
      const LinkImgSmall = `/images/upload/small/${imgMain?imgMain:null}`;

        return (
<div className="img-products-zoom">
<div className="img-main-one" style={{
      display: "flex",
      alignItems: "center",
      height: "500px",
      justifyContent: "center",
}}>
{/* <ReactImageMagnify {...{
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
}} /> */}
<div style={{
  display: "flex",
    alignItems: "center",
    height: "100%"}}>
<img style={{maxHeight:"100%"}} src={LinkImgSmall} className="img-responsive" />
</div>

</div>

  <OwlCarousel options={options} >
    {LinkImg}
  </OwlCarousel>
</div>

        );
    }
}

export default ImgProductsDetailsLeft;
