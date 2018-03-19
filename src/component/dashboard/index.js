import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import TabBar from '../tabbar'
import Me from '../../container/me'
import Msg from '../../container/msg'
import Boss from '../../container/boss'
import Genius from '../../container/genius'
import Position from '../../container/position'
import Companys from '../../container/companys'
import {getMsgList, receiveMsg} from '../../redux/chat.redux'
import './index.css'

@withRouter
@connect(state => state, {getMsgList, receiveMsg})
export default class Dashboard extends Component {

  componentDidMount() {
    const {chat, location, history} = this.props;
    if (!chat.msgs.length) {
      this.props.receiveMsg();
      this.props.getMsgList();
    }
  }

  render() {
    const user = this.props.user;
    const navList = [{
      path: '/position',
      text: '职位',
      icon: 'boss',
      component: Position
    }, {
      path: '/companys',
      text: '公司',
      icon: 'manage',
      component: Companys,
      hide: user.type === 'boss'
    }, {
      path: '/boss',
      text: 'Boss',
      icon: 'manage',
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
    console.log(this.props);
    return (
      <div className="page-wrap">
        {<Switch>
          {navList.map(v => <Route path={v.path} exact component={v.component} key={v.path}/>)}
          <Route component={Me}/>
        </Switch>}
        <div className="mi-footer">
          <TabBar data={navList}/>
        </div>
      </div>
    )
  }
}