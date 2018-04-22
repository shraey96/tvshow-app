import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {UserFollowShow, UserUnFollowShow} from '../actions/userAction';
import striptags from 'striptags';
import Snackbar from 'material-ui/Snackbar';
import Episodes from './Episodes';
import RaisedButton from 'material-ui/RaisedButton';

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

Follow = (tvShowInfo) => {
  if(this.props.user.isUserLoggedIn === false){
  this.setState({open: true, msg: `You must login to follow shows!`});
  }else {
    console.log(tvShowInfo);
  let data = {
    tvid: (tvShowInfo.id),
    imdb: tvShowInfo.externals.imdb,
    tvname: tvShowInfo.name,
    tvimg:  tvShowInfo.image.medium
  }
  let followShow = this.props.UserFollowShow(data);
  followShow.then((show)=>{
    if(show.success === true){
      this.setState({open: true, msg: `Show Followed!`});
  }else {
      this.setState({open: true, msg: `There was some problem.`});
  }
})
}
}

unFollow = (tvShowInfo) => {
  let data = {
    tvid: (tvShowInfo.id)
  }
  let userShowUnfollow = this.props.UserUnFollowShow(data)
  userShowUnfollow.then((show)=>{
    if(show.success === true){
      this.setState({open: true, msg: `Show Unollowed!`});
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

console.log(this.props.user);
console.log(this.props.shows);
let userShowInfo = this.props.user.userFollows;
let button;

if(this.props.user.isUserLoggedIn === true){
  if(userShowInfo.length>0){
      for(var i = 0; i<userShowInfo.length; i++){
          if(this.props.shows.currentShow.id === parseInt(userShowInfo[i].tvShowId)){
            // button = (<button onClick={()=>{this.unFollow(this.props.shows.currentShow)}}>UnFollow</button>);
              button = (<RaisedButton label="UnFollow" secondary={true}  onClick={()=>{this.unFollow(this.props.shows.currentShow)}}/>);
            break;
          }else {
            // button = (<button onClick={()=>{this.Follow(this.props.shows.currentShow)}}>Follow</button>);
                button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(this.props.shows.currentShow)}}/>);
          }
      }
    }else {
      button = (button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(this.props.shows.currentShow)}}/>));
    }

}else {
  button = (button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(this.props.shows.currentShow)}}/>));
}


let currentShow = this.props.currentShow;
let currentShowInfo;
let col1;
let col2;

if(currentShow){
  let image;
if(currentShow.image){
  image = <img src={currentShow.image.medium}/>
}else {
  image = '';
}

col1 = (


    <Col xs={12} md={6}>
      <div>
        {image}<br/>
        {button}
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

      <Snackbar
                open={this.state.open}
                message={this.state.msg}
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose}
        />
</MuiThemeProvider>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
    currentShow: state.shows.currentShow,
    user: state.user
          }
}


export default connect(mapStateToProps, {fetchShowByID,UserFollowShow, UserUnFollowShow})(AboutShow);
