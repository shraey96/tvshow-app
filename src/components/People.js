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

class People extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      personInfo : '',
      personShows : []
    }
  }

componentWillMount(){
  console.log("Mounted AboutShow");
  // this.props.fetchShowByID(this.props.match.params.id);
}

componentDidMount(){
  // console.log("############", this.props.currentShow);
  // this.setState({loader: true})
  //
  // fetch(`http://api.tvmaze.com/shows/${this.props.match.params.id}/episodes`)
  // .then(res=>res.json())
  // .then(episode=>{
  //
  //   this.setState({episodes: episode.reverse(), loader: false});
  //
  //   })

}

  render() {



    return (

<MuiThemeProvider>
      <div className="App">

      <u><h3>About Show</h3></u>
        <Grid fluid>
          <Row>

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


export default connect(mapStateToProps, {fetchShowByID})(People);
