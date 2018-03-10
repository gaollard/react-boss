import React, {Component} from 'react'
import {List, Button, InputItem, Toast, WingBlank, NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import './index.css'

@connect(state => state, {})
export default class Update extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      nickname: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const user = this.props.user;
    this.setState({
      mobile: user.mobile,
      nickname: user.nickname
    })
  }

  onChange(key, value) {
    this.setState({[key]: value});
  }

  render() {
    return (
      <div className="cmp-update">
        <div className="mi-header">
          <NavBar
            icon={<Icon type="left"/>}
            onLeftClick={() => {
              this.props.history.goBack()
            }}
          >修改信息</NavBar>
        </div>
        <List className="form-wrap">
          <InputItem
            focus
            type="phone"
            placeholder="手机号码"
            onChange={(v) => this.onChange('mobile', v)}
            value={this.state.mobile}
          />
          <InputItem
            type="text"
            placeholder="用户昵称"
            onChange={(v) => this.onChange('nickname', v)}
            value={this.state.nickname}
          />
        </List>
        <WingBlank>
          <Button className="btn-submit" type="primary">提交</Button>
        </WingBlank>
      </div>
    );
  }
}