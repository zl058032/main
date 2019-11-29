import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import fetch from '../../utils/fetch';
import QUERYS from '../querys';
import I18N from './i18n';

const { $ } = window;

const sendSms = data => fetch.post(QUERYS.SEND_SMS, data);
const sendResetSms = data => fetch.post(QUERYS.SEND_FORGET_SMS, data);
const bindPhone = data => fetch.private.post(QUERYS.BIND_PHONE, data);
const signup = data => fetch.post(QUERYS.SIGNUP, data);
const resetPassword = data => fetch.post(QUERYS.RESET_PASSWORD, data);
const queryBanners = () => fetch.get(QUERYS.QUERY_BANNERS);
const queryRemoteConfig = () => new Promise((resolve) => {
  $.get('http://assets.zjzsxhy.com/other/main_data.json?_=' + new Date().getTime()).done((data) => {
    resolve(data);
  });
});

window.locale = window.localStorage.getItem('MAIN_LOCAL') || 'zh-tw';
window.i18n = I18N[window.locale];

const pathConfigs = {
  '/': {
    header: {
      hide: true,
    },
    footer: {
      activeNav: 0,
    },
    refresh: [{
      type: 'account/queryMy',
    }, {
      type: 'account/queryAccount',
    }, {
      type: 'market/queryMarket',
    }, {
      type: 'queryBanners',
    }, {
      type: 'notice/queryNotices',
    }, {
      type: 'account/queryAcitivies',
    }, {
      type: 'account/queryAcitiviesYesterday',
    }],
  },
  '/power': {
    header: {
      title: 'header_power',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'account/queryMy',
    }, {
      type: 'account/queryAccount',
    }, {
      type: 'account/queryAcitiviesInvite',
    }, {
      type: 'account/querySubUser',
    }],
  },
  '/buy': {
    header: {
      title: 'header_buy',
    },
    footer: {
      activeNav: 1,
    },
    refresh: [{
      type: 'product/queryProducts',
    }, {
      type: 'account/queryAccount',
    }, {
      type: 'account/queryOrders',
    }],
  },
  '/wallet': {
    header: {
      title: 'header_wallet',
    },
    footer: {
      activeNav: 3,
    },
    refresh: [{
      type: 'account/queryMy',
    }, {
      type: 'account/queryAccount',
    }, {
      type: 'market/queryMarket',
    }, {
      type: 'market/queryHome',
    }],
  },
  '/me': {
    header: {
      hide: true,
    },
    footer: {
      activeNav: 4,
    },
    refresh: [{
      type: 'account/queryMy',
    }],
  },
  '/notice': {
    header: {
      title: 'header_notice',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'notice/queryNotices',
    }],
  },
  '/activities': {
    header: {
      title: 'header_activities',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'account/queryAcitiviesDone',
      payload: 1,
    }],
  },
  '/invite': {
    header: {
      title: 'header_invite',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'account/queryMy',
    }],
  },
  '/miners': {
    header: {
      title: 'header_miners',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'account/queryAcitiviesAll',
    }, {
      type: 'account/queryAcitiviesTotal',
    }],
  },
  '/subuser': {
    header: {
      title: 'header_subuser',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'account/querySubUser',
    }],
  },
  '/deposit/:currency': {
    header: {
      title: 'header_deposit/:currency',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'account/queryMy',
    }],
  },
  '/withdraw/:currency': {
    header: {
      title: 'header_withdraw/:currency',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'account/queryAccount',
    }, {
      type: 'market/queryHome',
    }],
  },
  '/transfer/:currency': {
    header: {
      title: 'header_transfer/:currency',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'account/queryAccount',
    }, {
      type: 'market/queryHome',
    }],
  },
  '/signup': {
    header: {
      title: 'header_signup',
      icon: {
        left: 'back',
      },
    },
  },
  '/login': {
    header: {
      title: 'header_login',
    },
  },
  '/forgetPassword': {
    header: {
      title: 'header_forgetPassword',
      icon: {
        left: 'back',
      },
    },
  },
  '/post/:id': {
    header: {
      title: 'header_post/:id',
      icon: {
        left: 'back',
      },
    },
  },
  '/orders': {
    header: {
      title: 'header_orders',
      icon: {
        left: 'back',
      },
    },
    refresh: [{
      type: 'account/queryOrders',
    }],
  },
  '/changePassword': {
    header: {
      title: 'header_changePassword',
      icon: {
        left: 'back',
      },
    },
  },
  '/changeWithdrawPassword': {
    header: {
      title: 'header_changeWithdrawPassword',
      icon: {
        left: 'back',
      },
    },
  },
  '/phone': {
    header: {
      title: 'header_phone',
      icon: {
        left: 'back',
      },
    },
  },
};

