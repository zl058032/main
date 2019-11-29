/* eslint-disable react/destructuring-assignment */
import { connect } from 'dva';
import React, { Component } from 'react';
import { Select } from 'antd';
import logoImg from '../../../assets/logo-1.png';
import message from '../../../utils/message';
import vibration from '../../../utils/vibration';
import FormattedMessage, { t } from '../common/formattedMessage';

import './style.scss';

class NormalLoginForm extends Component {
  state = {
    login: '',
    password: '',
  }

  handleChangeAccount = (e) => {
    this.setState({
      login: e.target.value,
    });
  }

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { login, password } = this.state;
    vibration(100);
    if (login.length === 0) {
      message.error(t('login_e_1'));
      return;
    }
    if (password.length === 0) {
      message.error(t('login_e_2'));
      return;
    }
    dispatch({
      type: 'account/login',
      payload: {
        login,
        password,
      },
    });
  }

  handleChangeLocale = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/changeLocale',
      payload: e,
    });
  }

  handleGoto(goto) {
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/goto',
      goto,
    });
  }

  render() {
    const { locale } = this.props;
    const { login, password } = this.state;

    return (
      <div id="login" className="container">
        <div className="logo-container"><img src={logoImg} alt="" /></div>
        <div className="form">
          <div className="item">
            <input type="text" placeholder={t('login_username')} value={login} onChange={this.handleChangeAccount} />
          </div>
          <div className="item">
            <input type="password" placeholder={t('login_password')} value={password} onChange={this.handleChangePassword} />
          </div>
        </div>
        <div className="submit">
          <button onClick={this.handleSubmit}>{t('login_submit')}</button>
        </div>
        <div className="opts">
          <div><a onClick={this.handleGoto.bind(this, '/forgetPassword')}>{t('login_forgot_pass')}</a></div>
          <div>{t('login_nopass')}<a onClick={this.handleGoto.bind(this, '/signup')}>{t('login_signup')}</a></div>
        </div>
        <div className="lang-select-container">
          <Select onChange={this.handleChangeLocale} style={{ width: 120 }} value={locale} className="lang-select" size="small">
            <Select.Option value="zh-tw">繁體中文</Select.Option>
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="ja">日本語</Select.Option>
          </Select>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
    locale: utils.locale,
  };
}

export default connect(mapStateToProps)(NormalLoginForm);
