import React, { Component } from 'react';
import ItemProductsSaleRight from './ItemRight';
import PaginationProductsSaleRight from './PaginationRight';
import "./styles/styles.css";
import {connect} from "react-redux";
import axios from "axios";
class ListProductSaleRight extends Component {
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
      axios.post(`/productsapi/find`,{skip:skipStart,price:{ '>=': parseInt(start),'<=': parseInt(end) },limit:12,status:'active',sort:'createdAt DESC'})
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
      axios.post(`/productsapi/find`,{skip:skipStart,limit:12,status:'active',sort:'createdAt DESC'})
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

checkData(){
  if(this.state.dataProducts != ""){
    return this.state.dataProducts.map((item,index) => {
      return <ItemProductsSaleRight key={index} data={item}/>
    })
  }else{
    return null
  }
}

  render() {
    // console.log(this.props.dataProducts,"item");
    return (
      <div className="main-products-right">
          <div className="top-products-right">
            <h4>Sản Phẩm Giá Sốc</h4>
          </div>
          <div className="center-products-right">
            <div className="row">
              {this.checkData()}
            </div>
            <PaginationProductsSaleRight
            idPage={this.props.match.params.idPage}
            price={this.props.match.params.price}
            />
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataProducts:state.productsAllReducer
})
export default connect(mapStateToProps)(ListProductSaleRight)
