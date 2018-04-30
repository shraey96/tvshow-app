import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchSearchQueryInfo} from '../actions/showsAction';
import {UserFollowShow, UserUnFollowShow} from '../actions/userAction';
import {Link} from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Animated} from "react-animated-css";
import RaisedButton from 'material-ui/RaisedButton';

class Search extends Component {
  constructor(){
    super();
    this.state = {
      value : '',
      open: false,
      msg: '',
      loader: false
    }
  }
componentWillMount(){
  // console.log(this.props);
// console.log("Mounted AboutShow");
let searchQuery = this.props.fetchSearchQueryInfo((this.props.match.params.query));
// console.log(searchQuery);
searchQuery.then((search)=>{
  // console.log(search);
})
// console.log(this.state);
}

componentWillReceiveProps(nextProps){
// console.log(nextProps);
// console.log(this.props);
if(nextProps.match.params.query!==this.props.match.params.query){
  // console.log("no");
  this.props.fetchSearchQueryInfo((nextProps.match.params.query));
}else {
  // console.log("y");
}
// this.props.fetchSearchQueryInfo((nextProps.match.params.query));
}
// {show.show.genres.map((genre)=>{
//   return (<p key={genre}>Genres: {genre}</p>)
// })}

Follow = (tvShowInfo) => {

  if(this.props.user.isUserLoggedIn === false){
  alert("PLEASE LOGIN FIRST");
  }else {
  let data = {
    tvid: String(tvShowInfo.show.id),
    imdb: tvShowInfo.show.externals.imdb,
    tvname: tvShowInfo.show.name,
    tvimg:  tvShowInfo.show.image.medium
  }
  let userFollow = this.props.UserFollowShow(data);
  userFollow.then((show)=>{
    if(show.success === true){
      this.setState({open: true, msg: `Show Followed!`});
    }else {
      this.setState({open: true, msg: `There was some problem.`});
    }
  })
  }

}

unFollow = (tvShowInfo) => {
  // console.log(tvShowInfo);
  let data = {
    tvid: tvShowInfo.show.id
  }
  let userShowUnfollow = this.props.UserUnFollowShow(data)
  userShowUnfollow.then((show)=>{
    if(show.success === true){
      this.setState({open: true, msg: `Show unfollowed!`});
  }else {
      this.setState({open: true, msg: `There was some problem.`});
  }
})
}

render() {
let people;
let shows;
let days;
let button;

let showsHeader;
let peopleHeader;

let hrLine;
let noResultsText;

let loader;

if(this.state.loader === true){
  loader = (<img src="https://s3.amazonaws.com/binged-images/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}


if(this.props.searchShow.length>0){

showsHeader = (<h2>Shows</h2>);

  shows = this.props.searchShow.map((show)=>{

    if(this.props.user.isUserLoggedIn === true){
    // console.log("YES");
      if(this.props.user.userFollows.length>0){
          for(var i = 0; i<this.props.user.userFollows.length; i++){
              if(show.show.id === parseInt(this.props.user.userFollows[i].tvShowId)){
                button = (<RaisedButton label="UnFollow" secondary={true}  onClick={()=>{this.unFollow(show)}}/>);
                break;
              }else {
                button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(show)}}/>);
              }
          }
        }else {
          button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(show)}}/>);
        }

    }else {
      // console.log("NO");
      button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(show)}}/>);
    }

    let image;
    if(show.show.image){
      image = <Link to={`/shows/${show.show.name}/${show.show.id}`}><img className="show_img" src={show.show.image.medium}/></Link>
    }else {
      image = <Link to={`/shows/${show.show.name}/${show.show.id}`}><img className="show_img" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-tv-poster-irina-march.jpg" height="295px" width="210px"/></Link>
    }
    return(

      <Col xs={12} md={3} sm={4} key={show.show.id}>

<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
      <div className="tvpopular">
        {image} <br/>
      <p className="show_name"><Link className="tvpopularLink" to={`/shows/${show.show.name}/${show.show.id}`}>{show.show.name}</Link></p>
        {button}
      </div>
</Animated>

    </Col>
    )
  })
}else {
  shows = '';
  showsHeader = '';
}

if(this.props.searchPeople.length>0){

  peopleHeader = <h2>People</h2>

  people = this.props.searchPeople.map((person)=>{
    let image;
    let country;
    if(person.person.image){
      image = <Link to={`/people/${person.person.name}/${person.person.id}`}><img className="show_img" src={person.person.image.medium}/></Link>
    }else {
      image = <Link to={`/people/${person.person.name}/${person.person.id}`}><img className="show_img" src="https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg" height="300px;" width="300px;"/></Link>
    }

    if(person.person.country){
      country = <p style={{"color":"white"}}>{person.person.country.name}</p>
    }else {
      country = '';
    }
    return(
      <Col xs={12} md={3} key={person.id}>

<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
      <div>
        {image}<br/>
      <b className="show_name"><Link className="tvpopularLink" to={`/people/${person.person.name}/${person.person.id}`}>{person.person.name}</Link></b><br />

        {country}
      </div>
</Animated>

    </Col>

    )
  })
}else {
  people = '';
  peopleHeader = '';
}

if(this.props.searchShow.length>0 && this.props.searchPeople.length>0){
  hrLine = (<hr/>);
  // noResultsText = '';
}else {
  hrLine = '';
  // console.log(this.props.searchShow.length, this.props.searchPeople.length);
  // console.log(this.props.searchPeople.length>0);
  // noResultsText = (<h3>No Shows or People Found!</h3>);
}

    return (

<MuiThemeProvider>
<div>
  <Grid fluid>
        {showsHeader}
    <Row>
{shows}
    </Row>
    <br/>
    {hrLine}
    {noResultsText}
    <br/>
        <h2>{peopleHeader}</h2>
    <Row>
{people}
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
    currentShow: state.shows.currentShow,
    searchPeople: state.shows.searchPeople,
    searchShow: state.shows.searchShow,
    user: state.user
          }
}


export default connect(mapStateToProps, {fetchSearchQueryInfo, UserFollowShow, UserUnFollowShow})(Search);
