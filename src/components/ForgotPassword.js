import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchSearchQueryInfo} from '../actions/showsAction';
import {Link} from 'react-router-dom';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {LoginUser, LogoutUser} from '../actions/userAction';

import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import urlToUse from '../config';

class ForgotPassword extends Component {

constructor(){
  super();
  this.state = {
    email: '',
    open: false,
    msg: ''
  }

}


  requestNewPassword = (e) =>{
    e.preventDefault();
    if(this.state.email === ''){
      this.setState({open: true, msg: `Email can't be empty`});
    }else {

      let data = {
        email : this.state.email
      };

      fetch(`${urlToUse}/forgotpassword`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(done => done.json())
            .then((done) => {
                if(done.success === true){
                  this.setState({open: true, msg: `A new password has been sent to your registered email!`});
                }
              })

    }

  }



  handleEmailChange = (e) =>{
    this.setState({ email : e.target.value});
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

<Col xs={12} md={3} sm={4}>

</Col>


<Col xs={12} md={6} sm={4}>
<h3 className="login_header">Retrive your password!</h3>

<form onSubmit={(e)=>this.Login(e)}>

      <TextField
        className="form-field"
        floatingLabelText="Email"
        onChange={this.handleEmailChange}
        errorText= {this.state.emailError}
      /><br /><br /><br />
    <RaisedButton label="Request New Password" primary={true} onClick={this.requestNewPassword}/><br/><br/>
<Link to={`/register`} className="auth_redirect">Register</Link><br/>
<Link to={`/login`} className="auth_redirect">Login</Link><br/><br/>
</form>

</Col>

<Col xs={12} md={3} sm={4}>

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
</MuiThemeProvider>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
          }
}


export default connect(mapStateToProps)(ForgotPassword);
