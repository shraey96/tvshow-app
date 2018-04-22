import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {followEpisode, unFollowEpisode} from '../actions/userAction';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Episodes extends Component {

  constructor(){
    super();
    this.state = {
      value : '',
      msg : '',
      open: false,
    }

  }

componentWillMount(){
    console.log("Mounted");
  }

handleWatch = (episode_num, showid) =>{
  if(this.props.user.isUserLoggedIn === true){
  let data = {
    tvid: showid,
    episodeid: episode_num,
    imdb: this.props.shows.currentShow.externals.imdb,
    tvname: this.props.shows.currentShow.name,
    tvimg: this.props.shows.currentShow.image.medium
  };

  let watch = this.props.followEpisode(data);
  watch.then((episode)=>{
    if(episode.success===true){
        this.setState({open: true, msg: `Episode watched!`});
    }else {
        this.setState({open: true, msg: `There was some problem.`});
    }
  })
}
else {
  this.setState({open: true, msg: `Login First!`});
}

}

handleUnWatch = (episode_num, showid) =>{
  console.log(episode_num, showid);
  let data = {
    tvid: showid,
    episodeid: episode_num
  }

  let unWatch = this.props.unFollowEpisode(data);
  unWatch.then((episode)=>{
    console.log(episode);
  if(episode.success===true){
      this.setState({open: true, msg: `Episode Unwatched!`});
  }else {
      this.setState({open: true, msg: `There was some problem.`});
  }
  })
}

handleRequestClose = () => {
this.setState({
  open: false,
});
};


handlePreviousEpisodeWatch = (episodeid, showid) =>{
  console.log(episodeid, showid);
  let episodesPrevious = []
  console.log(this.props);
  for(let i=0; i<this.props.episodes.length; i++){
      console.log(this.props.episodes[i].id );
    if(this.props.episodes[i].id === episodeid){
      console.log("done");
      break;
    }else {
      episodesPrevious.push(this.props.episodes[i].id);
    }
  }
  episodesPrevious.push(episodeid);
  console.log(episodesPrevious);
}


  render() {



    let episodes='';
    let showid = (this.props.showid);
    let presentShowArray = [];
    let button;
    let buttonAll;

if(this.props.user.isUserLoggedIn === true){
   presentShowArray = this.props.user.userFollows.filter((follow)=>{
    return  parseInt(follow.tvShowId) === parseInt(this.props.showid)
  })
  console.log(presentShowArray);
  if(!presentShowArray[0]){
  presentShowArray = [];
  }else {
  presentShowArray = (presentShowArray[0].episodeWatched);
  console.log(presentShowArray);
  }

}

let loader;
if(this.props.loader === true){
  loader = <img src="http://backgroundcheckall.com/wp-content/uploads/2017/12/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>
}else {
  loader = <h3>Episodes</h3>;
}

  console.log(this.props.episodes);
  let header;
    if(this.props.episodes.length>0){
      let count;
      let tag;
      // header = (<tr>
      //     <th></th>
      //     <th>Episode Number</th>
      //     <th>Episode Name</th>
      //     <th>Episode Runtime</th>
      //     <th>Episode Airdate</th>
      //     <th>Watched?</th>
      //     </tr>);

      header = (
        <TableHeader displaySelectAll={false}>
        <TableRow>
        <TableHeaderColumn></TableHeaderColumn>
        <TableHeaderColumn>Episode Name</TableHeaderColumn>
        <TableHeaderColumn>Episode Airdate</TableHeaderColumn>
        <TableHeaderColumn>Watched?</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        )

      if(this.props.episodes[0]){
        console.log("present");
        count=0;
      }

      let newEpisodeArray = []

      episodes = this.props.episodes.map((episode, i)=>{

        // if(count === episode.season){
        //   newEpisodeArray.push(episode.id);
        // }else {
        //   newEpisodeArray = [];
        // }
        // console.log(newEpisodeArray);
        // console.log(presentShowArray);
        //
        // let found = newEpisodeArray.some(r=> presentShowArray.indexOf(r) >= 0)
        // console.log(found);
        // console.log(episode);
        // if(found === true){
        //   buttonAll = (<button onClick={()=>{this.handleUnWatch(episode.id, showid)}}>UnWatch All</button>);
        // }else {
        //   buttonAll = (<button onClick={()=>{this.handleSeasonWatch(episode.id, showid)}}>Watch All</button>);
        // }

        let episodeIn = (presentShowArray.indexOf(episode.id))
        if(episodeIn>-1){
          button = (<button onClick={()=>{this.handleUnWatch(episode.id, showid)}}>UnWatch</button>);
          buttonAll = (<button onClick={()=>{this.handleUnWatch(episode.id, showid)}}>UnWatch All</button>);
        }else {
          button = (<button onClick={()=>{this.handleWatch(episode.id, showid)}}>Watch</button>);
          buttonAll = (<button onClick={()=>{this.handlePreviousEpisodeWatch(episode.id, showid)}}>Watch All</button>);
        }

        if(count===episode.season){
          tag = (<h3></h3>)
        }else {
          count=episode.season
          tag= (<div><h3>Season: {count}</h3></div>)
        }


        return(

       <TableRow key={episode.id}>
       <TableRowColumn>{tag}</TableRowColumn>
       <TableRowColumn>
         <Link className="tvpopularLink" to={`/shows/${this.props.showName}/${this.props.showid}/${episode.season}/episode/${episode.number}`}>
         {episode.name}
         </Link>  (S{episode.season}E{episode.number})

       </TableRowColumn>
       <TableRowColumn>{episode.airdate}</TableRowColumn>
       <TableRowColumn>{button} {buttonAll}</TableRowColumn>
       </TableRow>

        )
      })
    }
    else {
      episodes = "";
      header= ""
    }




    return (
      <div>
        {loader}
      <Table>
        {header}
       <TableBody displayRowCheckbox={false}>
      {episodes}
      </TableBody>
      </Table>

      <Snackbar
                open={this.state.open}
                message={this.state.msg}
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose}
        />

      </div>

    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
    user: state.user
          }
}


export default connect(mapStateToProps, {followEpisode, unFollowEpisode})(Episodes);
