import React, { Component } from 'react';
import ListSpendMyself from './ListSpendMyself';

class SpendMyself extends Component {
    render() {
        return (
<div className="spend-myself">
  <div className="top-products-right">
    <span className="text-right"><a href="#">Xem Thêm</a></span>
    <h4>Dành riêng cho bạn</h4>
  </div>
  <ListSpendMyself/>
</div>

        );
    }
}

export default SpendMyself;