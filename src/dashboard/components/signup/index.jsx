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

const phoneReg = /^1\d{10}$/;

const usernameReg = /^[0-9a-zA-Z]+$/;

const passReg = /^[0-9a-zA-Z!@#$%^&*.]{8,20}$/;

let handler;

// images
class Signup extends Component {
  state = {
    username: '',
    // phone_number: '',
    password: '',
    password_confirmation: '',
    // withdraw_password: '',
    // withdraw_password_confirmation: '',
    invite_code: '',
    nickname: '',
    // verify_code: '',
    counting: 0,
  }

  handleSubmit = () => {
    const {
      username, phone_number, password, password_confirmation, invite_code, nickname, verify_code, withdraw_password, withdraw_password_confirmation,
    } = this.state;
    const { dispatch } = this.props;
    const payload = {
      username, phone_number, password, password_confirmation, invite_code, nickname, verify_code, withdraw_password, withdraw_password_confirmation,
    };
    if (password !== password_confirmation) {
      message.error(t('signup_e_1'));
      return;
    }
    if (!usernameReg.test(username)) {
      message.error(t('signup_e_4'));
      return;
    }
    if (!passReg.test(password)) {
      message.error(t('signup_e_5'));
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
      type: 'utils/signup',
      payload,
    });
  }

  handleSendSms = () => {
    const { phone_number } = this.state;
    const { dispatch } = this.props;
    if (!phoneReg.test(phone_number)) {
      message.error('请输入正确的手机号');
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
      phone_number, password, password_confirmation, invite_code, nickname, verify_code,
    } = this.state;
    return phone_number !== ''
      && password !== ''
      && password_confirmation !== ''
      && invite_code !== ''
      && nickname !== ''
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
      username, password, password_confirmation, invite_code, nickname, verify_code, counting, withdraw_password, withdraw_password_confirmation,
    } = this.state;

    return (
      <div id="signup" className="container">
        <div className="form">
          <div className="item">
            <input type="text" placeholder={t('signup_username')} value={username} onChange={this.handleChange.bind(this, 'username')} />
          </div>
          <div className="item">
            <input type="text" placeholder={t('signup_nickname')} value={nickname} onChange={this.handleChange.bind(this, 'nickname')} />
          </div>
          <div className="item">
            <input type="password" placeholder={t('signup_password')} value={password} onChange={this.handleChange.bind(this, 'password')} />
          </div>
          <div className="item">
            <input type="password" placeholder={t('signup_password_confirmation')} value={password_confirmation} onChange={this.handleChange.bind(this, 'password_confirmation')} />
          </div>
          {/* <div className="item">
            <input type="password" placeholder="提现密码（8-20位数字或字母）" value={withdraw_password} onChange={this.handleChange.bind(this, 'withdraw_password')} />
          </div>
          <div className="item">
            <input type="password" placeholder="确认提现密码" value={withdraw_password_confirmation} onChange={this.handleChange.bind(this, 'withdraw_password_confirmation')} />
          </div> */}
          <div className="item">
            <input type="text" placeholder={t('signup_invite_code')} value={invite_code} onChange={this.handleChange.bind(this, 'invite_code')} />
          </div>
          {/* <div className="item">
            <input type="number" placeholder="手机号码" value={phone_number} onChange={this.handleChange.bind(this, 'phone_number')} />
          </div>
          <div className="item verify">
            <input type="text" placeholder="验证码" value={verify_code} onChange={this.handleChange.bind(this, 'verify_code')} />
            <a onClick={this.handleSendSms} disabled={counting > 0}>
              {counting > 0 ? counting : '发送验证码'}
            </a>
          </div> */}
        </div>
        <div className="submit">
          <button className="btn" disabled={!this.canSubmit()} onClick={this.handleSubmit}>{t('signup_submit')}</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(Signup);
