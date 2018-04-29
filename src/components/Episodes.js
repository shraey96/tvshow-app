import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {followEpisode, unFollowEpisode} from '../actions/userAction';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


class Episodes extends Component {

  constructor(){
    super();
    this.state = {
      loader: false,
      value : '',
      msg : '',
      open: false,
      episodes: []
    }

  }

componentWillMount(){
    console.log("Mounted episodes page");
    console.log(this.props.match.params);
    this.fetchEpisodesByID(this.props.shows.currentShow.id || this.props.match.params.id)
  }

  fetchEpisodesByID(showid){
    this.setState({loader: true})

    fetch(`https://api.tvmaze.com/shows/${this.props.match.params.id}/episodes`)
    .then(res=>res.json())
    .then(episode=>{

      this.setState({episodes: episode.reverse(), loader: false});

      })
  }


handleWatch = (episode_num, showid, type) =>{

  console.log("episode watch: ", episode_num, type);
  if(this.props.user.isUserLoggedIn === true){
    let episodes = [];
    if(type === 0 ){
      episodes.push(episode_num);
    }else {
      for(let i=0; i<this.state.episodes.length; i++){
          console.log(this.state.episodes[i].id );
        if(this.state.episodes[i].id === episode_num){
          console.log("done");
          break;
        }else {
          console.log("push");
          episodes.push(this.state.episodes[i].id);
        }
      }
      episodes.push(episode_num)
      console.log("episodes: ", episodes);
    }

  let data = {
    tvid: showid,
    episodeid: episodes,
    // imdb: this.props.shows.currentShow.externals.imdb,
    // tvname: this.props.shows.currentShow.name,
    // tvimg: this.props.shows.currentShow.image.medium,
    request: 'add'
  };

  let watch = this.props.followEpisode(data);
  watch.then((episode)=>{
    if(episode.success===true){
        this.setState({open: true, msg: `Episode(s) watched!`});
    }else {
        this.setState({open: true, msg: `There was some problem.`});
    }
  })
}
else {
  this.setState({open: true, msg: `Login First!`});
}

}

handleUnWatch = (episode_num, showid, type) =>{
  console.log(episode_num, showid, type);
  let episodes = [];
  if(type === 0){
    episodes.push(episode_num);
  }else {
    for(let i=0; i<this.state.episodes.length; i++){
        console.log(this.state.episodes[i].id );
      if(this.state.episodes[i].id === episode_num){
        console.log("done");
        break;
      }else {
        console.log("push");
        episodes.push(this.state.episodes[i].id);
      }
    }
    episodes.push(episode_num)
    console.log("episodes: ", episodes);
  }
  let data = {
    tvid: parseInt(showid),
    episodeid: episodes
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



  render() {


    let episodes='';
    let showid = (this.props.shows.currentShow.id || this.props.match.params.id);
    let presentShowArray = [];
    let button;
    let buttonAll;

if(this.props.user.isUserLoggedIn === true){
   presentShowArray = this.props.user.userFollows.filter((follow)=>{
    return  parseInt(follow.tvShowId) === parseInt(this.props.shows.currentShow.id || this.props.match.params.id)
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
if(this.state.loader === true){
  loader = <img alt="n/a" src="https://s3.amazonaws.com/binged-images/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>
}else {
  loader = <h3 className="show_episode_header">{this.props.match.params.tvshow} Episodes</h3>;
}

  console.log(this.state.episodes);
  // let header;
    if(this.state.episodes.length>0){
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

      // header = (
      //   <TableHeader displaySelectAll={false}>
      //   <TableRow>
      //   <TableHeaderColumn></TableHeaderColumn>
      //   <TableHeaderColumn>Episode Name</TableHeaderColumn>
      //   <TableHeaderColumn>Episode Airdate</TableHeaderColumn>
      //   <TableHeaderColumn>Watched?</TableHeaderColumn>
      //   </TableRow>
      //   </TableHeader>
      //   )

      if(this.state.episodes[0]){
        console.log("present");
        count=0;
      }


      episodes = this.state.episodes.map((episode, i)=>{


        let episodeIn = (presentShowArray.indexOf(episode.id))
        if(episodeIn>-1){
          // button = (<button onClick={()=>{this.handleUnWatch(episode.id, showid, 0)}}>UnWatch</button>);
          button = (<RaisedButton label="UnWatch" secondary={true}  onClick={()=>{this.handleUnWatch(episode.id, showid, 0)}}/>);
          // buttonAll = (<button onClick={()=>{this.handleUnWatch(episode.id, showid, 1)}}>UnWatch All</button>);
          buttonAll = (<RaisedButton label="UnWatch All" secondary={true}  onClick={()=>{this.handleUnWatch(episode.id, showid, 1)}}/>);
        }else {
          // button = (<button onClick={()=>{this.handleWatch(episode.id, showid, 0)}}>Watch</button>);
          button = (<RaisedButton label="Watch" primary={true}  onClick={()=>{this.handleWatch(episode.id, showid, 0)}}/>);

            // buttonAll = (<button onClick={()=>{this.handleWatch(episode.id, showid, 1)}}>Watch All</button>);
          buttonAll = (<RaisedButton label="Watch All" primary={true}  onClick={()=>{this.handleWatch(episode.id, showid, 1)}}/>);

        }

        if(count===episode.season){
          tag = '';
        }else {
          count=episode.season
          tag= (<div><h1>Season: {count}</h1></div>)
        }

        console.log(episode);
        return(

       <div key={episode.id} className="episodes">
       <h3>{tag}</h3>
       <Link className="episodePopularLink" to={`/shows/${this.props.match.params.tvshow}/${this.props.match.params.id}/${episode.season}/episode/${episode.number}`}>
           {episode.name}
       </Link><br />
     <div className="episodeInfo">
       <p>(S{episode.season}E{episode.number})</p>
       <p>{episode.airdate}</p>
       <p>Airtime: {episode.airtime}</p>
       </div>
       {button} {buttonAll}
       <br />
       </div>

        )
      })
    }
    else {
      episodes = "";
      // header= "";
    }





// <Table>
//   {header}
//  <TableBody displayRowCheckbox={false}>
// {episodes}
// </TableBody>
// </Table>


    return (

      <MuiThemeProvider>
      <div className="App">
        <br/>
        {loader}
        <Grid fluid>
          <Row>
            <Col xs={12} md={12}>
                {episodes}
            </Col>
          </Row>
        </Grid>





                <Snackbar
                open={this.state.open}
                message={this.state.msg}
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose}
                    />

      </div>

      </MuiThemeProvider>

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
