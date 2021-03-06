/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Router, Route, Switch, Redirect,
} from 'dva/router';
import { connect } from 'dva';
// import ReactPullToRefresh from 'react-pull2refresh';
import { Spin } from 'antd';
import Main from '../dashboard/layout/main'; // 主视图
import Header from '../dashboard/layout/header'; // 主视图
import Upgrade from '../dashboard/layout/upgrade'; // 主视图
import Loading from '../dashboard/layout/loading'; // 主视图
import Footer from '../dashboard/layout/footer'; // 主视图
import PullRefresh from '../dashboard/layout/pullRefresh'; // 主视图
import Login from '../dashboard/components/login';
import Signup from '../dashboard/components/signup';
import ForgetPassword from '../dashboard/components/forgetPassword';
import Index from '../dashboard/components/index';
import Power from '../dashboard/components/power';
import Buy from '../dashboard/components/buy';
import Wallet from '../dashboard/components/wallet';
import Me from '../dashboard/components/me';
import Notice from '../dashboard/components/notice';
import Activities from '../dashboard/components/activities';
import Invite from '../dashboard/components/invite';
import Miners from '../dashboard/components/miners';
import Subuser from '../dashboard/components/subuser';
import Deposit from '../dashboard/components/deposit';
import Withdraw from '../dashboard/components/withdraw';
import Post from '../dashboard/components/post';
import Order from '../dashboard/components/order';
import ChangePassword from '../dashboard/components/changePassword';
import ChangeWithdrawPassword from '../dashboard/components/changeWithdrawPassword';
// import About from '../dashboard/components/about';
import Transfer from '../dashboard/components/transfer';
import Phone from '../dashboard/components/phone';
// import NoMatchPage from '../dashboard/components/noMatchPage';

function AnimeRoute({ component: C, ...rest }) {
  const render = ({ match, ...restProps }) => <Main match={match}><C {...restProps} match={match} /></Main>;
  return (
    <Route {...rest}>
      {render}
    </Route>
  );
}

class MyRouter extends Component {
  handleRefresh = (resolve) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/refreshPage',
      onSuccess: resolve,
    });
  }

  render() {
    const { props } = this;

    return (
      <Router {...props}>
        <div id="app">
          <Header />
          <PullRefresh onRefresh={this.handleRefresh} />
          <AnimeRoute path="/login" exact component={Login} />
          <AnimeRoute path="/signup" exact component={Signup} />
          <AnimeRoute path="/forgetPassword" exact component={ForgetPassword} />
          <AnimeRoute path="/" exact component={Index} />
          <AnimeRoute path="/power" exact component={Power} />
          <AnimeRoute path="/buy" exact component={Buy} />
          <AnimeRoute path="/wallet" exact component={Wallet} />
          <AnimeRoute path="/me" exact component={Me} />
          <AnimeRoute path="/notice" exact component={Notice} />
          <AnimeRoute path="/activities" exact component={Activities} />
          <AnimeRoute path="/invite" exact component={Invite} />
          <AnimeRoute path="/miners" exact component={Miners} />
          <AnimeRoute path="/subuser" exact component={Subuser} />
          <AnimeRoute path="/deposit/:currency" exact component={Deposit} />
          <AnimeRoute path="/withdraw/:currency" exact component={Withdraw} />
          <AnimeRoute path="/transfer/:currency" exact component={Transfer} />
          <AnimeRoute path="/post/:id" exact component={Post} />
          <AnimeRoute path="/orders" exact component={Order} />
          <AnimeRoute path="/changePassword" exact component={ChangePassword} />
          <AnimeRoute path="/changeWithdrawPassword" exact component={ChangeWithdrawPassword} />
          <AnimeRoute path="/phone" exact component={Phone} />
          {/* <AnimeRoute path="/about" exact component={About} /> */}
          {/* <Route component={NoMatchPage} /> */}
          <Footer />
          <Upgrade />
          <Loading />
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ account }) {
  const { userInfo } = account;

  return {
    hasPhone: userInfo.phone_number,
  };
}

const MyRouterWrapper = connect(mapStateToProps)(MyRouter);

function RouterConfig({ history }) {
  return (
    <MyRouterWrapper history={history} />
  );
}

export default RouterConfig;
