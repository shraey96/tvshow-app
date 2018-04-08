import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchEpisodeByNumber} from '../actions/showsAction';

class AboutShowEpisode extends Component {

componentWillMount(){
  console.log("Mounted AboutShowEpisode");
  this.props.fetchEpisodeByNumber(this.props.match.params.tvshowid, this.props.match.params.season, this.props.match.params.enum);
  // this.props.fetchShowByID(this.props.match.params.id);
}

componentDidMount(){
}

  render() {
let currentShowEpisode
let image
if(this.props.currentShowEpisode){
currentShowEpisode = this.props.currentShowEpisode;
if(currentShowEpisode.image){
  image = currentShowEpisode.image.medium;
}else {
  image = ''
}
currentShowEpisode = <div id={currentShowEpisode.id}>
    <p>Name: {currentShowEpisode.name} </p>
    <p>Season: {currentShowEpisode.season} </p>
    <p>Number: {currentShowEpisode.number} </p>
    <p>Run time: {currentShowEpisode.runtime} minutes</p>
    <p>Airdate: {currentShowEpisode.airdate}</p>
      {image}
    <p>Sumamry: {currentShowEpisode.summary} </p>
    </div>;
}else {
  currentShowEpisode = '';
}



    return (
      <div className="App FullHeight">

      <u><h3>About Show</h3></u>
    {currentShowEpisode}
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    // shows: state.shows,
    currentShowEpisode: state.shows.currentShowEpisode
          }
}


export default connect(mapStateToProps, {fetchEpisodeByNumber})(AboutShowEpisode);
