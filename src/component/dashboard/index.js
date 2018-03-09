import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {NavBar} from 'antd-mobile';

import TabBar from '../tabbar'
import Me from '../../container/me/index'
import Msg from '../../container/msg/index'
import Boss from '../../container/boss/index'
import Genius from '../../container/genius/index'

import './index.css'

@withRouter
@connect(state => state, {})
export default class Dashboard extends Component {
  render() {
    const user = this.props.user;
    let pathname = this.props.location.pathname;
    const navList = [{
      path: '/boss',
      text: 'Boss',
      icon: 'boss',
      component: Boss,
      hide: user.type === 'boss'
    }, {
      path: '/genius',
      text: '牛人',
      icon: 'genius',
      component: Genius,
      hide: user.type === 'genius'
    }, {
      path: '/msg',
      text: '消息',
      icon: 'msg',
      component: Msg
    }, {
      path: '/me',
      text: '我的',
      icon: 'me',
      component: Me
    }];
    if (pathname !== '/') {
      return (
        <div className="page-wrap">
          {/*<div className="mi-header">*/}
            {/*/!*<NavBar>{navList.find(v => v.path === pathname).text}</NavBar>*!/*/}
          {/*</div>*/}
          {/*<div className="mi-content">*/}
            {<Switch>
              {navList.map(v => <Route path={v.path} component={v.component} key={v.path}/>)}
            </Switch>}
          {/*</div>*/}
          <div className="mi-footer">
            <TabBar data={navList}/>
          </div>
        </div>
      )
    } else {
      return <Redirect to="/me"/>
    }
  }
}