import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchSearchQueryInfo} from '../actions/showsAction';
import {Link} from 'react-router-dom';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {LoginUser, LoginUserSocial, LogoutUser} from '../actions/userAction';

import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Helmet } from "react-helmet";

class Login extends Component {

constructor(){
  super();
  this.state = {
    email: '',
    password: '',
    open: false,
    msg: ''
  }

}

 responseFacebook = (response) =>{
    // console.log(response);
    let credentials = {
      fbid: response.id,
      fb_token: response.accessToken,
      type: 'facebook'
    }
    let socialLogin = this.props.LoginUserSocial(credentials)
    socialLogin.then((login)=>{
      if(login.success === true){
        this.setState({open: true, msg: `Login Success!`}, ()=>{
          setTimeout(()=>{
             this.props.history.push('/')
          }, 1000)
        });
      }else if(login.success === false){
        this.setState({open: true, msg: `Login Failed! Invalid Credentials!`});
      }
    })
  }

 responseGoogle = (response) => {
   // console.log(response);
    let credentials = {
      id_token: response.tokenObj.id_token,
      google_id: response.googleId,
      type: 'google'
    }
    let socialLogin = this.props.LoginUserSocial(credentials)
    socialLogin.then((login)=>{
      if(login.success === true){
        this.setState({open: true, msg: `Login Success!`}, ()=>{
          setTimeout(()=>{
             this.props.history.push('/')
          }, 1000)
        });
      }else if(login.success === false){
        this.setState({open: true, msg: `Login Failed! Invalid Credentials!`});
      }
    })

  }

  Login = (e) =>{
    e.preventDefault();
    // console.log("clicked login!");
    if(this.state.email === ''){
      this.setState({open: true, msg: `Email can't be empty`});
    }else if(this.state.password === ''){
      this.setState({open: true, msg: `Password can't be empty`});
    }else if(this.state.password === '' || this.state.email === ''){
      this.setState({open: true, msg: `Fields can't be empty`});
    }else {
      let loginAttempt =  this.props.LoginUser(this.state.email, this.state.password);
      loginAttempt.then((login)=>{
        if(login.success === true){
          this.setState({open: true, msg: `Login Success!`}, ()=>{
            setTimeout(()=>{
               this.props.history.push('/')
            }, 1000)
          });
        }else if(login.success === false){
          this.setState({open: true, msg: `Login Failed! Invalid Credentials!`});
        }
      })
    }

  }



  handleEmailChange = (e) =>{
    this.setState({ email : e.target.value});
  }

  handlePasswordChange = (e) =>{
    this.setState({ password : e.target.value});
  }

  handleRequestClose = () => {
  this.setState({
    open: false,
  });
  };

  render() {

    // <FacebookLogin
    //    appId="415911222188406"
    //    autoLoad={false}
    //    fields="name,email,picture"
    //    callback={this.responseFacebook}
    //    className="facebookLogin"
    //    />



    return (

<MuiThemeProvider>
<div className="App FullHeight">


<br /><br />

        <Grid fluid>
          <Row>
<Col xs={12} md={8} sm={4}>
<h3 className="login_header">Login To Binged!</h3>

<form onSubmit={(e)=>this.Login(e)}>

      <TextField
        className="form-field"
        floatingLabelText="Email"
        onChange={this.handleEmailChange}
        errorText= {this.state.emailError}
      /><br />
      <TextField
        className="form-field"
        floatingLabelText="Password"
        type='password'
        onChange={this.handlePasswordChange}
        errorText= {this.state.passwordError}
      /><br />
    <br />
    <RaisedButton label="Login" primary={true} onClick={this.Login}/><br/><br/>
<Link to={`/register`} className="auth_redirect">Register</Link><br/><br/>
<Link to={`/forgot-password`} className="auth_redirect">Forgot Password?</Link><br/><br/>
</form>

</Col>

<Col xs={12} md={4} sm={4}>

<div>
<h3 className="login_header">Login With Social Media!</h3>
<br />
<br />


    <br/>
    <br/>

      <FacebookLogin
         appId="415911222188406"
         autoLoad={false}
         fields="name,email,picture"
         callback={this.responseFacebook}
         className="facebookLogin"
         />
       <br/><br/>

<GoogleLogin
 clientId="95894114672-45ungm664qrto6477mbbtpoih6ut49kj.apps.googleusercontent.com"
 buttonText="Login with Google"
 onSuccess={this.responseGoogle}
 onFailure={this.responseGoogle}
 className="googleLogin"
/>

</div>
</Col>

          </Row>
        </Grid>


      </div>
      <Snackbar
                open={this.state.open}
                message={this.state.msg}
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose}
        />

        <Helmet>
          <title>Binged! Login!</title>
          <meta name="description" content="Browse, Follow and Keep Track of Your Favourite Shows!" />
          <meta name="og:type" content="video.movie" />
          <meta name="og:title" content="Browse Popular TV Shows Airing Tonight!" />
          <meta name="og:description" content="Built with React/Express" />
        </Helmet>


</MuiThemeProvider>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
          }
}


export default connect(mapStateToProps, {LoginUser, LoginUserSocial})(Login);
