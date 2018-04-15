import React, { Component } from 'react';
import logo from '../logo.svg';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';

import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {LogoutUser} from '../actions/userAction'

import '../App.css';


class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value : ''
        };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e){
    e.preventDefault();
    this.props.history.push(`/search/${this.state.value}`);
    this.setState({value:''});
  }

  handleChange(e){
    this.setState({value: e.target.value})
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  Logout = () =>{
    this.props.LogoutUser();
  }

  render() {
console.log("Navbar!" , this.props.user);

let user;
let userNotLoggedIn =  (
  <div>
      <Link className="sideLink" to={`/`}>
      <MenuItem>
      Home
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/login/`}>
      <MenuItem>
      Login
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/calendar/`}>
      <MenuItem>
      Calendar
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/about/`}>
      <MenuItem>
      About
      </MenuItem>
      </Link>
</div>
    )

let userLoggedIn = (
  <div>
      <Link className="sideLink" to={`/`}>
      <MenuItem>
      Home
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/login/`}>
      <MenuItem>
      Welcome {this.props.user.userProfile.username}
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/${this.props.user.userProfile.username}/myshows`}>
      <MenuItem>
      My Shows
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/calendar/`}>
      <MenuItem>
      Calendar
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/about/`}>
      <MenuItem>
      About
      </MenuItem>
      </Link>


      <MenuItem className="sideLink" onClick={this.Logout}>
      Logout
      </MenuItem>
</div>

)

if(this.props.user.isUserLoggedIn === false){
user = userNotLoggedIn;
}else {
  user = userLoggedIn;
}

    const rightButtons = (
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField hintText="Search for a show or person" name="search" onChange={this.handleChange}/>
          </form>
        </div>
      );

    return(
       <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

    <AppBar
      title="Binged"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      onLeftIconButtonClick = {this.handleToggle}
      onRequestChange={(open) => this.setState({open})}
      iconElementRight={rightButtons}
    />

    <Drawer open={this.state.open}
      docked={false}
      open={this.state.open}
      onRequestChange={(open) => this.setState({open})}>

      {user}
  </Drawer>


      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = function(state){
  return {
    user: state.user
    // shows: state.shows,
    // currentShow: state.shows.currentShow,
    // searchPeople: state.shows.searchPeople,
    // searchShow: state.shows.searchShow
          }
}


// export default withRouter(Simple)
export default withRouter(connect(mapStateToProps, {LogoutUser})(Simple))
