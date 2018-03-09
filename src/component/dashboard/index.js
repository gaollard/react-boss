import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import TabBar from '../tabbar'
import Me from '../../container/me'
import Msg from '../../container/msg'
import Boss from '../../container/boss'
import Genius from '../../container/genius'
import Position from '../../container/position'
import './index.css'

function Company() {
  return <h2>Company</h2>
}

@withRouter
@connect(state => state, {})
export default class Dashboard extends Component {
  render() {
    const user = this.props.user;
    let pathname = this.props.location.pathname;
    const navList = [{
      path: '/position',
      text: '职位',
      icon: 'boss',
      component: Position
    }, {
      path: '/company',
      text: '公司',
      icon: 'manage',
      component: Company,
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
          {<Switch>
            {navList.map(v => <Route path={v.path} component={v.component} key={v.path}/>)}
          </Switch>}
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