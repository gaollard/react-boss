import React, {Component} from 'react'
import {NavBar, ListView, List} from 'antd-mobile'
import mockData from './data.json';
import css from './index.css'

export default class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    const {list} = this.state;
    for (let i = 0; i < 10; i++) {
      list.push(mockData)
    }
    this.setState({list})
  }

  render() {
    const Item = List.Item;
    const {list} = this.state;
    return (
      <div className="cmp-positions">
        <div className="mi-header"><NavBar>职位</NavBar></div>
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