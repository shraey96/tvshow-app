import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchSearchQueryInfo} from '../actions/showsAction';
import {Link} from 'react-router-dom';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton';

import {LoginUser, LogoutUser} from '../actions/userAction'

class Login extends Component {

constructor(){
  super();
  // this.responseFacebook = this.responseFacebook.bind(this)
}

  responseFacebook = (response) =>{
    console.log(response);
  }

 responseGoogle = (response) => {
    console.log(response);
    console.log(response.getBasicProfile());
  }

  Login = () =>{
    let email = "shraey96@gmail.com";
    let password = "chikker";
    (this.props.LoginUser(email, password));
  }


  render() {



    return (
      <div className="App FullHeight">

      <u><h3>Login Component</h3></u>

      <FacebookLogin
         appId="415911222188406"
         autoLoad={false}
         fields="name,email,picture"
         callback={this.responseFacebook} />

       <br/>
        <br/>

         <GoogleLogin
     clientId="95894114672-849bmsu6ganu1ufg1fecsj801rcvd3od.apps.googleusercontent.com"
     buttonText="Login with Google"
     onSuccess={this.responseGoogle}
     onFailure={this.responseGoogle}
   />
 <br/>
 <br/>
 <button onClick={this.Login}> Login </button>

      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
          }
}


export default connect(mapStateToProps, {LoginUser})(Login);
