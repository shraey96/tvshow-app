import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {followEpisode} from '../actions/userAction';



class Episodes extends Component {

  constructor(){
    super();
    this.state = {
      value : ''
    }

  }

componentWillMount(){
    console.log("Mounted");
  }

handleWatch = (episode_num, showid) =>{
  console.log(this.props);
  console.log(episode_num,showid);
  let data = {
    tvid: showid,
    episodeid: episode_num,
    imdb: this.props.shows.currentShow.externals.imdb,
    tvname: this.props.shows.currentShow.name,
    tvimg: this.props.shows.currentShow.image.medium
  };
  console.log(data);

  this.props.followEpisode(data);

}



  render() {

    let episodes='';
    let showid = (this. props.showid);
      // this.handleWatch = this.handleSubmit.bind(this);



    if(this.props.episodes){
      episodes = this.props.episodes.map((episode, i)=>{

        return(
          <tr key={episode.id}>
            <td>{episode.season}</td>
            <td>{episode.number}</td>
            <td>{episode.name}</td>
            <td>{episode.runtime}</td>
            <td>{episode.airdate}</td>
            <td><button onClick={()=>{this.handleWatch(episode.id, showid)}}>Watch</button></td>
          </tr>

        )
      })
    }
    else {
      episodes = ""
    }


    return (
      <table className="App">
      <tr>
      <th>Season</th>
      <th>Episode Number</th>
      <th>Episode Name</th>
      <th>Episode Runtime</th>
      <th>Episode Airdate</th>
      <th>Watched?</th>
      </tr>
      <tbody>
      {episodes}
      </tbody>
      </table>

    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
    user: state.user
          }
}


export default connect(mapStateToProps, {followEpisode})(Episodes);
