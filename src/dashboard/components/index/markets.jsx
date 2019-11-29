/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import classnames from 'classnames';

// images
// import usdtImg from '../../../assets/usdt-x.png';
import ethImg from '../../../assets/eth.svg';
import btcImg from '../../../assets/btc.svg';
import mainImg from '../../../assets/main.svg';

export default function Markets(props) {
  const { data } = props;
  const { eth, btc, main } = data;
  return (
    <div id="markets" className="container">
      <div className="item">
        <div className="icon"><img src={mainImg} alt="" /></div>
        <div className="info">
          <div className="name">MAIN</div>
          <div className="price">
            <div className="usdt">$ {parseFloat(main.usdt).toFixed(4)}</div>
            <div className="cny">≈ {parseFloat(main.cny).toFixed(4)} CNY</div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="icon"><img src={btcImg} alt="" /></div>
        <div className="info">
          <div className="name">BTC</div>
          <div className="price">
            <div className="usdt">$ {parseFloat(btc.usdt).toFixed(4)}</div>
            <div className="cny">≈ {parseFloat(btc.cny).toFixed(4)} CNY</div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="icon"><img src={ethImg} alt="" /></div>
        <div className="info">
          <div className="name">ETH</div>
          <div className="price">
            <div className="usdt">$ {parseFloat(eth.usdt).toFixed(4)}</div>
            <div className="cny">≈ {parseFloat(eth.cny).toFixed(4)} CNY</div>
          </div>
        </div>
      </div>
    </div>
  );
}
