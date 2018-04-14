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
  if(this.props.user.isUserLoggedIn === true){
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
else {
  alert("Login first!");
}

}

handleUnWatch = (episode_num, showid) =>{
  console.log(episode_num, showid);
}


  render() {



    let episodes='';
    let showid = (this.props.showid);
    let presentShowArray = [];
    let button;

if(this.props.user.isUserLoggedIn === true){
   presentShowArray = this.props.user.userFollows.filter((follow)=>{
    return  parseInt(follow.tvShowId) === parseInt(this.props.showid)
  })
  console.log(presentShowArray);
  if(!presentShowArray[0]){
    presentShowArray = [];
  }else {
  presentShowArray = (presentShowArray[0].episodeWatched);
  }

}
  console.log(this.props.episodes);

    if(this.props.episodes){
      let count;
      let tag;
      // let count = (this.props.episodes[0].season);
      if(this.props.episodes[0]){
        console.log("present");
        count=0;
      }


      episodes = this.props.episodes.map((episode, i)=>{
        // console.log(episode);
          if(count===episode.season){
            tag = (<h3></h3>)
          }else {
            count=episode.season
            tag= (<h3>Season: {count}</h3>)
          }
        let episodeIn = (presentShowArray.indexOf(episode.id))
        if(episodeIn>-1){
          button = (<button onClick={()=>{this.handleUnWatch(episode.id, showid)}}>UnWatch</button>)
        }else {
          button = (<button onClick={()=>{this.handleWatch(episode.id, showid)}}>Watch</button>)
        }
// for(var i = 0; i<presentShowArray.length; i++){

// }



        return(
          <tr key={episode.id}>
            <td>{tag}</td>
            <td>{episode.name}</td>
            <td>{episode.runtime}</td>
            <td>{episode.airdate}</td>
            <td>{button}</td>
          </tr>

        )
      })
    }
    else {
      episodes = ""
    }


    return (
      <table className="App episodeTable">
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
