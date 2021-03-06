import React, { Component } from 'react';
import axios from 'axios';
import ItemProductsSale from "./ItemProductsSale";
import {connect} from 'react-redux';
import {checkProcess} from '../../actions/settings';
import jwt from "jsonwebtoken";
var tokenAuthorization = jwt.sign({ admin: 'bizmart' }, 'toanpro');
class ListProductsSale extends Component {
  constructor(props) {
    super(props);
this.state={

}
  }
  componentDidMount() {
    var infoProcess = {
      isLoading:true,
      percent:30
    }
    this.props.checkProcess(infoProcess);
    var self=this;
  axios.post('/productsapi/find',{
  limit:6,
  sort:'createdAt DESC',
  status:'active'
  },{
    headers: {
      'authorization':tokenAuthorization,
    }
  }).then(res => {
  self.setState({
  data:res.data
  })
  this.props.checkProcess({
    isLoading:false,
    percent:100
  });
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkProcess: (process) => {
      dispatch(checkProcess(process))
    }
  }
}
export default connect(null, mapDispatchToProps)(ListProductsSale)