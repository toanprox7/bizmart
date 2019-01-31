import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ItemProductsMyself from './ItemSpendMyself'
import axios from 'axios'
import jwt from "jsonwebtoken";
var tokenAuthorization = jwt.sign({ admin: 'bizmart' }, 'toanpro');
class ListSpendMyself extends Component {
  constructor(props) {
     super(props);
      this.state={ }
     }
componentDidMount() {
    var self=this; axios.post('/productsapi/find',{ limit:6, sort:'createdAt DESC', status:'active', total_star:{ '>=': 4 } },{
      headers: {
        'authorization':tokenAuthorization,
      }
    }).then(res => { self.setState({ data:res.data }) }).catch(err => console.log(err));
    }
render() {
    return (
    <div className="center-products-right">
    <div className="row">
  {this.state.data && this.state.data != null?this.state.data.map((item,index) => {
    return <ItemProductsMyself key={index} data={item} />
  }):null}
</div>
</div> );
} }
export default ListSpendMyself;
