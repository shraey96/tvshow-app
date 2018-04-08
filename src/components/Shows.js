import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShows} from '../actions/showsAction';

class Shows extends Component {

componentWillMount(){
  console.log("Mounted");
}


  render() {



    return (
      <div className="App">

      Shows

      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows
          }
}


export default connect(mapStateToProps, {fetchShows})(Shows);
