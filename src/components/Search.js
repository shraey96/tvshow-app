import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchSearchQueryInfo} from '../actions/showsAction';
import {UserFollowShow} from '../actions/userAction';
import {Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Search extends Component {

componentWillMount(){
console.log("Mounted AboutShow");
this.props.fetchSearchQueryInfo((this.props.match.params.query));
// console.log(this.state);
}

componentWillReceiveProps(nextProps){
console.log(nextProps);
console.log(this.props);
if(nextProps.match.params.query!==this.props.match.params.query){
  console.log("no");
}else {
  console.log("y");
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
  this.props.UserFollowShow(data);
  }

}

render() {
let people;
let shows;
let days;
let button;

if(this.props.searchShow){

  shows = this.props.searchShow.map((show)=>{

    if(this.props.user.isUserLoggedIn === true){
    console.log("YES");
      if(this.props.user.userFollows.length>0){
          for(var i = 0; i<this.props.user.userFollows.length; i++){
              if(show.show.id === parseInt(this.props.user.userFollows[i].tvShowId)){
                button = (<button onClick={()=>{this.unFollow(show)}}>UnFollow</button>);
                break;
              }else {
                button = (<button onClick={()=>{this.Follow(show)}}>Follow</button>);
              }
          }
        }else {
          button = (<button onClick={()=>{this.Follow(show)}}>Follow</button>);
        }

    }else {
      console.log("NO");
      button = ""
    }

    let image;
    if(show.show.image){
      image = <Link to={`/shows/${show.show.name}/${show.show.id}`}><img src={show.show.image.medium}/></Link>
    }else {
      image = '';
    }
    return(

      <Col xs={12} md={3} key={show.show.id}>
      <div>
        {image} <br/>
        <u><Link to={`/shows/${show.show.name}/${show.show.id}`}>Name: {show.show.name}</Link></u>
        <p>Language: {show.show.language}</p>
        <p>Rating: {show.show.rating.average}</p>
        <p>Time: {show.show.schedule.time}</p>
        <p>Days:
         {show.show.schedule.days.map((day)=>{
          return ( day + ',')
        })}
        {button}
        </p>

      </div>
    </Col>
    )
  })
}else {
  shows = '';
}

if(this.props.searchPeople){
  people = this.props.searchPeople.map((person)=>{
    let image;
    let country;
    if(person.person.image){
      image = <img src={person.person.image.medium}/>
    }else {
      image = <img src="https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg" height="300px;" width="300px;"/>
    }

    if(person.person.country){
      country = <p>Country: {person.person.country.name}</p>
    }else {
      country = '';
    }
    return(
      <Col xs={12} md={3} key={person.id}>
      <div>
        {image}<br/>
        <u>Name: {person.person.name}</u>
        {country}
        <p>Birthday: {person.person.birthday}</p>
        <p>Gender: {person.person.gender}</p>
      </div>
    </Col>

    )
  })
}else {
  people = '';
}


    return (

      <Grid fluid>
            <h2>Shows</h2>
        <Row>
{shows}
        </Row>
        <br/>
        <hr/>
        <br/>
            <h2>People</h2>
        <Row>
{people}
        </Row>
     </Grid>

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


export default connect(mapStateToProps, {fetchSearchQueryInfo, UserFollowShow})(Search);
