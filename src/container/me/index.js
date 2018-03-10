import React, {Component} from 'react'
import {List, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import avatarImg from './avatar.png'
import './index.css'

@connect(state => state, {})
export default class Me extends Component {
  render() {
    const Item = List.Item;
    const {user} = this.props;
    return (
      <div className="cmp-me">
        <div className="avatar-wrap">
          <img className="avatar-icon" src={avatarImg} alt=""/>
          <div className="info">
            <p className="name">{user.nickname}</p>
            <p className="position">web前端工程师</p>
          </div>
          <div className="btn-wrap">
            <div className="btn-fill" onClick={() => {
              this.props.history.push('/update')
            }}>完善信息
            </div>
          </div>
        </div>
        <ul className="grid-list">
          <li className="grid-item">
            <i className="grid-icon iconfont icon-commodity"></i>
            <div className="grid-text">沟通</div>
          </li>
          <li className="grid-item">
            <i className="grid-icon iconfont icon-activity"></i>
            <div className="grid-text">面试</div>
          </li>
          <li className="grid-item">
            <i className="grid-icon iconfont icon-collection"></i>
            <div className="grid-text">投递</div>
          </li>
          <li className="grid-item">
            <i className="grid-icon iconfont icon-integral"></i>
            <div className="grid-text">兴趣</div>
          </li>
        </ul>
        <div className="link-list">
          <Item
            className="link-item"
            thumb={<i className="iconfont icon-activity"></i>}
            arrow="horizontal"
          >关注公司</Item>
          <Item
            className="link-item"
            thumb={<i className="iconfont icon-document"></i>}
            arrow="horizontal">求职意向</Item>
          <Item
            className="link-item"
            thumb={<i className="iconfont icon-service"></i>}
            arrow="horizontal"
          >附件简历</Item>
        </div>
      </div>
    )
  }
}