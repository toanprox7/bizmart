import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {tokenAuthorization} from "app/utils"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
class BannerMain extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  componentDidMount = () => {
    axios.post("/banner/list",{category_banner:"1"},{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
    .then(res=> {
      this.setState({
        record:res.data
      });
    })
    .catch(err => console.log(err));
  }
  
  
    render() {
        return (
          <div id="banner">
           <Carousel showThumbs={false}>
             {this.state.record && this.state.record.length > 0?this.state.record.map((record,index) =>(
              <div key={index}>
                
                <img src={`/images/upload/${record.image}`} />
                 <p className="legend">{record.title}</p>
               
                 
             </div>
             )):null}
               
               
            </Carousel>
           
          </div>
          
        );
    }
}

export default BannerMain;