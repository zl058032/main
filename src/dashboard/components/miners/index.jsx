/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { t } from '../common/formattedMessage';
import './style.scss';

import walletBaseImg from '../../../assets/logo-1.png';

// images
class Invite extends Component {
  render() {
    const { list, total } = this.props;

    return (
      <div id="miners" className="container">
        <div className="banner">
          <div className="title">{t('miners_remain')}</div>
          <div className="value">{total} MAIN</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.06rem' }}>
          <Link to="/subuser">{t('miners_link')}</Link>
        </div>
        <div className="page-title">{t('miners_list_title')}</div>
        {list.map(item => (
          <div className="item shadow-pad" key={item.id}>
            <img className="logo" src={walletBaseImg} alt="" />
            <div className="center">
              <div className="txid">{item.nickname || item.description}</div>
              {item.user_id && (
                <div className="time">ID: {item.user_id}</div>
              )}
            </div>
            <div className="amount">{item.amount} MAIN</div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  const { acitiviesAll, acitiviesTotal } = account;

  return {
    list: acitiviesAll,
    total: acitiviesTotal,
  };
}
export default connect(mapStateToProps)(Invite);
