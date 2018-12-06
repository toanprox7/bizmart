import React, { Component } from 'react';

import ItemProductsSale from "./ItemProductsSale";
class ListProductsSale extends Component {
  constructor(props) {
    super(props);

  }
  getDataProducts=() =>{
    let {dataProducts} =this.props;
    if(dataProducts.length > 0){
      return dataProducts[0].map((item,index) => {
        if(index <6){
          return <ItemProductsSale key={index} data={item} />
        }else{
          return null
        }

      })

    }else{
      return null;
    }
  }
    render() {
        return (
            <div className="center-products-right">
              <div className="row">
                  {this.getDataProducts()}
              </div>
            </div>
        );
    }
}

export default ListProductsSale;
