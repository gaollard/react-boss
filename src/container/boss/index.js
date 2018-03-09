import React, {Component} from 'react'
import {NavBar, ListView, List} from 'antd-mobile'
import {api} from '../../config/index'

export default class Msg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    }
  }

  componentDidMount() {
    api.users({type: 'boss'}).then(res => {
      if (res.code === '0') {
        this.setState({
          userList: res.data.list
        })
      }
    })
  }

  render() {
    const Item = List.Item;
    const {userList} = this.state;
    return (
      <div className="cmp-msg">
        <div className="mi-header">
          <NavBar>Boss</NavBar>
        </div>
        <div className="mi-content">
          {
            userList.map(v => {
              return <Item key={v.mobile}>{v.mobile}</Item>
            })
          }
        </div>
      </div>
    )
  }
}