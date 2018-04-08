import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchSearchQueryInfo} from '../actions/showsAction';
import {Link} from 'react-router-dom'
class Search extends Component {

componentWillMount(){
  console.log("Mounted AboutShow");
this.props.fetchSearchQueryInfo((this.props.match.params.query));
}

componentWillReceiveProps(nextProps){
this.props.fetchSearchQueryInfo((nextProps.match.params.query));
}

  render() {
let people;
let shows;

if(this.props.searchShow){
  shows = this.props.searchShow.map((show)=>{
    let image;
    if(show.show.image){
      image = <Link to={`/shows/${show.show.name}/${show.show.id}`}><img src={show.show.image.medium}/></Link>
    }else {
      image = '';
    }
    return(
      <div key={show.show.id}>
        {image} <br/>
        <u><Link to={`/shows/${show.show.name}/${show.show.id}`}>Name: {show.show.name}</Link></u>
        <p>Language: {show.show.language}</p>
        <p>Rating: {show.show.rating.average}</p>
        <p>Time: {show.show.schedule.time}</p>
        {show.show.schedule.days.map((day)=>{
          return (<p key={day}>Days: {day}</p>)
        })}
        {show.show.genres.map((genre)=>{
          return (<p key={genre}>Genres: {genre}</p>)
        })}
      </div>
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
      image = ''
    }

    if(person.person.country){
      country = <p>Country: {person.person.country.name}</p>
    }else {
      country = '';
    }
    return(
      <div id={person.id}>
        {image}<br/>
        <u>Name: {person.person.name}</u>
        {country}
        <p>Birthday: {person.person.birthday}</p>
        <p>Gender: {person.person.gender}</p>
      </div>
    )
  })
}else {
  people = '';
}


    return (
      <div className="App FullHeight">

      <u><h3>SearchComponent</h3></u>
      <h2>Shows</h2>
      {shows}
      <h2>People</h2>
      {people}
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
    currentShow: state.shows.currentShow,
    searchPeople: state.shows.searchPeople,
    searchShow: state.shows.searchShow
          }
}


export default connect(mapStateToProps, {fetchSearchQueryInfo})(Search);
