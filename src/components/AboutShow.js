import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import striptags from 'striptags';

import Episodes from './Episodes';
import Cast from './Cast';

class AboutShow extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      episodes : []
    }
  }

componentWillMount(){
  console.log("Mounted AboutShow");
  this.props.fetchShowByID(this.props.match.params.id);
}

componentDidMount(){
  console.log("############", this.props.currentShow);
  this.setState({loader: true})

  fetch(`http://api.tvmaze.com/shows/${this.props.match.params.id}/episodes`)
  .then(res=>res.json())
  .then(episode=>{

    this.setState({episodes: episode.reverse(), loader: false});

    })

}

  render() {

let currentShow = this.props.currentShow;
let currentShowInfo;
let col1;
let col2;

if(currentShow){
  let image;
if(currentShow.image){
  image = <img src={currentShow.image.medium}/>
}else {
  image = ''
}

col1 = (


    <Col xs={12} md={6}>
      <div>
        {image}
      </div>
    </Col>

  )
col2 = (
  <Col xs={12} md={6}>
      <p>Name: {currentShow.name} </p>
      <p>Language: {currentShow.language} </p>
      <p>Run time: {currentShow.runtime} minutes</p>
      <a href={currentShow.officialSite}>officialSite</a>
      <p>Rating: {currentShow.rating.average}</p>
      <p>Summary: {striptags(this.props.currentShow.summary)} </p>
      <p><Link to={`/shows/cast/${currentShow.name}/${currentShow.id}`}>Cast</Link></p>
      <p><Link to={`/shows/crew/${currentShow.name}/${currentShow.id}`}>Crew</Link></p>
      <p></p>
    </Col>
  )
}else {
  currentShowInfo = "";
  col1='';
  col2='';
}

    return (

<MuiThemeProvider>
      <div className="App">

      <u><h3>About Show</h3></u>
        <Grid fluid>
          <Row>
{col1}
{col2}
<br/>
          </Row>
        </Grid>

<Grid fluid>
<Row>

<Col md={12} xs={12}>
<Episodes episodes={this.state.episodes} showid={this.props.match.params.id} loader={this.state.loader} showName={this.props.match.params.tvshow}></Episodes>
</Col>

</Row>
</Grid>



      </div>
</MuiThemeProvider>
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
