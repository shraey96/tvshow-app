import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

class AboutShow extends Component {

componentWillMount(){
  console.log("Mounted AboutShow");
  this.props.fetchShowByID(this.props.match.params.id);
}

componentDidMount(){
  console.log("############", this.props.currentShow);
}

  render() {
let currentShow = this.props.currentShow;
let currentShowInfo;
if(currentShow){
  let image;
if(currentShow.image){
  image = <img src={currentShow.image.medium}/>
}else {
  image = ''
}
currentShowInfo = <div id={currentShow.id}>
    <p>Name: {currentShow.name} </p>
    <p>Language: {currentShow.language} </p>
    <p>Run time: {currentShow.runtime} minutes</p>
    <a href={currentShow.officialSite}>officialSite</a>
    <p>Rating: {currentShow.rating.average}</p>
    {image}
    <p>Sumamry: {currentShow.summary} </p>
    </div>

}else {
  currentShowInfo = "";
}


    return (
      <div className="App FullHeight">

      <u><h3>About Show</h3></u>
      {currentShowInfo}
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
    currentShow: state.shows.currentShow
          }
}


export default connect(mapStateToProps, {fetchShowByID})(AboutShow);
