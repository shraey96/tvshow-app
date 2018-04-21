import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreShowsSearch from './MoreShowsSearch';
import SearchShowsResult from './SearchShowsResult';
class MoreShows extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      episodes : []
    }
  }

componentWillMount(){

}

componentDidMount(){


}

  render() {


    return (

<MuiThemeProvider>
      <div className="App">
MoreShows
<MoreShowsSearch />
<SearchShowsResult />
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


export default connect(mapStateToProps, {fetchShowByID})(MoreShows);
