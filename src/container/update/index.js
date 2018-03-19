import React, {Component} from 'react'
import {List, Button, InputItem, Toast, WingBlank, NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {updateUserInfo} from '../../redux/user.redux'
import {ImagePicker} from 'antd-mobile';
import {api} from "../../config/index"
import './index.css'

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

@connect(state => state, {updateUserInfo})
export default class Update extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      nickname: '',
      files: data,
      multiple: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  onImgChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({files});
  }

  componentWillMount() {
    const user = this.props.user;
    this.setState({
      files: [],
      mobile: user.mobile,
      nickname: user.nickname
    })
  }

  onChange(key, value) {
    this.setState({[key]: value});
  }

  handleDrop = dropped => {
    console.log(dropped);
    this.setState({image: dropped[0]})
  }

  handleSubmit = (avatar) => {
    const {nickname, mobile} = this.state;
    const userkey = this.props.user.userkey;
    const payload = {nickname, mobile, userkey};
    if (avatar) payload.avatar = avatar;
    this.props.updateUserInfo(payload);
  }

  handleUpdateUserInfo() {
    if (!this.state.files.length) {
      this.handleSubmit();
    } else {
      let state = this.state;
      let formData = new FormData();
      formData.append('avatar', this.state.files[0].file);
      api.upload(formData).then(res => {
        setTimeout(() => {
          this.handleSubmit(res.data.path)
        }, 2000)
      }).catch(res => {
        Toast.fail(res.msg)
      })
    }
  }

  render() {
    const {files} = this.state;
    return (
      <div className="cmp-update">
        <div className="mi-header">
          <NavBar
            icon={<Icon type="left"/>}
            onLeftClick={() => {
              this.props.history.goBack()
            }}
          >修改信息</NavBar>
        </div>
        <div className="mi-content">
          {/*<Dropzone*/}
          {/*className="upload-wrap"*/}
          {/*onDrop={this.handleDrop.bind(this)}*/}
          {/*style={{width: '120px', height: '120px'}}*/}
          {/*>*/}
          {/*<ReactAvatarEditor className="avatar-picker" width={120} height={120} image={this.state.image}/>*/}
          {/*</Dropzone>*/}
          <div className="avatar-loader">
            <ImagePicker
              files={files}
              onChange={this.onImgChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length === 0}
              multiple={false}
            />
          </div>

          <List className="form-wrap">
            <InputItem
              type="phone"
              placeholder="手机号码"
              onChange={(v) => this.onChange('mobile', v)}
              value={this.state.mobile}
            />
            <InputItem
              type="text"
              placeholder="用户昵称"
              onChange={(v) => this.onChange('nickname', v)}
              value={this.state.nickname}
            />
          </List>
          <WingBlank>
            <Button
              className="btn-submit"
              type="primary"
              onClick={() => this.handleUpdateUserInfo()}>提交</Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}