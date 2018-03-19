import React, {Component} from 'react'
import {NavBar, List} from 'antd-mobile'
import {connect} from 'react-redux'
import {loadJobList} from "../../redux/job.redux"
import './index.css'

@connect(state => state, {
  loadJobList
})
export default class Position extends Component {

  componentDidMount() {
    const {job} = this.props;
    if (!job.list.length) {
      this.props.loadJobList();
    }
  }

  render() {
    const Item = List.Item;
    const {job, history} = this.props;
    return (
      <div className="cmp-positions">
        <div className="mi-header"><NavBar>职位</NavBar></div>
        <div className="mi-content">
          {job.list.map((v, index) => {
            return (
              <Item onClick={() => history.push(`/job/${v._id}`)}
                    className="list-item" key={index}>
                <div className="item-hd">
                  <div className="item-title">{v.title}</div>
                  <div className="item-salary">{v.salary}</div>
                </div>
                <div className="item-md">
                  <div className="item-company">{'腾讯科技'}</div>
                  <div className="tag-list">
                    <div className="tag-item">{v.address}</div>
                    <div className="tag-item">{v.experience}</div>
                    <div className="tag-item">{v.education}</div>
                  </div>
                </div>
                <div className="item-btm">
                  <img className="item-avatar" src={require('./avatar.jpg')} alt=""/>
                  <span className="contact-name">{v.authorName}-{v.authorTitle}</span>
                </div>
              </Item>
            )
          })
          }</div>
      </div>
    )
  }
}