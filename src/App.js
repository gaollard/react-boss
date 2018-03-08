import React, { Component } from 'react';
import './asset/css/common.css';
import LoginComponent from './container/login'

class App extends Component {
  render() {
    return (
      <div>
        <LoginComponent></LoginComponent>
      </div>
    );
  }
}

export default App;
