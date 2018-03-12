import React, {Component} from 'react'
import {NavBar, ListView, List} from 'antd-mobile'
import {connect} from 'react-redux'
import {loadBosses} from "../../redux/boss.redux"
import './index.css'

@connect(state => state, {loadBosses})
export default class Msg extends Component {

  componentDidMount() {
    const userList = this.props.boss.list;
    if (!userList.length) {
      this.props.loadBosses();
    }
  }

  render() {
    const Item = List.Item;
    const userList = this.props.boss.list;
    const msgs = this.props.chat.msgs;
    const group = {};
    msgs.forEach(i => {
      if (!group[i.chatId]) {
        group[i.chatId] = []
      }
      group[i.chatId].push(i)
    });
    return (
      <div className="cmp-bosses">
        <div className="mi-header">
          <NavBar>Boss</NavBar>
        </div>
        <div className="mi-content">{
          userList.map(v => {
            console.log(v);
            return null
            // return (
            //   {/*<Item*/}
            //     {/*key={v._id}*/}
            //     {/*onClick={() => {*/}
            //       {/*this.props.history.push(`/chat/${v._id}`)*/}
            //     {/*}}*/}
            //   {/*>*/}
            //     {/*<div className="item-hd">*/}
            //       {/*<img className="item-avatar" src={require('./avatar.jpg')}/>*/}
            //       {/*<div className="item-hd-cont">*/}
            //         {/*<div className="item-partner">*/}
            //           {/*<span className="msg-name">{v.mobile}</span>*/}
            //           {/*<span className="msg-time">2018/2/27</span>*/}
            //         {/*</div>*/}
            //         {/*<div className="msg-cont">{'我们分手吧'}</div>*/}
            //       {/*</div>*/}
            //     {/*</div>*/}
            //   {/*</Item>*/}
            // )
          })
        }</div>
      </div>
    )
  }
}