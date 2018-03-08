import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'

@withRouter
@connect(state => state, { login })
export default class Auth extends React.Component {
  render () {
    const currentPath = this.props.history.location.pathname;
    const { userkey } = this.props.user;
    const paths = ['/login', '/register'];
    if (!userkey && !(paths.indexOf(currentPath) > -1)) {
      return <Redirect to="/login"></Redirect>
    }
    return null
  }
}