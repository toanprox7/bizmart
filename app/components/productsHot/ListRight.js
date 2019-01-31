import React, { Component } from 'react';
import ItemProductsHotRight from './ItemRight';
import PaginationProductsHotRight from './PaginationRight';
import "./styles/styles.css";
import {connect} from "react-redux";
import axios from "axios";
import {tokenAuthorization} from "app/utils"
import {checkProcess} from "../../actions/settings";
class ListProductHotRight extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataProducts:""
    }
  }
  componentWillMount() {
    // console.log(this.props.id)
    var self=this;
    var price = this.props.match.params.price;
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
      // let self =this;
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
componentWillReceiveProps = (nextProps) => {
  // console.log(nextProps,"next props hot");
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
    let pageNumber =nextProps.match.params.idPage;
    let skipStart = (pageNumber - 1) * 12;
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
      return <ItemProductsHotRight key={index} data={item}/>
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
            <h4>Sản Phẩm Hot</h4>
          </div>
          <div className="center-products-right">
            <div className="row">
              {this.checkData()}
            </div>
            <PaginationProductsHotRight
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
export default connect(mapStateToProps,mapDispatchToProps)(ListProductHotRight)
