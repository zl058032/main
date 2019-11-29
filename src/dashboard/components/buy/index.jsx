/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import Decimal from 'decimal.js-light';
import { connect } from 'dva';
import { Spin, Input, Checkbox, Radio } from 'antd';
import { Link } from 'dva/router';
import message from '../../../utils/message';
import FormattedMessage, { t } from '../common/formattedMessage';

import './style.scss';


import buyUsdtImg from '../../../assets/usdt-x.png';
import ltcImg from '../../../assets/ltc-x.png';
import btcImg from '../../../assets/btc-x.png';
import jiweiImg from '../../../assets/position.jpg';
import order from '../order';

const icons = {
  btc: btcImg,
  ltc: ltcImg,
};

// images
// import blockHeightImg from '../../../assets/block_height.svg';

class Buy extends Component {
  state = {
    selected: undefined,
    showOrder: false,
    use: 'main',
    form: {},
    checked: false,
    showTip: false,
  }

  getItemList(list) {
    const { use } = this.state;
    const canBuy = this.props.list.can_buy;

    return list.map(product => (
      <div className="item shadow-pad" key={product.id}>
        <div className="logo">
          <span>{product.vip_level.toUpperCase()}</span>
        </div>
        <div className="center">
          <div className="txid">{use === 'main' ? product.price : product.usdt_price} {use.toUpperCase()}</div>
          <div className="time">{t('buy_item_ranking')}{product.ranking}</div>
        </div>
        <div className="amount">
          {canBuy ? (
            <div className="select-btn" onClick={() => this.handleShowOrder(product)}>{t('buy_item_buy')}</div>
          ) : (
            <div className="select-btn disabled">{t('buy_item_no_buy')}</div>
          )}
          <div className="remain">{t('buy_item_remain')}{product.rate} / d</div>
        </div>
      </div>
    ));
  }

  handleShowOrder = (selected) => {
    this.setState({
      selected,
      showOrder: true,
    });
  }

  handleCloseModal = (e) => {
    if (e.currentTarget === e.target) {
      this.setState({
        showOrder: false,
      });
    }
  }

  handleCloseTipModal = (e) => {
    if (e.currentTarget === e.target) {
      this.setState({
        showTip: false,
      });
    }
  }

  handleSubmitOrder = () => {
    const { selected, submitting, checked, use } = this.state;
    const { dispatch } = this.props;

    if (submitting) return;
    if (!checked) {
      message.error(t('buy_e_1'));
      return;
    }

    this.setState({
      submitting: true,
    });

    dispatch({
      type: 'product/buy',
      payload: {
        product_id: selected.id,
        currency: use.toUpperCase(),
      },
      onSuccess: () => {
        message.success(t('buy_s_1'));
        this.setState({
          submitting: false,
          showOrder: false,
        });
        dispatch({
          type: 'utils/refreshPage',
        });
      },
      onFail: () => {
        this.setState({
          submitting: false,
        });
      },
    });
  }

  handleCheckChange = (e) => {
    this.setState({
      checked: e.target.checked,
    });
  };

