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
          {/*<Route path="/bossinfo" component={BossInfo}></Route>*/}
          {/*<Route path="/geniusinfo" component={ GeniusInfo}></Route>*/}
          {/*<Route path="/register" component={Register}/>*/}
          {/*<Route path="/login" component={Login}/>*/}
          <Route path="/login" exact component={Login}/>
          <Route path="/update" exact component={Update}/>
          <Route path="/firm" exact component={Firm}/>
          <Route path="/chat/:from" exact component={Chat}/>
          <Route component={DashBoard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
