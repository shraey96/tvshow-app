import React, { Component } from 'react';
import logo from '../logo.svg';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import AutoComplete from 'material-ui/AutoComplete';

import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {LogoutUser} from '../actions/userAction';

import '../App.css';


class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value : '',
      opensnack: false,
      dataSource: [],
      msg: ''
        };


  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.history.push(`/search/${this.state.value}`);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps NAVBAR $##############", nextProps);
  }

  handleChange = (value) =>{
    // console.log(value);
  //   value  = value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
  //     return letter.toUpperCase();
  // });
  // value = value.toString();
  // console.log(value);
    this.setState({value: value}, ()=>{
      // `http://api.tvmaze.com/search/shows?q=${query}`
      let showArray = []
      fetch(`http://api.tvmaze.com/search/shows?q=${this.state.value}`)
          .then(res=>res.json())
          .then(show=>
            {
              show.forEach((show)=>{
                let objToPush = {
                  id: show.show.id,
                  name: show.show.name
                }
                // showArray.push(show.show.name);
                showArray.push(objToPush);
              })
              this.setState({dataSource: showArray}, ()=>{
                console.log(this.state.dataSource);
              })

            })
      })
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  Logout = () =>{
    let logoutUser = this.props.LogoutUser();
    logoutUser.then((logout)=>{
      if(logout.success === true){
        this.setState({opensnack: true, msg: `Logout Success!`}, ()=>{
          this.handleClose();
          setTimeout(()=>{
             this.props.history.push('/');
          }, 1000)
        });
      }
    })
  }

  onNewRequest = (selectedValue) => {
    if(selectedValue.name || selectedValue.id){
    this.props.history.push(`/shows/${selectedValue.name}/${selectedValue.id}`);
    }
    this.setState({dataSource: []})
  }

  handleRequestClose = () => {
  this.setState({
    opensnack: false,
  });
  };

  render() {
console.log("Navbar!" , this.props.user);

let user;
let userNotLoggedIn =  (
  <div>
      <Link className="sideLink" to={`/`}>
      <MenuItem onClick={this.handleClose}>
      Home
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/more-shows`}>
      <MenuItem  onClick={this.handleClose}>
      More Shows
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/register/`}>
      <MenuItem  onClick={this.handleClose}>
      Register
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/login/`}>
      <MenuItem  onClick={this.handleClose}>
      Login
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/calendar/`}>
      <MenuItem  onClick={this.handleClose}>
      Calendar
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/about/`}>
      <MenuItem  onClick={this.handleClose}>
      About
      </MenuItem>
      </Link>
</div>
    )



let userLoggedIn = (
  <div>
      <Link className="sideLink" to={`/`}>
      <MenuItem  onClick={this.handleClose}>
      Home
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/more-shows`}>
      <MenuItem  onClick={this.handleClose}>
      More Shows
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/${this.props.user.userProfile.username}/profile`}>
      <MenuItem  onClick={this.handleClose}>
      {this.props.user.userProfile.username}s Profile
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/${this.props.user.userProfile.username}/myshows`}>
      <MenuItem  onClick={this.handleClose}>
      My Shows
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/calendar/`}>
      <MenuItem  onClick={this.handleClose}>
      Calendar
      </MenuItem>
      </Link>

      <Link className="sideLink" to={`/about/`}>
      <MenuItem  onClick={this.handleClose}>
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
// <TextField hintText="Search for a show or person" name="search" onChange={this.handleChange}/>

    const rightButtons = (
        <div>
          <form onSubmit={this.handleSubmit}>

              <AutoComplete
                  hintText="Search for a show or person.."
                  dataSource={this.state.dataSource}
                  onUpdateInput={this.handleChange}
                  onNewRequest={ this.onNewRequest}
                  dataSourceConfig={ {text: 'name', value: 'id'} }
                  filter={AutoComplete.caseInsensitiveFilter}
              />
          </form>
        </div>
      );


      // <AppBar
      //   title="Binged"
      //   iconClassNameRight="muidocs-icon-navigation-expand-more"
      //   onLeftIconButtonClick = {this.handleToggle}
      //   onRequestChange={(open) => this.setState({open})}
      //   iconElementRight={rightButtons}
      // />

    return(
       <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
         <div>
    <AppBar
      title="Binged"
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

  <Snackbar
            open={this.state.opensnack}
            message={this.state.msg}
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
    />
</div>
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
