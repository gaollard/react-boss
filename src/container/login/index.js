import React, {Component} from 'react'
import {Button, WingBlank, List, InputItem} from 'antd-mobile'

import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {withRouter, Redirect} from 'react-router-dom'

import './login.css'
import LogoImg from '../../asset/img/logo.png'

@withRouter
@connect(
  state => state,
  {login}
)
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {mobile: '', pwd: ''};
    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  onChange(key, value) {
    this.setState({[key]: value})
  }

  handleLogin() {
    this.props.login(this.state);
  }

  render() {
    const {redirectUrl} = this.props.user;
    if (redirectUrl !== '' && redirectUrl !== '/login') {
      return <Redirect to={redirectUrl}/>
    }
    return (
      <div className="page-login">
        <img className="logo" src={LogoImg} alt="BOSS直聘"/>
        <div className="login-form">
          <List>
            <InputItem
              clear
              type="phone"
              placeholder="手机号码"
              onChange={v => this.onChange('mobile', v)}
              value={this.state.mobile}/>
            <InputItem
              clear
              type="number"
              placeholder="登录密码"
              onChange={(v) => this.onChange('pwd', v)}
              value={this.state.pwd}/>
          </List>
          <WingBlank className="btn-submit">
            <Button type="primary" onClick={() => this.handleLogin()}>登录</Button>
          </WingBlank>
        </div>
      </div>
    )
  }
}