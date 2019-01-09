import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import "./styles/navOwl.css";
import ItemProductsHot from './ItemProductsHot';
import axios from 'axios';
const options = {
    margin:10,
    loop:false,
    dots:false,
    nav:true,
    responsive:{
      0:{
          items:1
      },
      550:{
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
class ListProductsHot extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
componentDidMount() {
  var self=this;
axios.post('/productsapi/find',{
limit:10,
sort:'createdAt DESC',
status:'active',
level:2
}).then(res => {
self.setState({
data:res.data
})
}).catch(err => console.log(err));
}

    render() {
      // console.log(this.state.data,"data");
        return (
            <React.Fragment>
            <OwlCarousel ref="car" options={options} >


           {this.state.data && this.state.data.length > 0?this.state.data.map((item,index) => {

 return <ItemProductsHot key={index} data={item} />

           }):null}
            </OwlCarousel>
           </React.Fragment>
        );
    }
}

export default ListProductsHot;
