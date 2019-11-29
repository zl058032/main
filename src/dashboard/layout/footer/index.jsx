/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { t } from '../../components/common/formattedMessage';

// images
import homeImg from '../../../assets/m_home.svg';
import homeActiveImg from '../../../assets/m_home_active.svg';
import powerImg from '../../../assets/m_power.svg';
import powerActiveImg from '../../../assets/m_power_active.svg';
// import buyImg from '../../../assets/m_buy.svg';
// import buyActiveImg from '../../../assets/m_buy_active.svg';
import walletImg from '../../../assets/m_wallet.svg';
import walletActiveImg from '../../../assets/m_wallet_active.svg';
import meImg from '../../../assets/m_me.svg';
import meActiveImg from '../../../assets/m_me_active.svg';

import './style.scss';

class Footer extends Component {
  render() {
    const { config, forceUpdate } = this.props;
    const { activeNav } = config;

    return (
      <footer className={classnames({ hide: activeNav === undefined })} data-force={forceUpdate}>
        <div className={classnames('item', { active: activeNav === 0 })}>
          <Link to="/">
            <span><img src={homeActiveImg} alt="" /></span>
            <span>{t('footer_1')}</span>
          </Link>
        </div>
        <div className={classnames('item', { active: activeNav === 3 })}>
          <Link to="/wallet">
            <span><img src={walletActiveImg} alt="" /></span>
            <span>{t('footer_2')}</span>
          </Link>
        </div>
        <div className={classnames('item', { active: activeNav === 1 })}>
          <Link to="/buy">
            <span><img src={powerActiveImg} alt="" /></span>
            <span>{t('footer_3')}</span>
          </Link>
        </div>
        <div className={classnames('item', { active: activeNav === 4 })}>
          <Link to="/me">
            <span><img src={meActiveImg} alt="" /></span>
            <span>{t('footer_4')}</span>
          </Link>
        </div>
        {/* <div className={classnames('item', { active: activeNav === 2 })}>
          {activeNav === 2 ? (
            <div>
              <div className="active-container">
                <img src={buyActiveImg} alt="" />
              </div>
            </div>
          ) : (
            <Link to="/buy">
              <div>
                <img src={buyImg} alt="" />
              </div>
              <div className="name">购买</div>
            </Link>
          )}
        </div> */}
      </footer>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
    currentPath: utils.currentPath,
    config: utils.currentPathConfig.footer || {},
    forceUpdate: utils.forceUpdate,
  };
}

export default connect(mapStateToProps)(Footer);
