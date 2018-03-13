import React, {Component} from 'react'
import {NavBar, ListView, List, Badge} from 'antd-mobile'
import {connect} from 'react-redux'
import {loadBosses} from "../../redux/boss.redux"
import {host} from "../../config/index"
import './index.css'

const Item = List.Item;
const Brief = Item.Brief;

const getLast = (arr = []) => {
  return arr[arr.length - 1];
};

@connect(state => state, {loadBosses})
export default class Msg extends Component {

  componentDidMount() {
    const userList = this.props.boss.list;
    if (!userList.length) {
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
      <div className="cmp-bosses">
        <div className="mi-header">
          <NavBar>Boss</NavBar>
        </div>
        <div className="mi-content">{
          chatList.map((v, index) => {
            const last = getLast(v);
            const unread = v.filter(v => v.to === user._id && !v.read);
            return (
              <Item
                key={index}
                arrow="horizontal"
                thumb={host + 'uploads/' + user.avatar}
                extra={unread.length}
                onClick={() => history.push(`/chat/${last.from}`)}
              >
                <div className="user-name">{user.nickname}</div>
                <Brief>{last.content}</Brief>
              </Item>
            )
          })
        }</div>
      </div>
    )
  }
}