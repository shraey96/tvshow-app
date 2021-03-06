import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchEpisodeByNumber} from '../actions/showsAction';
import { Grid, Row, Col } from 'react-flexbox-grid';
import striptags from 'striptags';

import { Helmet } from "react-helmet";

class AboutShowEpisode extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      episodes : []
    }
  }

componentWillMount(){
  // console.log("Mounted AboutShowEpisode");
  this.setState({loader: true});
  let fetchEpisodeByNumber = this.props.fetchEpisodeByNumber(this.props.match.params.tvshowid, this.props.match.params.season, this.props.match.params.enum);
  // this.props.fetchShowByID(this.props.match.params.id);
  fetchEpisodeByNumber.then((result)=>{
    if(result.success===true){
      this.setState({loader: false});
    }
  })
}

componentDidMount(){
}

  render() {
let currentShowEpisode;
let image;
let col1;
let col2;

let loader;

if(this.state.loader === true){
  loader = (<img src="https://s3.amazonaws.com/binged-images/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}

// console.log(this.props.currentShowEpisode);
// console.log(this.props.match);
if(this.props.currentShowEpisode){
currentShowEpisode = this.props.currentShowEpisode;
if(currentShowEpisode.image){
  image = <img src={currentShowEpisode.image.medium}/>;
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
      <div id={currentShowEpisode.id} className="about_show_episode">
      <p>Name: {currentShowEpisode.name} </p>
      <p>Season: {currentShowEpisode.season} </p>
      <p>Episode Number: {currentShowEpisode.number} </p>
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

      <h3 className="headingPopular">{this.props.match.params.tvshowname} (S{this.props.currentShowEpisode.season}E{this.props.currentShowEpisode.number})</h3>
<br/>
      <Grid fluid>
          <Row>
{col1}
{col2}
<br/>
          </Row>
        </Grid>

        <Helmet>
          <title>Binged!: {this.props.match.params.tvshow} Episodes</title>
          <meta name="description" content="Browse, Follow and Keep Track of Your Favourite Shows!" />
          <meta name="og:type" content="video.movie" />
          <meta name="og:title" content="Browse Popular TV Shows Airing Tonight!" />
          <meta name="og:description" content="Built with React/Express" />
        </Helmet>

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
