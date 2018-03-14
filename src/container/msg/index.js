import React, {Component} from 'react'
import {NavBar, ListView, List, Badge} from 'antd-mobile'
import {connect} from 'react-redux'
import {loadBosses} from "../../redux/boss.redux"
import {host} from "../../config/index"
import {receiveMsg, getMsgList} from '../../redux/chat.redux'
import './index.css'

const Item = List.Item;
const Brief = Item.Brief;

const getLast = (arr = []) => {
  return arr[arr.length - 1];
};

@connect(state => state, {
  loadBosses,
  receiveMsg,
  getMsgList
})
export default class Msg extends Component {

  componentDidMount() {
    const {chat, boss} = this.props;
    if (!boss.list.length) {
      this.props.loadBosses();
    }
  }

  render() {
    const {user, chat, history} = this.props;
    const msgGroup = {};
    chat.msgs.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || [];
      msgGroup[v.chatId].push(v);
    });
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = getLast(a);
      const b_last = getLast(b);
      return b_last.createTime - a_last.createTime;
    });
    return (
      <div className="cpm-msg">
        <div className="mi-header">
          <NavBar>Boss</NavBar>
        </div>
        <div className="mi-content">{
          chatList.map((v, index) => {
            const last = getLast(v);
            const unread = v.filter(v => v.to === user._id && !v.read);
            const targetId = user._id === last.from ? last.to : last.from;
            const avatar = chat.users[targetId] ? chat.users[targetId].avatar : null;
            const nickname = chat.users[targetId] ? chat.users[targetId].nickname : null;
            return (
              <Item
                key={index}
                arrow="horizontal"
                thumb={host + 'uploads/' + avatar}
                extra={unread.length}
                onClick={() => history.push(`/chat/${targetId}`)}
              >
                <div className="user-name">{nickname}</div>
                <Brief>{last.content}</Brief>
              </Item>
            )
          })
        }</div>
      </div>
    )
  }
}