  handleProductCountChange(product, e) {
    const { form } = this.state;
    const { value } = e.target;
    const reg = /^[0-9]+$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
      this.setState({
        form: {
          ...form,
          [product.id]: {
            product,
            count: value,
          },
        },
      });
    }
  }

  handleProductCountClick(product, number) {
    const { form } = this.state;
    const value = form[product.id];
    if (!value) {
      this.setState({
        form: {
          ...form,
          [product.id]: {
            product,
            count: '1',
          },
        },
      });
    } else {
      const newCount = Math.max(parseInt(value.count, 10) + number, 0);
      this.setState({
        form: {
          ...form,
          [product.id]: {
            product,
            count: newCount.toString(),
          },
        },
      });
    }
  }

  render() {
    const { list, myMiner } = this.props;
    const {
      showOrder, selected, submitting, checked, showTip, use,
    } = this.state;
    console.log(list);


    return (
      <div id="buy" className="container">
        {/* <div className="item balance shadow-pad">
          <img className="logo" src={buyUsdtImg} alt="" />
          <div className="center">
            <div className="txid">{accountInfo.usdt_balance} <span>USDT</span></div>
            <div className="time">可用金额</div>
          </div>
          <div className="amount">
            <Link to="/deposit/usdt" className="buy-btn">去充值</Link>
          </div>
        </div> */}

        {myMiner && (
          <>
            <div className="my-miner" key={myMiner.id}>
              <div className="card">
                <div className="head">
                  <div className="title">
                    <div>{t('buy_my_title')}</div>
                    <div className="state">{myMiner.price} MAIN</div>
                  </div>
                  <div className="logo">
                    <span>{myMiner.vip_level.toUpperCase()}</span>
                  </div>
                </div>
                {myMiner.state === 'pending' && (
                  <div className="center">
                    <div className="time">{t('buy_my_ranking')}{myMiner.ranking}</div>
                    <div className="state">{t(`buy_state_${myMiner.state}`)}</div>
                  </div>
                )}
                {myMiner.state === 'allowed' && (
                  <div className="center">
                    <div className="time">{t('buy_my_total')}{myMiner.price * 2} MAIN</div>
                    <div className="state">{t(`buy_state_${myMiner.state}`)}</div>
                  </div>
                )}
                <div className="amount"></div>
              </div>
            </div>
          </>
        )}
        <div className="product-group-title">
          {t('buy_list_title')}
          <Radio.Group value={use} size="small" onChange={e => this.setState({ use: e.target.value })}>
            <Radio.Button value="main">MAIN</Radio.Button>
            <Radio.Button value="usdt">USDT</Radio.Button>
          </Radio.Group>
        </div>
        {list.products && this.getItemList(list.products)}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link to="/orders">{t('buy_more')}</Link>
        </div>
        {/* <div className="product-group-title">租赁算力包（无忧挖矿，到期押金全退）</div> */}
        {/* {list.reservation_buy_products && this.getItemList(list.reservation_buy_products)} */}
        {/* <div className="product-group-title">购买算力包</div>
        {list.buy_products && this.getItemList(list.buy_products)}
        <div className="product-group-title">矿场机位（限时预约，付款后30天后开始产生收益）</div>
        {list.buy_position_products && this.getItemList(list.buy_position_products, jiweiImg)} */}
        {/* <div className="product-group-title">理财套餐包（稳定理财，到期押金全退）</div>
        {list.monthly_1_products && this.getItemList(list.monthly_1_products)}
        {list.monthly_2_products && this.getItemList(list.monthly_2_products)} */}

        {/* {list.buy_position_products && this.getItemList(list.buy_position_products, jiweiImg)} */}
        {/* <div className="footer">
          <div className="info-container">
            <div className="info">
              <div className="cost">合计：{orderCost} USDT</div>
            </div>
          </div>
          <div className="btn-container">
            <div className="btn" onClick={this.handleShowOrder}>确认订单</div>
          </div>
        </div> */}
        {showOrder && (
          <div className="order-modal" onClick={this.handleCloseModal}>
            <div className="order-container">
              <div className="item shadow-pad">
                <div className="logo">
                  <span>{selected.vip_level.toUpperCase()}</span>
                </div>
                <div className="center">
                  <div className="txid">{use === 'main' ? selected.price : selected.usdt_price} {use.toUpperCase()}</div>
                  <div className="time">{t('buy_order_ranking')}{selected.ranking}</div>
                </div>
                <div className="amount check">X 1</div>
              </div>
              <div className="check"><Checkbox onChange={this.handleCheckChange} checked={checked}>{t('buy_order_check')}</Checkbox><a onClick={() => this.setState({ showTip: true })}>{t('buy_order_check2')}</a></div>
              <div className="submit" onClick={this.handleSubmitOrder}>
                {submitting ? (
                  <Spin />
                ) : (
                  t('buy_order_submit')
                )}
              </div>
            </div>
          </div>
        )}
        {showTip && (
          <div className="order-modal" onClick={this.handleCloseTipModal}>
            <div className="order-container">
              <div className="tip">
                <p>您正在进行的是由MainChain提供数字货币相关的云算力理财服务。MainChain在此就云计算服务活动的风险及禁止性行为向您提示如下：
                  <ol>
                    <li>数字货币相关的云算力服务是您与MainChain平台约定的且通过MainChain平台展示的云算力服务，参考年回报率不代表您最终实际取得的利息或回报。
                      <ol>
                        <li>购买客户存在不能够按期收回本金的风险，MainChain不对购买算力客户的本金收回及可获利息或回报金额作出任何承诺、保证。</li>
                        <li>机位购买客户MainChain保证您本金及回报利润的稳定性。</li>
                      </ol>
                    </li>
                    <li>您作为被服务人，不得从事以下行为或存在以下情形：
                      <ol>
                        <li>向平台提供不真实、不准确、不完整的信息；</li>
                        <li>使用非法资金或非自有资金购买服务；</li>
                        <li>不具备与进行数字货币相关的云计算服务相适应的风险认知和承受能力，购买或投资于与自身风险承受能力不匹配的项目；</li>
                        <li>其他云算力服务合同及有关协议约定的禁止性行为。</li>
                      </ol>
                    </li>
                    <li>您确认已经知悉数字货币相关的云计算服务的风险，保证不存在从事云算力服务活动的禁止性行为，承诺具备与参与云算力服务相适应的风险意识、风险识别能力、拥有非保本类金融产品的投资经历并熟悉互联网，承诺自行承担投资产生的本息损失。</li>
                    <li>客户应了解并接受，如因自然灾害（洪水、泥石流、地震、飓风等）、政策影响（国家发布文件等）、战争、政治动荡等不可抗力造成的停电、矿场及矿机损坏，本合同自动终止，双方不得相互追究违约责任，租赁客户本金足额退还，购买客户MainChain可协助客户处理后续问题，但不承担任何责任，由此造成的损失须自行承担。</li>
                    <li>MainChain所列产品均不涉及数字资产交易，若甲方自行参与第三方的数字资产交易，应当自行承担责任和风险。</li>
                  </ol>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ product, account }) {
  const { account: accountInfo, orders } = account;
  const { products } = product;
  const myMiner = orders.filter(o => o.state === 'pending' || o.state === 'allowed')[0];

  return {
    myMiner,
    orders,
    list: products,
    accountInfo,
  };
}

export default connect(mapStateToProps)(Buy);
