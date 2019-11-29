/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Spin, Icon } from 'antd';
import AutoFontSizeDiv from '../common/autoFontSizeDiv';
import { t } from '../common/formattedMessage';
import './style.scss';

// images
import walletBaseImg from '../../../assets/wallet_base.svg';
import walletBase2Img from '../../../assets/wallet_base_2.svg';
import walletUsdtImg from '../../../assets/wallet_usdt.png';
import walletQrImg from '../../../assets/wallet_qr.svg';
import walletDepImg from '../../../assets/wallet_deposit.svg';
import walletWitImg from '../../../assets/wallet_withdraw.svg';

class Wallet extends Component {
  state = {
    use: 'usdt',
  }

  getUseWallet() {
    const { use } = this.state;
    const {
      userInfo, accountInfo, prices, block,
    } = this.props;
    const info = {
      unit: use.toUpperCase(),
      address: '',
      balance: '',
      logo: '',
      earnings: '',
      power: '',
      lock: '',
      block: null,
    };
    if (use === 'usdt') {
      info.address = userInfo.usdt_payment_address;
      info.balance = accountInfo.usdt_balance;
      info.logo = walletUsdtImg;
      info.unitValue = accountInfo.usdt_balance;
    } else if (use === 'main') {
      info.address = '';
      info.balance = accountInfo.balance;
      info.locked = accountInfo.locked;
      info.logo = walletBase2Img;
      // info.unitValue = prices[use].usdt;
      info.block = block.btc;
      info.power = accountInfo.btc_total_power;
    }
    return info;
  }

  handleGotoDeposit = () => {
    const { use } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/goto',
      goto: '/deposit/' + use,
    });
  }

  handleExperience = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/experience',
    });
  }

  handleChangeUse(use) {
    this.setState({
      use,
    });
  }

  render() {
    const { use } = this.state;
    const useWallet = this.getUseWallet();
    const { accountInfo } = this.props;

    return (
      <div id="wallet" className="container">
        <div className="top-select">
          <span>
            <span className={classnames('option', { active: use === 'usdt' })} onClick={this.handleChangeUse.bind(this, 'usdt')}>USDT</span>
            <span className={classnames('option', { active: use === 'main' })} onClick={this.handleChangeUse.bind(this, 'main')}>MAIN</span>
          </span>
        </div>
        <div className="card-container">
          <div className={classnames('card', { usdt: use === 'usdt' })}>
            <div className="top">{t('wallet_balance')}</div>
            <AutoFontSizeDiv className="amount" minFontPixels={20} maxFontPixels={48} width="100%" height="72px">{useWallet.balance}</AutoFontSizeDiv>
            {/* <div className="value">
              <span>
                {use === 'usdt' ? (
                  `${parseFloat(useWallet.balance * useWallet.unitValue).toFixed(2)} CNY`
                ) : (
                  `$ ${parseFloat(useWallet.balance * useWallet.unitValue).toFixed(2)}`
                )}
              </span>
            </div> */}
          </div>
          {use === 'main' && (
            <div className="card">
              <div className="top">{t('wallet_locked')}</div>
              <AutoFontSizeDiv className="amount" minFontPixels={20} maxFontPixels={48} width="100%" height="72px">{useWallet.locked}</AutoFontSizeDiv>
              {/* <div className="value">
                <span>
                  {use === 'usdt' ? (
                    `${parseFloat(useWallet.locked * useWallet.unitValue).toFixed(2)} CNY`
                  ) : (
                    `$ ${parseFloat(useWallet.locked * useWallet.unitValue).toFixed(2)}`
                  )}
                </span>
              </div> */}
            </div>
          )}
        </div>
        <div className="opt">
          <Link className="opt-btn" to={`/deposit/${use}`}>{t('wallet_deposit')}</Link>
          <Link className="opt-btn" to={`/withdraw/${use}`}>{t('wallet_withdraws')}</Link>
          {/* <Link className="opt-btn" to={`/transfer/${use}`}>
            转账
          </Link> */}
        </div>
        <div className="big-container">
          <Link className="big" to="/buy"><Icon type="transaction" /> <span>{t('wallet_buy')}</span></Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ account, market }) {
  const {
    userInfo, account: accountInfo,
  } = account;

  return {
    userInfo,
    accountInfo,
    block: market.block,
    prices: market.prices,
  };
}

export default connect(mapStateToProps)(Wallet);
