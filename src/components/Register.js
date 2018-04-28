import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchSearchQueryInfo} from '../actions/showsAction';
import {Link} from 'react-router-dom';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {RegisterUser} from '../actions/userAction';

import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

class Register extends Component {

constructor(){
  super();
  this.state = {
    username: '',
    email: '',
    password: '',
    cpassword: '',
    open: false,
    msg: ''
  }
}

 responseFacebook = (response) =>{
    console.log(response);
  }

 responseGoogle = (response) => {
    console.log(response);
    console.log(response.getBasicProfile());
  }

  Register = (e) =>{

    if(this.state.username === ''){
      this.setState({open: true, msg: `Username can't be empty`});
      return
    }

    if(this.state.email === ''){
      this.setState({open: true, msg: `Email can't be empty`});
      return
    }

    if(this.state.password === ''){
      this.setState({open: true, msg: `Password can't be empty`});
      return
    }

    if(this.state.cpassword === ''){
      this.setState({open: true, msg: `Confirm Password can't be empty`});
      return
    }

    if(this.state.cpassword !== this.state.password){
      this.setState({open: true, msg: `Passwords do not match`});
      return
    }

    if(this.state.cpassword === '' || this.state.password === '' || this.state.emai === '' || this.state.username === ''){
      this.setState({open: true, msg: `Fields can't be empty`});
      return
    }



    let data = {
      username : this.state.username,
      email : this.state.email,
      password: this.state.password
    };

      // get country
    // fetch(`https://api.ipdata.co/`, {
    //           method: 'get',
    //           headers: {
    //               'Content-Type': 'application/json',
    //               'Access-Control-Allow-Origin': '*'
    //           },
    //       })
    //       .then(country => country.json())
    //       .then((country) => {
    //         console.log(country);
    //       })

    let emailValidation = this.ValidateEmail(this.state.email);

    if(emailValidation === false){
      this.setState({open: true, msg: `Invalid Email!`});
      return
    }

    let registerUser = this.props.RegisterUser(data);
    registerUser.then((register)=>{
      if(register.success === true){
        this.setState({open: true, msg: `Registered Succesfully! Start tracking your favourite shows!`}, ()=>{
          setTimeout(()=>{
             this.props.history.push('/login')
          }, 1000)
        });
      }else {
          this.setState({open: true, msg: `Registration Failed! ${register.msg}`});
      }
    })
  }

  ValidateEmail = (mail) =>{

 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

  handleUserNameChange = (e) =>{
    this.setState({ username : e.target.value});
  }

  handleEmailChange = (e) =>{
    this.setState({ email : e.target.value});
  }

  handlePasswordChange = (e) =>{
    this.setState({ password : e.target.value});
  }

  handleCPasswordChange = (e) =>{
    this.setState({ cpassword : e.target.value});
  }

  handleRequestClose = () => {
  this.setState({
    open: false,
  });
  };

  render() {

    return (

<MuiThemeProvider>
<div className="App FullHeight">

<br /><br />

        <Grid fluid>
          <Row>
<Col xs={12} md={8} sm={4}>
<h3 className="register_header">Register On Binged!</h3>

<form onSubmit={(e)=>this.Login(e)}>

      <TextField
        className="form-field"
        floatingLabelText="Username"
        onChange={this.handleUserNameChange}
      /><br />
      <TextField
        className="form-field"
        floatingLabelText="Email"
        onChange={this.handleEmailChange}
      /><br />
      <TextField
        className="form-field"
        floatingLabelText="Password"
        type='password'
        onChange={this.handlePasswordChange}
      /><br />
      <TextField
        className="form-field"
        floatingLabelText="Confirm Password"
        type='password'
        onChange={this.handleCPasswordChange}
      /><br />
    <br />
    <RaisedButton label="Register" primary={true} onClick={this.Register}/><br/><br/>
    <Link to={`/login`} className="auth_redirect">Login</Link>
</form>

</Col>

<Col xs={12} md={4} sm={4}>
<div>
<h3 className="register_header">Register With Social Media!</h3>
<br />
<br />
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
 className="googleLogin"
/>

<div style={{"color":"white"}}>
<ul>
  <h3 className="register_info">Keep track of all your favourite shows!</h3>
<li> Follow the shows you like!</li>
<li> Get to know about shows/episodes/cast/people!</li>
<li> Get live-email notifications for the next episode!</li>
<li> Stay up to date on future episode dates!</li>
</ul>
</div>

</div>
</Col>

          </Row>
        </Grid>

        <Snackbar
                  open={this.state.open}
                  message={this.state.msg}
                  autoHideDuration={2000}
                  onRequestClose={this.handleRequestClose}
          />

      </div>
</MuiThemeProvider>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
          }
}


export default connect(mapStateToProps, {RegisterUser})(Register);
