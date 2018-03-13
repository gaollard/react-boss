import React, {Component} from 'react'
import {NavBar, ListView, List} from 'antd-mobile'
import {connect} from 'react-redux'
import {fetchCompanyList} from '../../redux/company.redux'
import './index.css'

@connect(state => state, {fetchCompanyList})
export default class Position extends Component {

  componentDidMount() {
    const {company} = this.props;
    if (!company.list.length) {
      this.props.fetchCompanyList();
    }
  }

  render() {
    const Item = List.Item;
    const {company} = this.props;
    return (
      <div className="cmp-companys">
        <div className="mi-header">
          <NavBar>公司</NavBar>
        </div>
        <div className="mi-content">{
          company.list.map((v, i) => {
            return (
              <Item className="list-item" key={i}>
                <div className="item-hd">
                  <img className="item-avatar" src={require('./avatar.jpg')}/>
                  <div className="item-companyName">{v.companyName}</div>
                  <div className="item-companyAddress">{'默认地址'}</div>
                </div>
                <div className="tag-list">{
                  v.tags.split(',').map((v, index) => {
                    return <div className="tag-item" key={index}>{v}</div>
                  })
                }</div>
                <div className="item-btm">
                  <span>热招：</span>
                  <span className="hot-job">{'前端工程师'}</span>
                  <span>等{3000}个职位</span>
                </div>
              </Item>
            )
          })
        }</div>
      </div>
    )
  }
}