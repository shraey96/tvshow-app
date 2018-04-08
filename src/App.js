import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
<Navbar></Navbar>
  <Main />

      </div>
    );
  }
}

export default App;
