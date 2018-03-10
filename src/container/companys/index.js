import React, {Component} from 'react'
import {NavBar, ListView, List} from 'antd-mobile'
import './index.css'
import data from './data.json'

export default class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {list: []};
  }

  componentDidMount() {
    const {list} = this.state;
    for (let i = 0; i < 10; i++) {
      list.push(data)
    }
    this.setState({list})
  }

  render() {
    const Item = List.Item;
    const {list} = this.state;
    return (
      <div className="cmp-companys">
        <div className="mi-header">
          <NavBar>公司</NavBar>
        </div>
        <div className="mi-content">
          {
            list.map((v, i) => {
              return (
                <Item className="list-item" key={i}>
                  <div className="item-hd">
                    <img className="item-avatar" src={require('./avatar.jpg')}/>
                    <div className="item-companyName">{v.name}</div>
                    <div className="item-companyAddress">{v.address}</div>
                  </div>
                  <div className="tag-list">
                    <div className="tag-item">{v.scale}</div>
                    <div className="tag-item">{v.people}</div>
                    <div className="tag-item">{v.industry}</div>
                  </div>
                  <div className="item-btm">
                    <span>热招：</span>
                    <span className="hot-job">{v.relates.position}</span>
                    <span>等{v.relates.count}个职位</span>
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