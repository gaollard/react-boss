import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

@connect(state => state, {})
@withRouter
export default class Navlink extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const {pathname} = this.props.location;
    return (
      <TabBar tintColor="#1DA57A">{
        navList.map(v => {
          return <TabBar.Item
            icon={{uri: require(`./img/${v.icon}.svg`)}}
            selectedIcon={{uri: require(`./img/${v.icon}-active.svg`)}}
            title={v.text}
            key={v.text}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path)
            }}
            badge={v.path === '/msg' && this.props.chat ? this.props.chat.unread : 0}
          />
        })
      }</TabBar>
    )
  }
}