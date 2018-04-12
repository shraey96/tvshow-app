import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Episodes from './Episodes';
import Cast from './Cast';

class AboutShow extends Component {

  constructor(){
    super()
    this.state = {
      episodes : []
    }
  }

componentWillMount(){
  console.log("Mounted AboutShow");
  this.props.fetchShowByID(this.props.match.params.id);
}

componentDidMount(){
  console.log("############", this.props.currentShow);

  fetch(`http://api.tvmaze.com/shows/${this.props.match.params.id}/episodes`)
  .then(res=>res.json())
  .then(episode=>{
    // console.log(episode);

    this.setState({episodes: episode});

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

    // <p>Sumamry: {currentShow.summary} </p>

  )
col2 = (
  <Col xs={12} md={6}>
      <p>Name: {currentShow.name} </p>
      <p>Language: {currentShow.language} </p>
      <p>Run time: {currentShow.runtime} minutes</p>
      <a href={currentShow.officialSite}>officialSite</a>
      <p>Rating: {currentShow.rating.average}</p>
      <p>Sumamry: {this.props.currentShow.summary} </p>
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
<Episodes episodes={this.state.episodes} showid={this.props.match.params.id}></Episodes>
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
