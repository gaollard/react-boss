import React, {Component} from 'react';
import {Button, WingBlank} from 'antd-mobile';
import {List, InputItem} from 'antd-mobile';
import './login.css'
import LogoImg from '@src/asset/img/logo.png'

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      pwd: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (key, value) {
    this.setState({[key]: value})
  }

  render() {
    return (
      <div className="page-login">
        <img className="logo" src={ LogoImg } alt="BOSS直聘"/>
        <div className="login-form">
          <List>
            <InputItem
              clear
              type="phone"
              placeholder="手机号码"
              onChange={ v => this.onChange('mobile', v)}
              value={this.state.mobile}></InputItem>
            <InputItem
              clear
              type="number"
              placeholder="登录密码"
              onChange={(v) => this.onChange('pwd', v)}
              value={this.state.pwd}></InputItem>
          </List>
          <WingBlank className="btn-submit">
            <Button type="primary">登录</Button>
          </WingBlank>
        </div>
      </div>
    )
  }
}