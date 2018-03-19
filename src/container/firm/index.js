import React, {Component} from 'react'
import {NavBar, List, Icon} from 'antd-mobile'
import './index.css'
import firmBg from './bg.jpg';
import firmFace from './firm.jpg'
import {api} from "../../config/index"

const positionList = [{
  title: '架构师',
  salary: '30K-50K',
  city: '深圳',
  experience: '5-10年',
  education: '本科'
}, {
  title: '架构师',
  salary: '30K-50K',
  city: '深圳',
  experience: '5-10年',
  education: '本科'
}];

export default class Position extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companyInfo: {},
      tabIndex: 0,
      tabMenu: ['公司信息', '热招职位']
    }
  }

  async componentDidMount() {
    const {companyId} = this.props.match.params;
    try {
      let ret = await api.getCompanyInfoById({companyId});
      this.setState({companyInfo: ret.data.companyInfo});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {history} = this.props;
    const {companyInfo, tabIndex, tabMenu} = this.state;
    return (
      <div className="page-firm">
        <div className="mi-header">
          <NavBar
            icon={<Icon type="left"/>}
            onLeftClick={() => history.goBack()}
          >{companyInfo.companyName}</NavBar>
        </div>
        <div className="mi-content">
          <img className="firm-bg" src={firmBg} alt=""/>
          <div className="firm-sketch">
            <div className="firm-logo-wrap">
              <img className="firm-avatar" src={firmFace} alt=""/>
            </div>
            <div className="firm-primary">
              <h1>{companyInfo.companyName}</h1>
              <p>http://www.huawei.com</p>
              <p>
                <span className="text">{companyInfo.stage}</span>
                <span className="line"></span>
                <span className="text">{companyInfo.scale}</span>
                <span className="line"></span>
                <span className="text">{companyInfo.industry}</span>
              </p>
            </div>
          </div>
          <ul className="main-tab">{
            tabMenu.map((v, index) => {
              return <li key={v} className={index === tabIndex ? 'is-active' : ''} onClick={() => {
                this.setState({tabIndex: index})
              }}>{v}</li>
            })
          }</ul>
          {tabIndex === 0 ?
            <div className="tab-box firm-desc">
              <div className="title">公司简介</div>
              <div className="text">
                作为全球领先的信息与通信解决方案供应商，我们为电信运营商、企业和消费者等提供有竞争力的端到端ICT解决方案和服务，帮助客户在数字社会获得成功。我们坚持聚焦战略，对电信基础网络、云数据中心和智能终端等领域持续进行研发投入，以客户需求和前沿技术驱动的创新，使公司始终处于行业前沿，引领行业的发展。我们每年将销售收入的10%以上投入研发，在近17万华为人中，超过45%的员工从事创新、研究与开发。华为在170多个标准组织和开源组织中担任核心职位，已累计获得专利授权38,825件。
              </div>
              <div className="title">公司地址</div>
            </div>
            :
            <div className="tab-box hot-pos">
              <ul>{
                positionList.map((v, index) => {
                  return (
                    <li className="pos-item" key={index}>
                      <div className="pos-item-hd">
                        <div className="pos-title">{v.title}</div>
                        <div className="pos-salary">{v.salary}</div>
                      </div>
                      <div className="pos-item-bd">
                        <span>{v.city}</span>
                        <span>{v.experience}</span>
                        <span>{v.education}</span>
                      </div>
                    </li>
                  )
                })
              }</ul>
            </div>
          }
        </div>
      </div>
    )
  }
}