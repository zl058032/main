/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Spin, message } from 'antd';
import { t } from '../common/formattedMessage';

import './style.scss';

import walletBaseImg from '../../../assets/logo-1.png';

class Activities extends Component {
  state = {
    page: 1,
    loading: false,
  }

  handleShowNextPage = () => {
    const { loading, page } = this.state;
    const { dispatch } = this.props;
    if (loading) return;
    this.setState({
      loading: true,
    }, () => {
      dispatch({
        type: 'account/queryAcitiviesDone',
        payload: page + 1,
        onSuccess: () => {
          this.setState({
            loading: false,
            page: page + 1,
          });
        },
      });
    });
  }

  render() {
    const { loading } = this.state;
    const { list } = this.props;

    // const list = [{
    //   id: 1,
    //   title: '挖礦獎勵',
    //   time: '2019-02-10',
    //   amount: 20,
    // }];

    return (
      <div id="myActivities" className="container">
        {list.map(item => (
          <div className="item" key={item.id}>
            <img className="logo" src={walletBaseImg} alt="" />
            <div className="center">
              <div className="txid">{item.title}</div>
              <div className="time">{item.time}</div>
            </div>
            <div className="amount">{item.amount}</div>
          </div>
        ))}
        {loading ? (
          <div className="my-loading"><Spin /></div>
        ) : (
          <div className="btn" onClick={this.handleShowNextPage}><a>{t('activities_more')}</a></div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  return {
    list: account.acitiviesDone,
  };
}

export default connect(mapStateToProps)(Activities);