export default {
  namespace: 'utils',
  state: {
    forceUpdate: new Date().getTime(),
    history: null,
    currentPath: '',
    currentPathConfig: {},
    loading: null,
    needUpgrade: null,
    coverHeaderTitle: null,
    banners: [],
    locale: window.locale,
    i18n: window.i18n,

    //
    serverEmail: window.localStorage.getItem('MAIN_SERVER_EMAIL') || '獲取中',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'updateState',
        payload: {
          history,
        },
      });
      dispatch({
        type: 'queryRemoteConfig',
      });
      history.listen(({ pathname }) => {
        const c = Object.keys(pathConfigs).find(key => pathToRegexp(key).exec(pathname));
        dispatch({
          type: 'updateState',
          payload: {
            currentPath: pathname,
            currentPathConfig: pathConfigs[c] || {},
            coverHeaderTitle: null,
          },
        });
        dispatch({
          type: 'refreshPage',
          pathname,
        });
        // const test = pathToRegexp(router.test).exec(pathname);
        // if (test) {
        //   dispatch({
        //     type: 'updateState',
        //   });
        // }
      });
    },
  },
  effects: {
    * goBack(_, { select }) {
      const history = yield select(({ utils }) => utils.history);
      history.goBack();
    },
    * goto({ goto }, { select, put }) {
      const history = yield select(({ utils }) => utils.history);
      if (history.location.pathname === goto) return;
      yield put(routerRedux.push(goto));
    },
    * loading({ loading }, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          loading,
        },
      });
    },
    * sendSms({ payload, onSuccess }, { call, put }) {
      yield put({
        type: 'utils/loading',
        loading: {
          text: '發送中',
        },
      });
      const data = yield call(sendSms, payload);
      if (data.success) {
        message.success('已發送，請查看手機');
        if (onSuccess) onSuccess();
      }
      yield put({
        type: 'utils/loading',
        loading: null,
      });
    },
    * sendResetSms({ payload, onSuccess }, { call, put }) {
      yield put({
        type: 'utils/loading',
        loading: {
          text: '發送中',
        },
      });
      const data = yield call(sendResetSms, payload);
      if (data.success) {
        message.success('已發送，請查看手機');
        if (onSuccess) onSuccess();
      }
      yield put({
        type: 'utils/loading',
        loading: null,
      });
    },
    * signup({ payload }, { call, put }) {
      yield put({
        type: 'utils/loading',
        loading: {
          text: '註冊中',
        },
      });
      const data = yield call(signup, payload);
      if (data.success) {
        message.success('註冊成功，請登錄');
        yield put({
          type: 'utils/goto',
          goto: '/login',
        });
      }
      yield put({
        type: 'utils/loading',
        loading: null,
      });
    },
    * resetPassword({ payload }, { call, put }) {
      const data = yield call(resetPassword, payload);
      if (data.success) {
        message.success('重置密碼成功，請登錄');
        yield put({
          type: 'utils/goto',
          goto: '/login',
        });
      }
    },
    * refreshPage({ pathname, onSuccess }, { select, put }) {
      let p = pathname;
      if (!p) {
        p = yield select(({ utils }) => utils.currentPath);
      }
      const pathes = Object.keys(pathConfigs);
      for (let i = 0; i < pathes.length; i += 1) {
        const path = pathes[i];
        const test = pathToRegexp(path).exec(p);
        if (test) {
          const config = pathConfigs[path];
          if (!config) return;
          const { refresh } = config;
          if (refresh) {
            for (let j = 0; j < refresh.length; j += 1) {
              const params = refresh[j];
              yield put(params);
            }
          }
        }
      }
      if (onSuccess) onSuccess();
    },
    * queryBanners(_, { call, put }) {
      const data = yield call(queryBanners);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            banners: data.data,
          },
        });
      }
    },
    * changeLocale({ payload }, { select, put }) {
      const origin = yield select(({ utils }) => utils.locale);
      if (origin === payload) return;
      const i18n = I18N[payload];
      if (i18n) {
        // 一些全局變量以及LocalStorage
        window.locale = payload;
        window.i18n = i18n;
        window.localStorage.setItem('MAIN_LOCAL', payload);
        yield put({
          type: 'updateState',
          payload: {
            i18n,
            locale: payload,
            forceUpdate: new Date().getTime(),
          },
        });
      }
    },
    * queryRemoteConfig(_, { call, put }) {
      const data = yield call(queryRemoteConfig);
      Object.keys(data).forEach((key) => {
        window.localStorage.setItem(key, data[key]);
      });

      yield put({
        type: 'updateState',
        payload: {
          serverEmail: window.localStorage.getItem('MAIN_SERVER_EMAIL'),
        },
      });
    },
    * bindPhone({ payload }, { call, put }) {
      const data = yield call(bindPhone, payload);

      if (data.success) {
        message.success('綁定成功');
        yield put({
          type: 'goto',
          goto: '/me',
        });
      }
    },
  },
  reducers: {
    updateCurrentPathName(state, { pathname, history }) {
      return { ...state, pathname, history };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
