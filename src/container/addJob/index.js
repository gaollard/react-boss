import React, {Component} from 'react'
import {
  NavBar,
  Icon,
  InputItem,
  List,
  Button,
  TextareaItem,
  WingBlank,
  Toast
} from 'antd-mobile'
import './index'
import {api} from "../../config/index"
import {connect} from 'react-redux'

@connect(state => state, {})
export default class AddJob extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: 'Node工程师',
        salary: '20-30K',
        education: '本科',
        experience: '3年以上',
        address: '深圳-科技园',
        details: `1. 优秀的代码风格\n2. 深入前端性能优化\n3. 问题快速定位能力\n4. 丰富的业务能力`
      }
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    const {form} = this.state;
    const {user, history} = this.props;
    form.authorId = user._id;
    try {
      let ret = await api.addJob(form);
      Toast.success('添加成功');
      history.goBack();
    } catch (e) {
      console.log(e);
    }
  }

  onChange(key, value) {
    const {form} = this.state;
    form[key] = value;
    this.setState({form});
  }

  render() {
    const {history} = this.props;
    const {form} = this.state;
    return (
      <div className="page-addJob">
        <div className="mi-header">
          <NavBar icon={<Icon type="left"/>} onLeftClick={() => history.goBack()}>发布职位</NavBar>
        </div>
        <div className="mi-content">
          <List>
            <InputItem
              type="text"
              placeholder="职位名称"
              onChange={(v) => this.onChange('title', v)}
              value={form.title}
            >职位名称</InputItem>
            <InputItem
              type="text"
              placeholder="薪资待遇"
              onChange={(v) => this.onChange('salary', v)}
              value={form.salary}
            >薪资待遇</InputItem>
            <InputItem
              type="text"
              placeholder="学历要求"
              onChange={(v) => this.onChange('education', v)}
              value={form.education}
            >学历要求</InputItem>
            <InputItem
              type="text"
              placeholder="经验要求"
              onChange={(v) => this.onChange('experience', v)}
              value={form.experience}
            >经验要求</InputItem>
            <InputItem
              type="text"
              placeholder="工作地点"
              onChange={(v) => this.onChange('address', v)}
              value={form.address}
            >工作地点</InputItem>
            <TextareaItem
              type="text"
              title="职位详情"
              autoHeight
              onChange={(v) => this.onChange('details', v)}
              value={form.details}
            />
          </List>
          <WingBlank>
            <Button
              className="btn-submit"
              type="primary"
              onClick={this.handleSubmit}
            >立马提交</Button>
          </WingBlank>
        </div>
      </div>
    )
  }
}