import React, {Component} from 'react'
import {NavBar, Grid, List, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {loadBosses} from "../../redux/boss.redux"
import {sendMsg, receiveMsg} from "../../redux/chat.redux"
import './index.css'
import data from './data.json'
import InputItem from "antd-mobile/es/input-item/index";

const emoji = data.emoji.split(' ').filter(v => v).map(text => {
  return {text}
});

@connect(state => state, {
  loadBosses,
  sendMsg,
  receiveMsg
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
    const userList = this.props.boss.list;
    if (!userList.length) {
      this.props.loadBosses();
    }
    this.props.receiveMsg();
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  handleGoBack() {
    this.props.history.goBack();
  }

  handleSubmit() {
    const userId = this.props.user._id;
    const from = this.props.match.params.from;
    this.props.sendMsg({
      from,
      to: userId,
      content: this.state.text
    });
  }

  render() {
    const Item = List.Item;
    const {list} = this.props.boss;
    const chatPartnerId = this.props.match.params.from;
    return (
      <div className="cmp-chat">
        <div className="mi-header">
          <NavBar
            icon={<Icon type="left"/>}
            onLeftClick={
              () => this.handleGoBack()
            }
          >{chatPartnerId}</NavBar>
        </div>
        <div className="mi-footer">
          <InputItem
            type="text"
            placeholder="输入内容"
            onChange={(v) => this.handleChange('text', v)}
            value={this.state.text}
            extra={
              <div className="btn-list">
                <span
                  className="btn-emoji"
                  onClick={() => {
                    this.setState({isShowEmoji: !this.state.isShowEmoji});
                    setTimeout(() => {
                      window.dispatchEvent(new Event('resize'));
                    }, 0)
                  }}>😊</span>
                <span className="btn-send" onClick={this.handleSubmit}>发送</span>
              </div>
            }/>
        </div>
        {
          this.state.isShowEmoji
            ? <Grid
              className="emoji-wrap"
              data={emoji}
              isCarousel
              columnNum={9}
              carouselMaxRow={4}
              onClick={v => {
                this.setState({text: this.state.text + v.text})
              }}/>
            : null
        }
      </div>
    )
  }
}