import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'

@withRouter
@connect(state => state, {login})
export default class Auth extends React.Component {

  componentDidMount () {
    const {user, history} = this.props;
    const currentPath = history.location.pathname;
    const paths = ['/login', '/register'];
    // 未登录
    if(!user.userkey && currentPath !== '/login') {
      return history.push('/login')
    }
    // if (!user)
    // // 已经登录但是用户信息不完整
    // if (user.userkey && (!user.avatar || !user.nickname) && currentPath !== 'update') {
    //   return <Redirect to="/update"/>
    // }
  }
  render() {
    return null
  }
}