import React, { Component } from 'react'
import {connect} from "react-redux";
import axios from "axios";
import ItemProductsHotRight from './ItemRight';
import {tokenAuthorization} from "app/utils"
 class ListChildRight extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataProducts:""
        }
    }
    componentWillMount() {
        // console.log(this.props.id)
        var price = this.props.match.params.price;
        if(price != 0){
          let pageNumber =this.props.match.params.idPage;
          let skipStart = (pageNumber - 1) * 12;
          let getStt = price.indexOf('-');
          let start = price.slice(0,getStt);
          let end = price.slice(getStt+1,price.length);
          let self =this;
          axios.post(`/productsapi/find`,{skip:skipStart,price:{ '>=': parseInt(start),'<=': parseInt(end) },limit:12,level:2,status:'active',sort:'createdAt DESC'},{
            headers: {
              'authorization':tokenAuthorization,
            }
          })
          .then(function (res) {
            // console.log(res);
            self.setState({
              dataProducts:res.data
            })
        }).catch(function (err) {
          console.log(err);
        })
        }else if(price == 0){
          let pageNumber =this.props.match.params.idPage;
          let skipStart = (pageNumber - 1) * 12;
          let self =this;
          axios.post(`/productsapi/find`,{skip:skipStart,limit:12,level:2,status:'active',sort:'createdAt DESC'},{
            headers: {
              'authorization':tokenAuthorization,
            }
          })
          .then(function (res) {
            // console.log(res.data);
            self.setState({
              dataProducts:res.data
            })
        }).catch(function (err) {
          console.log(err);
        })
        }
    
      }
    componentWillReceiveProps(nextProps) {
      console.log(nextProps,"test props");
    }
    
    checkData(){
      if(this.state.dataProducts != ""){
        return this.state.dataProducts.map((item,index) => {
          return <ItemProductsHotRight key={index} data={item}/>
        })
      }else{
        return null
      }
    }
  render() {
    return (
        <div className="row">
        {this.checkData()}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
    dataProducts:state.productsAllReducer
  })
export default connect(mapStateToProps)(ListChildRight)