/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import Decimal from 'decimal.js-light';
import { connect } from 'dva';
import { Spin, Input, Button, Popconfirm } from 'antd';
import { Link } from 'dva/router';
import { t } from '../common/formattedMessage';
import message from '../../../utils/message';

import './style.scss';

import minerLogo from '../../../assets/miner-logo.jpg';

// images
// import blockHeightImg from '../../../assets/block_height.svg';

const continueList = ['reservation_buy', 'rent'];

class Order extends Component {
  state = {}

  getItemList(list) {
    return list.map(product => (
      <div className="item balance shadow-pad" key={product.id}>
        <div className="logo">
          <span>{product.vip_level.toUpperCase()}</span>
        </div>
        <div className="center">
          <div className="txid">{product.price} MAIN</div>
          <div className="time">{t('order_create_time')}{product.created_at}</div>
          <div className="time">{t('order_exp_time')}{product.end_at}</div>
        </div>
        <div className="amount"></div>
      </div>
    ));
  }

  handleContinue(product) {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/continueOrder',
      payload: product.id,
    });
  }

  render() {
    const { list, orders } = this.props;

    return (
      <div id="order" className="container">
        {orders.length === 0 && (
          <div style={{ textAlign: 'center' }}>{t('order_empty')}</div>
        )}
        {this.getItemList(list)}
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  const { orders } = account;
  // const orders = [{
  //   id: 111,
  //   end_at: '2019-07-01',
  //   start_at: '2018-01-11',
  //   power: 19,
  //   price: '899.0',
  //   currency: 'BTC',
  //   can_continue: true,
  //   product_type: 'rent',
  // }];

  return {
    list: orders,
    orders,
  };
}

export default connect(mapStateToProps)(Order);
