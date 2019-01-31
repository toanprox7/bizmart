import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {tokenAuthorization} from "app/utils"
class ConstantBannerLeft extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  componentDidMount = () => {
    axios.post("/banner/list",{category_banner:"2"},{
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
          <div className="banner-left">
           {this.state.record && this.state.record.length > 0?this.state.record.map((record,index) =>(
            <div key={index} className="banner-left-1">
              <Link to={record.link}>
                <img className="img-responsive" src={`/images/upload/${record.image}`} alt="banner" />
              </Link>
            </div>
           )):null}
            
          </div>
        
        );
    }
}

export default ConstantBannerLeft;