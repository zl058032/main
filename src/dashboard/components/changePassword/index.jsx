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
import { t } from '../common/formattedMessage';
import message from '../../../utils/message';

import scanImg from '../../../assets/withdraw_scan.svg';

const phoneReg = /^1\d{10}$/;

let handler;

// images
class ChangePassword extends Component {
  state = {
    old_password: '',
    password: '',
    password_confirmation: '',
  }

  handleSubmit = () => {
    const {
      old_password, password, password_confirmation,
    } = this.state;
    const { dispatch } = this.props;
    if (password !== password_confirmation) {
      message.error(t('changePassword_e_1'));
      return;
    }
    const payload = {
      old_password, password, password_confirmation,
    };
    dispatch({
      type: 'account/changePassword',
      payload,
    });
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  canSubmit() {
    const {
      old_password, password, password_confirmation,
    } = this.state;
    return old_password !== ''
      && password !== ''
      && password_confirmation !== '';
  }

  render() {
    const {
      old_password, password, password_confirmation,
    } = this.state;

    return (
      <div id="signup" className="container">
        <div className="form">
          <div className="item">
            <input type="password" placeholder={t('changePassword_form_old_pass')} value={old_password} onChange={this.handleChange.bind(this, 'old_password')} />
          </div>
          <div className="item">
            <input type="password" placeholder={t('changePassword_form_pass')} value={password} onChange={this.handleChange.bind(this, 'password')} />
          </div>
          <div className="item">
            <input type="password" placeholder={t('changePassword_form_pass2')} value={password_confirmation} onChange={this.handleChange.bind(this, 'password_confirmation')} />
          </div>
        </div>
        <div className="submit">
          <button className="btn" disabled={!this.canSubmit()} onClick={this.handleSubmit}>{t('changePassword_form_submit')}</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ChangePassword);
