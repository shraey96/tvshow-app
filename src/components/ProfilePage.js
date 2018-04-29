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
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import moment from 'moment';

import urlToUse from '../config';

class ProfilePage extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      profileInfo: ''
    }
  }

componentWillMount(){
  console.log("Mounted Profile Page");
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
              console.log(profile);
              if(profile.success===true){
              this.setState({loader: false, profileInfo:profile.info})
            }
            })
  })


}

updateToggles(type, bool){
  this.setState({loader: true})
  let data;

  console.log("update toggle");
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
          this.setState({loader: false, profileInfo:profile.info})
          this.props.userProfile(profile.info);
        }
          })

}

onToggleWeb = (e, value) =>{
  console.log(value);
  this.updateToggles('oneSignalNotif', value);
}

onToggleEmail = (e, value) =>{
  console.log(value);
  this.updateToggles('emailNotif', value);
}



handleRequestClose = () => {
this.setState({
  open: false,
});
};

  render() {

console.log(this.props.user);
console.log(this.props.shows);
let userShowInfo = this.props.user.userFollows;

let loader;
let imgCol;
let profileInfo;

let settings;

if(this.state.loader === true){
  loader = (<img src="http://backgroundcheckall.com/wp-content/uploads/2017/12/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}

if(this.props.user.isUserLoggedIn === true){

 imgCol = (
  <Col xs={12} md={4}  sm={4}>
  <img src={this.state.profileInfo.profile_Img || 'http://backgroundcheckall.com/wp-content/uploads/2017/12/ajax-loading-gif-transparent-background-5.gif'} />
  </Col>
)

profileInfo = (
    <Col xs={12} md={8}  sm={4}>
    <p><span>{this.state.profileInfo.username}</span> </p>
    <p><span>{this.state.profileInfo.email}</span> </p>
    <p>Date Joined: <span>{moment(this.state.profileInfo.created_at).format('MMMM Do YYYY')}</span> </p>
    </Col>
)


settings = (

  <Col xs={12} md={4}  sm={4}>
  <Toggle
  label="Web Push Notifications"
  labelPosition="left"
  onToggle={this.onToggleWeb}
  toggled={this.state.profileInfo.oneSignalNotif}
  />

  <Toggle
  label="Email Notifications"
  labelPosition="left"
  onToggle={this.onToggleEmail}
  toggled={this.state.profileInfo.emailNotif}
  />
  </Col>

)


}else {
  // alert("not logged in")
}

    return (

<MuiThemeProvider>
      <div className="App">
<h3>My Profile Page</h3>
<br />
  {loader}
        <Grid fluid>
          <Row>
          {imgCol}
          {profileInfo}
          </Row>
<hr />
          <Row>
          <Col xs={12} md={4}  sm={4}>
          </Col>
          {settings}
          <Col xs={12} md={4}  sm={4}>
          </Col>
          </Row>

        </Grid>

<Grid fluid>
<Row>


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
    currentShow: state.shows.currentShow,
    user: state.user
          }
}


// export default connect(mapStateToProps, {fetchShowByID,UserFollowShow, UserUnFollowShow})(AboutShow);
// export default withRouter(connect(mapStateToProps, {LogoutUser})(Simple))
export default withRouter(connect(mapStateToProps,  {userProfile})(ProfilePage))
