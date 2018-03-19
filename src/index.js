import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import './asset/css/common.css'
import Auth from './component/auth'
import Login from './container/login'
import Chat from './container/chat'
import Update from './container/update'
import DashBoard from './component/dashboard'
import Firm from './container/firm'
import AddJob from './container/addJob'
import Job from './container/job'

import reducers from './redux/reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducers, compose(
  applyMiddleware(thunk), window.devToolsExtension
  ? window.devToolsExtension()
  : f => f));

  ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
      <div>
        <Auth/>
        <Switch>
          {/*职位详情*/}
          <Route path="/job/:jobId" exact component={Job}/>
          {/*登录*/}
          <Route path="/login" exact component={Login}/>
          {/*更新用户资料*/}
          <Route path="/update" exact component={Update}/>
          {/*公司详情*/}
          <Route path="/company/:companyId" exact component={Firm}/>
          {/*聊天详情*/}
          <Route path="/chat/:from" exact component={Chat}/>
          {/*发布职位*/}
          <Route path="/addJob" exact component={AddJob}/>
          <Route component={DashBoard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
