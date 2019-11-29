/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import Decimal from 'decimal.js-light';
import { connect } from 'dva';
import message from '../../../utils/message';
import FormattedMessage, { t } from '../common/formattedMessage';

import './style.scss';

import scanImg from '../../../assets/withdraw_scan.svg';

const phoneReg = /^\d+$/;

const usernameReg = /^[0-9a-zA-Z]+$/;

let handler;

// images
class Signup extends Component {
  state = {
    phone_number: '',
    verify_code: '',
    counting: 0,
  }

  handleSubmit = () => {
    const {
      phone_number, verify_code,
    } = this.state;
    const { dispatch } = this.props;
    const payload = {
      phone_number, verify_code,
    };
    if (!phoneReg.test(phone_number)) {
      message.error(t('phone_e_1'));
      return;
    }
    // if (withdraw_password !== withdraw_password_confirmation) {
    //   message.error('提现密码不一致');
    //   return;
    // }
    // if (password === withdraw_password) {
    //   message.error('登录密码和提现密码必须不同');
    //   return;
    // }
    dispatch({
      type: 'utils/bindPhone',
      payload,
    });
  }

  handleSendSms = () => {
    const { phone_number } = this.state;
    const { dispatch } = this.props;
    if (!phoneReg.test(phone_number)) {
      message.error('phone_e_1');
      return;
    }
    dispatch({
      type: 'utils/sendSms',
      payload: {
        phone_number,
      },
      onSuccess: () => {
        this.handleCountDown(true);
      },
    });
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  canSubmit() {
    const {
      phone_number, verify_code,
    } = this.state;
    return phone_number !== ''
      && verify_code !== '';
  }

  handleCountDown(start) {
    const { counting } = this.state;
    if (start) {
      this.setState({
        counting: 60,
      });
      handler = setTimeout(this.handleCountDown.bind(this), 1000);
    } else if (counting > 0) {
      this.setState({
        counting: counting - 1,
      });
      handler = setTimeout(this.handleCountDown.bind(this), 1000);
    }
  }

  render() {
    const {
      phone_number, verify_code, counting,
    } = this.state;

    return (
      <div id="phone" className="container">
        <div className="form">
          <div className="item">
            <input type="text" placeholder={t('phone_phone_number')} value={phone_number} onChange={this.handleChange.bind(this, 'phone_number')} />
          </div>
          <div className="item verify">
            <input type="text" placeholder={t('phone_verify_code')} value={verify_code} onChange={this.handleChange.bind(this, 'verify_code')} />
            <a onClick={this.handleSendSms} disabled={counting > 0}>
              {counting > 0 ? counting : t('phone_send')}
            </a>
          </div>
        </div>
        <div className="submit">
          <button className="btn" disabled={!this.canSubmit()} onClick={this.handleSubmit}>{t('phone_submit')}</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(Signup);
