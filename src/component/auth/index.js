import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'

@withRouter
@connect(state => state, { login })
export default class Auth extends React.Component {
  componentDidMount () {
    const user = this.props.user;
    const currentPath = this.props.history.location.pathname;
    const paths = ['/login', '/register'];
    if (!user.userkey && !(paths.indexOf(currentPath) > -1)) {
      console.log(2);
      return this.props.history.push('/login')
    }
    if (user.userkey && (!user.avatar || !user.nickname) && currentPath !== 'update') {
      console.log(1);
      return this.props.history.push('/update')
    }
  }
  render () {
    return null
  }
}