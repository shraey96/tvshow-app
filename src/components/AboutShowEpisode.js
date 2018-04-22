import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchEpisodeByNumber} from '../actions/showsAction';
import { Grid, Row, Col } from 'react-flexbox-grid';
import striptags from 'striptags';

class AboutShowEpisode extends Component {

componentWillMount(){
  console.log("Mounted AboutShowEpisode");
  this.props.fetchEpisodeByNumber(this.props.match.params.tvshowid, this.props.match.params.season, this.props.match.params.enum);
  // this.props.fetchShowByID(this.props.match.params.id);
}

componentDidMount(){
}

  render() {
let currentShowEpisode;
let image;
let col1;
let col2;

console.log(this.props.currentShowEpisode);
if(this.props.currentShowEpisode){
currentShowEpisode = this.props.currentShowEpisode;
if(currentShowEpisode.image){
  image = <img src={currentShowEpisode.image.original}  height="390px" width="350px"/>;
}else {
  image = <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-tv-poster-irina-march.jpg" height="295px" width="210px"/>;
}

col1 = (


    <Col xs={12} md={12}>
      <div>
        {image}
      </div>
    </Col>

  )

  col2 = (
    <Col xs={12} md={12}>
      <div id={currentShowEpisode.id}>
      <p>Name: {currentShowEpisode.name} </p>
      <p>Season: {currentShowEpisode.season} </p>
      <p>Number: {currentShowEpisode.number} </p>
      <p>Run time: {currentShowEpisode.runtime} minutes</p>
      <p>Airdate: {currentShowEpisode.airdate}</p>
      <p>Sumamry: {striptags(currentShowEpisode.summary)} </p>
      </div>
      </Col>
    )


}else {
  currentShowEpisode = '';
  col1 = '';
  col2 = '';
}



    return (
      <div className="App FullHeight">

      <u><h3>About Show Episode</h3></u>
        <Grid fluid>
          <Row>
{col1}
{col2}
<br/>
          </Row>
        </Grid>
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
