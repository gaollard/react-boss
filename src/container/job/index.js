import React, {Component} from 'react'
import {NavBar, Icon, List} from 'antd-mobile'
import './index.css'
import {api} from "../../config/index"
import {connect} from 'react-redux'
import {loadJobList} from "../../redux/job.redux"

@connect(state => state, {
  loadJobList
})
export default class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobInfo: {}
    }
  }

  async componentDidMount() {
    const {job} = this.props;
    const params = this.props.match.params;
    if (!job.list.length) {
      this.props.loadJobList();
    }
    try {
      let ret = await api.loadJobDetails(params);
      this.setState({jobInfo: ret.data.jobInfo})
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const Item = List.Item;
    const {job, history} = this.props;
    const {jobInfo} = this.state;
    return (
      <div className="page-job">
        <div className="mi-header">
          <NavBar icon={<Icon type="left"/>} onLeftClick={() => history.goBack()}>职位</NavBar>
        </div>
        <div className="mi-content">
          <div className="job-banner">
            <ul className="job-title">
              <li>{jobInfo.title}</li>
              <li>{jobInfo.salary}</li>
            </ul>
            <div className="tag-list">
              <span>{jobInfo.address}</span>
              <span>{jobInfo.experience}</span>
              <span>{jobInfo.education}</span>
              <span className="send-date">{'发布于03月11日'}</span>
            </div>
          </div>
          <div className="job-desc">{
            jobInfo.details ? jobInfo.details.split(/\n/).map(v => {
              return <p key={v}>{v}</p>
            }):null
          }</div>
        </div>
      </div>
    )
  }
}