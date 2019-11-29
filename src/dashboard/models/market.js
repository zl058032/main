import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import fetch from '../../utils/fetch';
import QUERYS from '../querys';
import cleanStateModel from '../../utils/cleanState';

const queryMarket = () => fetch.get(QUERYS.QUERY_MARKET);
const queryHome = () => fetch.get(QUERYS.QUERY_BLOCK);

function getPrice(data) {
  return {
    cny: data.ticker.last_cny,
    usdt: data.ticker.last_usdt,
    change: (parseFloat(data.ticker.last) - parseFloat(data.ticker.open)) / parseFloat(data.ticker.open),
  };
}

export default cleanStateModel({
  namespace: 'market',
  state: {
    prices: {
      eth: {
        cny: 0,
        usdt: 0,
      },
      btc: {
        cny: 0,
        usdt: 0,
      },
      main: {
        cny: 0,
        usdt: 0,
      },
      // usdt: {
      //   cny: 0,
      //   usdt: 0,
      // },
    },
    block: {
      height: 0,
      power: 0,
      level: 0,
    },
    fee: {
      btc: '0',
      // usdt: '0',
      eth: '0',
    },
  },
  subscriptions: {},
  effects: {
    * queryMarket(_, { call, put }) {
      const data = yield call(queryMarket);
      if (data.success) {
        const d = data.data;
        const def = { ticker: { last_cny: 0, last_usdt: 0 } };
        const btc = d.filter(t => t.name === 'BTC/USDT')[0] || def;
        const eth = d.filter(t => t.name === 'ETH/USDT')[0] || def;
        const main = d.filter(t => t.name === 'MAIN/ETH')[0] || def;
        const prices = {
          btc: {
            cny: btc.ticker.last_cny,
            usdt: btc.ticker.last_usdt,
          },
          eth: {
            cny: eth.ticker.last_cny,
            usdt: eth.ticker.last_usdt,
          },
          main: {
            cny: main.ticker.last_cny,
            usdt: main.ticker.last_usdt,
          },
          // usdt: {
          //   cny: d.usdt,
          //   usdt: 1,
          // },
        };
        yield put({
          type: 'updateState',
          payload: {
            prices,
          },
        });
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});
