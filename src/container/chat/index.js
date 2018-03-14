import React, {Component} from 'react'
import {NavBar, Grid, List, Icon, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {loadBosses} from "../../redux/boss.redux"
import {sendMsg, receiveMsg, getMsgList} from "../../redux/chat.redux"
import {getChatId} from '../../utils/utils'
import {host} from '../../config'

import './index.css'
import data from './data.json'

const Item = List.Item;
const emoji = data.emoji.split(' ').filter(v => v).map(text => {
  return {text}
});

@connect(state => state, {
  sendMsg,
  loadBosses,
  receiveMsg,
  getMsgList
})
export default class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isShowEmoji: false
    };
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {chat} = this.props;
    if (!chat.msgs.length) {
      this.props.receiveMsg();
      this.props.getMsgList();
    }
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  handleGoBack() {
    this.props.history.goBack();
  }

  handleSubmit() {
    const {user, match} = this.props;
    this.props.sendMsg({
      from: user._id,
      to: match.params.from,
      content: this.state.text
    });
    this.setState({text: ''});
  }

  render() {
    const {chat, user} = this.props;
    const params = this.props.match.params;
    const msgList = chat.msgs.filter(v => {
      return v.chatId === getChatId(user._id, params.from)
    });
    const partner = chat.users[params.from];
    return (
      <div className="cmp-chat">
        <div className="mi-header">
          <NavBar
            icon={<Icon type="left"/>}
            onLeftClick={() => this.handleGoBack()}
          >{partner && partner.nickname ? partner.nickname : ''}</NavBar>
        </div>
        <div className="mi-conetnt">
          <List className="chat-list">
            {msgList.map(item => {
              return item.from === user._id ?
                <div className="chat-item item-send" key={item._id}>
                  <img className="item-avatar" src={host + 'uploads/' + user.avatar}/>
                  <div className="item-text">{item.content}</div>
                </div>
                :
                <div className="chat-item item-receive" key={item._id}>
                  <img className="item-avatar" src={host + 'uploads/' + partner.avatar}/>
                  <div className="item-text">{item.content}</div>
                </div>
            })}
          </List>
        </div>
        <div className="mi-footer">
          <InputItem
            type="text"
            placeholder="输入内容"
            onChange={(v) => this.handleChange('text', v)}
            value={this.state.text}
            extra={<div className="btn-list">
                <span
                  className="btn-emoji"
                  onClick={() => {
                    this.setState({
                      isShowEmoji: !this.state.isShowEmoji
                    });
                    setTimeout(() => {
                      window.dispatchEvent(new Event('resize'));
                    }, 0)
                  }}>😊</span>
              <span className="btn-send" onClick={this.handleSubmit}>发送</span>
            </div>}/>
        </div>
        {this.state.isShowEmoji
          ? <Grid
            className="emoji-wrap"
            data={emoji}
            isCarousel
            columnNum={9}
            carouselMaxRow={4}
            onClick={v => this.setState({text: this.state.text + v.text})}/>
          : null}
      </div>
    )
  }
}