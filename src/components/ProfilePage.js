import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';
import {withRouter} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {UserFollowShow, UserUnFollowShow} from '../actions/userAction';
import striptags from 'striptags';
import Snackbar from 'material-ui/Snackbar';
import Episodes from './Episodes';
import RaisedButton from 'material-ui/RaisedButton';

import { SocialIcon } from 'react-social-icons';
import ShareButton from 'react-social-share-buttons';

import { Google } from 'react-social-sharing';
import { Twitter } from 'react-social-sharing';
import { Facebook } from 'react-social-sharing';

class ProfilePage extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      episodes : [],
      showid: ''
    }
  }

componentWillMount(){
  console.log("Mounted Profile Page");

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
let button;
let info1;
let info2;
let info3;

let loader;

if(this.state.loader === true){
  loader = (<img src="http://backgroundcheckall.com/wp-content/uploads/2017/12/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}

if(this.props.user.isUserLoggedIn === true){

}else {
  alert("not logged in")
}

    return (

<MuiThemeProvider>
      <div className="App">
<h3>My Profile Page</h3>
<br />

        <Grid fluid>
          <Row>

          <br/>
          </Row>
          <br /><br /><br />
          <Row>


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
export default withRouter(connect(mapStateToProps,  {})(ProfilePage))
