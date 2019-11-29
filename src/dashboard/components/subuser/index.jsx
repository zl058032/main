/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { t } from '../common/formattedMessage';
import './style.scss';

// images
class Subuser extends Component {
  render() {
    const { list } = this.props;
    // const list = [{
    //   vip_level: 'p1',
    //   count: 2,
    // }];

    return (
      <div id="subuser" className="container">
        {list.map(item => (
          <div className="item shadow-pad" key={item.vip_level}>
            <div className="lv">
              <span className="text">{item.vip_level.toUpperCase()}</span>
            </div>
            <div className="name">{item.nickname}</div>
            <div className="info">
              <div>{t('subuser_order_amount')}: {item.order_amount} MAIN</div>
              <div>{t('subuser_team_amount')}: {item.team_amount} MAIN</div>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', opacity: 0.6 }}>{t('subuser_empty')}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  const { subuser } = account;

  return {
    list: subuser,
  };
}
export default connect(mapStateToProps)(Subuser);
