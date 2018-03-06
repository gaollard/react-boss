import React, { Component } from 'react';
import '@src/asset/css/common.css';
import LoginComponent from '@src/page/login/login'

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
