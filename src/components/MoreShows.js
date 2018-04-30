import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreShowsSearch from './MoreShowsSearch';
import SearchShowsResult from './SearchShowsResult';
import { Helmet } from "react-helmet";


class MoreShows extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      episodes : []
    }
  }


  render() {


    return (

<MuiThemeProvider>
      <div className="App">
        <br />
<MoreShowsSearch />
<SearchShowsResult />
      </div>


      <Helmet>
        <title>Binged! Browse Shows According to Your Choice!</title>
        <meta name="description" content="Browse, Follow and Keep Track of Your Favourite Shows!" />
        <meta name="og:type" content="video.movie" />
        <meta name="og:title" content="Browse Popular TV Shows Airing Tonight!" />
        <meta name="og:description" content="Built with React/Express" />
      </Helmet>

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


export default connect(mapStateToProps, {fetchShowByID})(MoreShows);
