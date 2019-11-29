/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Carousel, Icon, Drawer } from 'antd';
import { Link } from 'dva/router';
import Markets from './markets';
import FormattedMessage, { t } from '../common/formattedMessage';
import openWindow from '../../../utils/openWindow';

import './style.scss';

// images
// import blockHeightImg from '../../../assets/block_height.svg';
// import blockPowerImg from '../../../assets/block_power.svg';
import optBuyPowerImg from '../../../assets/opt_buy_power.svg';
import optAddPowerImg from '../../../assets/opt_add_power.svg';
import menuImg from '../../../assets/index_menu.svg';
import menu1Img from '../../../assets/index_menu_1.svg';
import menu2Img from '../../../assets/index_menu_2.svg';
import refreshImg from '../../../assets/index_refresh.svg';

import linkImg1 from '../../../assets/indexIcon/1.svg';
import linkImg2 from '../../../assets/indexIcon/2.svg';
import linkImg3 from '../../../assets/indexIcon/3.svg';
import linkImg4 from '../../../assets/indexIcon/4.svg';
import linkImg5 from '../../../assets/indexIcon/5.svg';
import linkImg6 from '../../../assets/indexIcon/6.svg';
import linkImg7 from '../../../assets/indexIcon/7.svg';
import linkImg8 from '../../../assets/indexIcon/8.svg';

function openWhitepaper() {
  openWindow('https://mainchainproject.com/whitepaper.pdf');
}


class Index extends Component {
  state = {
    use: 'main',
    point: 0,
  }

  handler = null

  componentDidMount() {
    this.handler = setInterval(this.changePoint, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.handler);
    this.handler = null;
  }

  changePoint = () => {
    const { notices } = this.props;
    const { point } = this.state;
    if (notices.length === 0) return;
    this.setState({
      point: (point + 1) % notices.length,
    });
  }

  getUseWallet = () => {
    const { account, acitiviesYesterday } = this.props;
    const { use } = this.state;
    if (use === 'main') {
      return {
        name: 'MAIN',
        yesterday: acitiviesYesterday,
      };
    }
    return {
      name: 'LTC',
      yesterday: account.ltc_yesterday_earnings,
      total: account.ltc_total_earnings,
    };
  }

  handleClickNotice = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/goto',
      goto: '/notice',
    });
    // const notice = this.props.notices[this.state.point];
    // if (notice.url) {
    //   if (window.cordova) {
    //     window.cordova.InAppBrowser.open(notice.url, '_system', 'location=yes');
    //   }
    // }
  }

  handleAutoReceive = () => {
    const { autoReceive, dispatch } = this.props;
    dispatch({
      type: 'account/changeAutoReceive',
      payload: !autoReceive,
    });
  }

  handleRedirect(goto) {
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/goto',
      goto,
    });
  }

  handleChangeUse(use) {
    this.setState({
      use,
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
    const {
      prices, banners, notices,
    } = this.props;
    const { use, point } = this.state;
    const useWallet = this.getUseWallet();

    return (
      <div id="home">
        <div id="banners">
          <Carousel autoplay>
            {banners.map((banner, i) => (
              <div className="banner" key={i}>
                <div style={{ backgroundImage: `url(${banner.image})` }} />
              </div>
            ))}
          </Carousel>
        </div>
        {notices.length > 0 && (
          <div className="notice shadow-pad" onClick={this.handleClickNotice}><Icon type="notification" /> {notices[point].title}</div>
        )}
        <div className="pad shadow-pad">
          <div className="pad-header">
            <div className="name">{t('index_yesterday')}</div>
            <div className="top-select">
              <span>
                <span className={classnames('option', { active: use === 'main' })} onClick={this.handleChangeUse.bind(this, 'main')}>MAIN</span>
              </span>
            </div>
          </div>
          <div className="earn" onClick={this.handleRedirect.bind(this, '/activities')}>
            <div className="yesterday">{useWallet.yesterday}</div>
            {/* <div className="total">
              <div>您在MainChain总计收获</div>
              <div>{useWallet.total} {useWallet.name}</div>
            </div> */}
          </div>
          <Link className="link" to="/activities">{t('index_activities')}</Link>
        </div>
        <div className="links-row">
          <div className="link" onClick={openWhitepaper}>
            <div className="img-container"><img src={linkImg1} alt="" /></div>
            <div>{t('index_icon_1')}</div>
          </div>
          <div className="link" onClick={() => this.setState({ comingsoon: true })}>
            <div className="img-container"><img src={linkImg2} alt="" /></div>
            <div>{t('index_icon_2')}</div>
          </div>
          <div className="link" onClick={() => this.handleGoto('/notice')}>
            <div className="img-container"><img src={linkImg8} alt="" /></div>
            <div>{t('index_icon_8')}</div>
          </div>
        </div>
        <div className="links-row">
          <div className="link" onClick={() => this.setState({ comingsoon: true })}>
            <div className="img-container"><img src={linkImg7} alt="" /></div>
            <div>{t('index_icon_7')}</div>
          </div>
          <div className="link" onClick={() => this.setState({ comingsoon: true })}>
            <div className="img-container"><img src={linkImg3} alt="" /></div>
            <div>{t('index_icon_3')}</div>
          </div>
          <div className="link" onClick={() => this.handleGoto('/miners')}>
            <div className="img-container"><img src={linkImg6} alt="" /></div>
            <div>{t('index_icon_6')}</div>
          </div>
        </div>
        <Markets data={prices} />
        <Drawer
          placement="top"
          onClose={() => this.setState({ comingsoon: false })}
          closable={false}
          visible={this.state.comingsoon}
          className="coming-drawer"
          height={150}
        >
          <div>
            <div className="icon"><span><Icon type="car" /></span></div>
            <div>{t('index_coming')}</div>
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps({ market, account, utils, notice }) {
  return {
    prices: market.prices,
    block: market.block,
    banners: utils.banners,
    account: account.account,
    notices: notice.notices,
    acitiviesYesterday: account.acitiviesYesterday,
  };
}

export default connect(mapStateToProps)(Index);
