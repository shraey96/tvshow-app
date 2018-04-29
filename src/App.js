import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import {connect} from 'react-redux';
import {getUserData} from './actions/userAction';
import {withRouter} from 'react-router-dom';

class App extends Component {

componentWillMount(){
let loggedIN = localStorage.getItem('isUserLoggedIn');
if(!loggedIN){
  // console.log("Hi");
}else {
  // console.log("FETCHING USER DATA");
 this.props.getUserData();
}
// this.props.getUserData();
}

  render() {
    return (
      <div className="App">
<Navbar></Navbar>
  <Main />

      </div>
    );
  }
}

// export default App;
// export default connect(null, {getUserData})(App);
export default withRouter(connect(null, {getUserData})(App))
