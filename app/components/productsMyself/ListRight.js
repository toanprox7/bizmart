import React, { Component } from 'react';
import ItemProductsMyselfRight from './ItemRight';
import PaginationProductsMyselfRight from './PaginationRight';
import "./styles/styles.css";
import {connect} from "react-redux";
import {tokenAuthorization} from "app/utils"
import axios from "axios";
import {checkProcess} from "../../actions/settings";
class ListProductMyselfRight extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataProducts:""
    }
  }
  componentWillMount() {
    // console.log(this.props.id)
    var price = this.props.match.params.price;
    var self=this;
    self.props.checkProcess({
      isLoading:true,
      percent:30
    });
    if(price != 0){
      let pageNumber =this.props.match.params.idPage;
      let skipStart = (pageNumber - 1) * 12;
      let getStt = price.indexOf('-');
      let start = price.slice(0,getStt);
      let end = price.slice(getStt+1,price.length);
      axios.post(`/productsapi/find`,{skip:skipStart,price:{ '>=': parseInt(start),'<=': parseInt(end) },limit:12,status:'active',sort:'createdAt DESC',total_star:{ '>=': 4 }},{
        headers: {
          'authorization':tokenAuthorization,
        }
      })
      .then(function (res) {
        // console.log(res);
        self.setState({
          dataProducts:res.data
        })
        self.props.checkProcess({
          isLoading:false,
          percent:100
        });
    }).catch(function (err) {
      console.log(err);
      self.props.checkProcess({
        isLoading:false,
        percent:100
      });
    })
    }else if(price == 0){
      let pageNumber =this.props.match.params.idPage;
      let skipStart = (pageNumber - 1) * 12;
      axios.post(`/productsapi/find`,{skip:skipStart,limit:12,status:'active',sort:'createdAt DESC',total_star:{ '>=': 4 }},{
        headers: {
          'authorization':tokenAuthorization,
        }
      })
      .then(function (res) {
        // console.log(res.data);
        self.setState({
          dataProducts:res.data
        })
        self.props.checkProcess({
          isLoading:false,
          percent:100
        });
    }).catch(function (err) {
      console.log(err);
    })
    }

  }
componentWillReceiveProps(nextProps) {
  var self=this;
  self.props.checkProcess({
    isLoading:true,
    percent:30
  });
  var price = nextProps.match.params.price;
  if(price != 0){
    let pageNumber =nextProps.match.params.idPage;
    let skipStart = (pageNumber - 1) * 12;
    let getStt = price.indexOf('-');
    let start = price.slice(0,getStt);
    let end = price.slice(getStt+1,price.length);
    axios.post(`/productsapi/find`,{skip:skipStart,price:{ '>=': parseInt(start),'<=': parseInt(end) },limit:12,status:'active',sort:'createdAt DESC',total_star:{ '>=': 4 }},{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
    .then(function (res) {
      // console.log(res);
      self.setState({
        dataProducts:res.data
      })
      self.props.checkProcess({
        isLoading:false,
        percent:100
      });
  }).catch(function (err) {
    self.props.checkProcess({
      isLoading:false,
      percent:100
    });
    console.log(err);
  })
  }else if(price == 0){
    let pageNumber =nextProps.match.params.idPage;
    let skipStart = (pageNumber - 1) * 12;
    axios.post(`/productsapi/find`,{skip:skipStart,limit:12,status:'active',sort:'createdAt DESC',total_star:{ '>=': 4 }},{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
    .then(function (res) {
      // console.log(res.data);
      self.setState({
        dataProducts:res.data
      })
      self.props.checkProcess({
        isLoading:false,
        percent:100
      });
  }).catch(function (err) {
    console.log(err);
    self.props.checkProcess({
      isLoading:false,
      percent:100
    });
  })
  }
}

checkData(){
  if(this.state.dataProducts != ""){
    return this.state.dataProducts.map((item,index) => {
      return <ItemProductsMyselfRight key={index} data={item}/>
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
            <h4>Sản Phẩm đánh giá cao</h4>
          </div>
          <div className="center-products-right">
            <div className="row">
              {this.checkData()}
            </div>
            <PaginationProductsMyselfRight
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkProcess: (data) => {
      dispatch(checkProcess(data))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListProductMyselfRight)
