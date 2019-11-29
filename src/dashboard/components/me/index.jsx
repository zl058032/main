/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Select } from 'antd';
import { t } from '../common/formattedMessage';

import './style.scss';

// images
import avatarImg from '../../../assets/logo-1.png';
import linkImg1 from '../../../assets/me_link_1.svg';
import linkImg2 from '../../../assets/me_link_2.svg';
import linkImg3 from '../../../assets/me_link_3.svg';
import linkImg4 from '../../../assets/me_link_4.svg';
import linkImg5 from '../../../assets/me_link_5.svg';
import linkImg6 from '../../../assets/me_link_6.svg';
import linkImg7 from '../../../assets/me_link_7.svg';
import linkImg8 from '../../../assets/me_link_8.svg';
import linkImg9 from '../../../assets/me_link_9.svg';
import linkImg10 from '../../../assets/me_link_10.svg';


class Me extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/logout',
    });
  }

  handleChangeLocale = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/changeLocale',
      payload: e,
    });
  }

  render() {
    const { userInfo, serverEmail, locale } = this.props;
    return (
      <div id="me">
        <div className="avatar-container block">
          <div className="avatar">
            <img src={avatarImg} alt="" />
          </div>
          <div className="code">{userInfo.nickname}</div>
          <Link to="/forgetPassword" className="link">
            <div className="reset-pwd">{t('retrieve_password')}</div>
          </Link>
        </div>
        <div className="link-list block">
          {/* <Link to="/changeWithdrawPassword" className="link">
            <div><span className="icon"><img src={linkImg1} alt="" /></span> <span>钱包设置</span></div>
            <div className="goto" />
          </Link> */}
          <Link to="/me" className="link">
            <div><span className="icon"><img src={linkImg9} alt="" /></span> <span>{t('me_link_9')}</span></div>
            <div className="clipboard-target highlight" data-clipboard-text={userInfo.invite_code}>{userInfo.invite_code}</div>
          </Link>
          <Link to="/changePassword" className="link">
            <div><span className="icon"><img src={linkImg2} alt="" /></span> <span>{t('me_link_2')}</span></div>
            <div className="goto" />
          </Link>
          <Link to="/phone" className="link">
            <div><span className="icon"><img src={linkImg5} alt="" /></span> <span>綁定手機</span></div>
            <div className="goto" />
          </Link>
          {/* <Link to="/about" className="link">
            <div><span className="icon"><img src={linkImg3} alt="" /></span> <span>关于我们</span></div>
            <div className="goto" />
          </Link> */}
          <Link to="/post/qa" className="link">
            <div><span className="icon"><img src={linkImg4} alt="" /></span> <span>{t('me_link_4')}</span></div>
            <div className="goto" />
          </Link>
          <Link to="/invite" className="link">
            <div><span className="icon"><img src={linkImg6} alt="" /></span> <span>{t('me_link_6')}</span></div>
            <div className="goto" />
          </Link>
          <Link to="/me" className="link">
            <div><span className="icon"><img src={linkImg8} alt="" /></span> <span>{t('me_link_8')}</span></div>
            <div className="clipboard-target" data-clipboard-text={serverEmail}>{serverEmail}</div>
          </Link>
          <Link to="/me" className="link">
            <div><span className="icon"><img src={linkImg7} alt="" /></span> <span>{t('me_link_7')}</span></div>
            <div>{__VERSION__}</div>
          </Link>
          <Link to="/me" className="link">
            <div><span className="icon"><img src={linkImg10} alt="" /></span> <span>{t('me_link_10')}</span></div>
            <div>
              <Select onChange={this.handleChangeLocale} style={{ width: 120 }} value={locale} className="lang-select">
                <Select.Option value="zh-tw">繁體中文</Select.Option>
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="ja">日本語</Select.Option>
              </Select>
            </div>
          </Link>
        </div>

        {/* <div className="link-list">
          <Link to="/invite" className="link">
            <div>邀请好友</div>
            <div className="goto" />
          </Link>
          <Link to="/miners" className="link">
            <div>矿工管理</div>
            <div className="goto" />
          </Link>
          <Link to="/subuser" className="link">
            <div>我的矿工</div>
            <div className="goto" />
          </Link>
        </div> */}
        <div className="logout block">
          <a onClick={this.handleLogout}>{t('me_logout')}</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ account, utils }) {
  const { userInfo } = account;
  const { serverEmail } = utils;

  return {
    locale: utils.locale,
    userInfo,
    serverEmail,
  };
}

export default connect(mapStateToProps)(Me);
