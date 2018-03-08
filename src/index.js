import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import './index.css'
import Auth from './component/auth'
import Login from './container/login'
import DashBoard from './component/dashboard'

import reducers from './redux/reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducers, compose(
  applyMiddleware(thunk), window.devToolsExtension
  ? window.devToolsExtension()
  : f => f));

  ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
      <div>
        <Auth></Auth>
        <Switch>
          <Route path="/login" exact component={Login}/>
          <Route component={DashBoard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
