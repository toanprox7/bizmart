import React, { Component } from 'react';
import ListSpendMyself from './ListSpendMyself';

class SpendMyself extends Component {
    render() {
        return (
<div className="spend-myself">
  <div className="top-products-right">
    <span className="text-right"><a href="/products-myself/1/0">Xem Thêm</a></span>
    <h4>Sản Phẩm đánh giá cao</h4>
  </div>
  <ListSpendMyself/>
</div>

        );
    }
}

export default SpendMyself;
