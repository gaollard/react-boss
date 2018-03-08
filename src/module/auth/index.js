import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { login } from '../../redux/user.redux'

@withRouter
@connect(
  state => state,
  { login }
)
export default class Auth extends React.Component {
  componentDidMount () {
    // const curUri = this.props.history.location.pathname;
    // const paths = ['/login', '/register'];
    // if (paths.indexOf(curUri) > -1) {
    //   return null;
    // }
    axios.get('/user/info').then(res => {
      if (res.ret === '0') {
        this.props.loadData(res.data);
      } else {
        this.props.history.push('/login')
      }
    })
  }
  render () {
    return null
  }
}