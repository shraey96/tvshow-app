import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {userProfile} from '../actions/userAction';
import {withRouter} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {UserFollowShow, UserUnFollowShow} from '../actions/userAction';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import moment from 'moment';

import urlToUse from '../config';

class ProfilePage extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      profileInfo: '',
      open: false,
      snackopen: false,
      msg: '',
      oldPass: '',
      newPass: ''
    }
  }

componentWillMount(){
  // console.log("Mounted Profile Page");
  this.fetchProfile();
}

fetchProfile(){
  this.setState({loader: true}, ()=>{
    fetch(`${urlToUse}/users/profile`, {
              method: 'get',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
          })
          .then(profile => profile.json())
          .then((profile) => {
              // console.log(profile);
              if(profile.success===true){
              this.setState({loader: false, profileInfo:profile.info})
            }
            })
  })


}

updateToggles(type, bool){
  let data;

  // console.log("update toggle");
  if(type==='oneSignalNotif'){
   data = {
    oneSignalNotif : bool
  }
  }else if(type==='emailNotif'){
   data = {
      emailNotif : bool
  }
  }

  fetch(`${urlToUse}/users/profile`, {
            method: 'put',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(profile => profile.json())
        .then((profile) => {
          if(profile.success===true){
          this.setState({profileInfo:profile.info})
          this.props.userProfile(profile.info);
        }
          })

}

onToggleWeb = (e, value) =>{
  // console.log(value);
  this.updateToggles('oneSignalNotif', value);
}

onToggleEmail = (e, value) =>{
  // console.log(value);
  this.updateToggles('emailNotif', value);
}

handleOpenDialog = () =>{
  this.setState({open:true})
}


 handleClose = () => {
   this.setState({open: false});
 };

handleRequestClose = () => {
this.setState({
  snackopen: false,
});
};

handlePasswordChange = () =>{
  let data = {
    old: this.state.oldPass,
    new: this.state.newPass
  }
  fetch(`${urlToUse}/users/updatePassword`, {
            method: 'put',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(passupdate => passupdate.json())
        .then((passupdate) => {
            if(passupdate.success===true){
              this.setState({snackopen: true, msg: "Password Updated Succesfully!"}, ()=>{
                this.handleClose();
              });
            }else {
              this.setState({snackopen: true, msg: "Old and New Passwords Don't Match!"});
            }
          })
}

handleOldPassWordChange = (e) =>{
  // console.log(e.target.value);
  this.setState({oldPass: e.target.value});
}
handleNewPassWordChange = (e) =>{
  // console.log(e.target.value);
  this.setState({newPass: e.target.value});
}

  render() {

// console.log(this.props.user);
// console.log(this.props.shows);
// let userShowInfo = this.props.user.userFollows;

let loader;
let imgCol;
let profileInfo;

let settings;

if(this.state.loader === true){
  loader = (<img src="https://s3.amazonaws.com/binged-images/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}

if(this.props.user.isUserLoggedIn === true){

 imgCol = (
  <Col xs={12} md={4}  sm={12}>
  <img className="user_profile_img" src={this.state.profileInfo.profile_Img || 'https://www.shareicon.net/download/2016/09/01/822711_user_512x512.png'} />
  </Col>
)

profileInfo = (
    <Col xs={12} md={8}  sm={12}>
    <div className="user_profile">
    <p className="user_profile_main"><span>{this.state.profileInfo.username}</span> </p>
    <p className="user_profile_main"><span>{this.state.profileInfo.email}</span> </p>
    <p>Date Joined: <span>{moment(this.state.profileInfo.created_at).format('MMMM Do YYYY')}</span> </p><br/>
    <RaisedButton label="Change Password" onClick={this.handleOpenDialog} />
    </div>
    </Col>
)


settings = (

  <Col xs={12} md={4}  sm={4}>
  <Toggle
  label="Web Push Notifications"
  labelPosition="left"
  onToggle={this.onToggleWeb}
  toggled={this.state.profileInfo.oneSignalNotif}
  className="toggle"
  />

  <Toggle
  label="Email Notifications"
  labelPosition="left"
  onToggle={this.onToggleEmail}
  toggled={this.state.profileInfo.emailNotif}
  className="toggle"
  />
  </Col>

)


}else {
this.props.history.push('/login');
}


const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
       onClick={this.handleClose}
     />,
     <FlatButton
       label="Submit"
       primary={true}
       keyboardFocused={true}
       onClick={this.handlePasswordChange}
     />,
   ];


    return (

<MuiThemeProvider>
      <div className="App">
      <br/>
<h3>My Profile</h3>
<br />
  {loader}
        <Grid fluid>
          <Row>
          {imgCol}
          {profileInfo}
          </Row>
          <br /><br /><br /><br />
<hr />
          <Row>
          <Col xs={12} md={4}  sm={4}>
          </Col>
          {settings}
          <Col xs={12} md={4}  sm={4}>
          </Col>
          </Row>

        </Grid>

              <Dialog
                  title="Change Password"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >

                      <TextField
                        floatingLabelText="Old Password"
                        type='password'
                        onChange={this.handleOldPassWordChange}
                        fullWidth={true}
                      /><br />

                      <TextField
                        floatingLabelText="New Password"
                        type='password'
                        onChange={this.handleNewPassWordChange}
                        fullWidth={true}
                      /><br />
                      <br />


                </Dialog>



      </div>

        <Snackbar
                open={this.state.snackopen}
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
    currentShow: state.shows.currentShow,
    user: state.user
          }
}


// export default connect(mapStateToProps, {fetchShowByID,UserFollowShow, UserUnFollowShow})(AboutShow);
// export default withRouter(connect(mapStateToProps, {LogoutUser})(Simple))
export default withRouter(connect(mapStateToProps,  {userProfile})(ProfilePage))
