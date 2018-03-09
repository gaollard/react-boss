import React, {Component} from 'react'
import {NavBar, ListView, List} from 'antd-mobile'
import {api} from '../../config/index'
import './index.css'

export default class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        title: 'web前端开发工程师',
        salary: '15k-30k',
        company: '腾讯科技',
        relateTags: [{
          key: '深圳福田'
        }, {
          key: '上市'
        }, {
          key: '本科'
        }],
        contact: {
          name: '滕茂庆',
          position: 'HR'
        }
      }]
    }
  }

  componentDidMount() {
    // api.users({type: 'boss'}).then(res => {
    //   if (res.code === '0') {
    //     this.setState({
    //       userList: res.data.list
    //     })
    //   }
    // })
    const {list} = this.state;
    for (let i = 0; i < 10; i++) {
      list.push(list[0])
    }
    this.setState({list})
  }

  render() {
    const Item = List.Item;
    const {list} = this.state;
    return (
      <div className="cmp-msg">
        <div className="mi-header">
          <NavBar>Boss</NavBar>
        </div>
        <div className="mi-content">
          {
            list.map((v, index) => {
              const tags = v.relateTags;
              return (
                <Item className="list-item" key={index}>
                  <div className="item-hd">
                    <div className="item-title">{v.title}</div>
                    <div className="item-salary">{v.salary}</div>
                  </div>
                  <div className="item-md">
                    <div className="item-company">{v.company}</div>
                    <div className="tag-list">
                      {tags.map(v => <div className="tag-item" key={v.key}>{v.key}</div>)}
                    </div>
                    {/*<div className="item-contact">*/}
                    {/*<img className="item-avatar" src={require('./avatar.jpg')} alt=""/>*/}
                    {/*</div>*/}
                  </div>
                  <div className="item-btm">
                    <img className="item-avatar" src={require('./avatar.jpg')} alt=""/>
                    <span className="contact-name">{v.contact.name}-{v.contact.position}</span>
                  </div>
                </Item>
              )
            })
          }
        </div>
      </div>
    )
  }
}