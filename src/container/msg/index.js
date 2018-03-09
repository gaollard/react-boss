import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'

export default class Msg extends Component { 
  render () {
    return (
      <div className="cmp-msg">
        <NavBar>消息</NavBar>
      </div>
    )
  }
}