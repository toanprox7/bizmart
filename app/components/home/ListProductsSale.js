import React, { Component } from 'react';
import axios from 'axios';
import ItemProductsSale from "./ItemProductsSale";
class ListProductsSale extends Component {
  constructor(props) {
    super(props);
this.state={

}
  }
  componentDidMount() {
    var self=this;
  axios.post('/productsapi/find',{
  limit:6,
  sort:'createdAt DESC',
  status:'active'
  }).then(res => {
  self.setState({
  data:res.data
  })
  }).catch(err => console.log(err));
  }



    render() {
        return (
            <div className="center-products-right">
              <div className="row">
                  {this.state.data && this.state.data != null?this.state.data.map((item,index) => {

return <ItemProductsSale key={index} data={item} />

          }):null}
              </div>
            </div>
        );
    }
}

export default ListProductsSale;
