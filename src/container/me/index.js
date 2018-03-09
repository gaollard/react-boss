import React, {Component} from 'react'

import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'

import avatarImg from './avatar.png'
import './index.css'

@connect(state => state, {})
export default class Me extends Component {
  render() {
    console.log(this.props);
    const {user} = this.props;
    return (
      <div className="cmp-me">
        <div className="avatar-wrap">
          <img className="avatar-icon" src={avatarImg} alt=""/>
          <div className="info">
            <p className="name">{user.nickname}</p>
            <p className="position">web前端工程师</p>
          </div>
        </div>
      </div>
    )
  }
}