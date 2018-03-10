import React, {Component} from 'react'
import {NavBar, ListView, List, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import { loadBosses } from "../../redux/boss.redux"
import './index.css'

@connect(state => state, {loadBosses})
export default class Position extends Component {
  constructor(props) {
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    const userList = this.props.boss.list;
    if(!userList.length) {
      this.props.loadBosses();
    }
  }

  handleGoBack() {
    this.props.history.goBack();
  }

  render() {
    const Item = List.Item;
    const {list} = this.props.boss;
    const chatPartnerId = this.props.match.params.userId;
    return (
      <div className="cmp-chat">
        <div className="mi-header">
          <NavBar
            icon={<Icon type="left"/>}
            onLeftClick={() => this.handleGoBack()}
          >{chatPartnerId}</NavBar>
        </div>
        <div className="mi-content">{
          list.map((v, i) => {
            return (<Item className="list-item" key={i}></Item>)
          })
        }</div>
      </div>
    )
  }
}