import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {fetchShows} from '../actions/showsAction';
import {UserFollowShow, UserUnFollowShow} from '../actions/userAction';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Animated} from "react-animated-css";

import { Helmet } from "react-helmet";

class Home extends Component {

  constructor(){
    super();
    this.state = {
      value : '',
      open: false,
      msg: '',
      loader: false
    }
  }

componentWillMount(){
    // console.log("Mounted");
    this.setState({loader: true});
    let fetchShows = this.props.fetchShows();
    fetchShows.then((shows)=>{
      if(shows){
        this.setState({loader: false});
      }
    })
  }


handleSubmit = (e) =>{
  e.preventDefault();
  this.props.history.push(`/search/${this.state.value}`);
}

handleChange = (e) =>{
  this.setState({value: e.target.value});
}

Follow = (tvShowInfo) => {
  if(this.props.user.isUserLoggedIn === false){
  this.setState({open: true, msg: `You must login to follow shows!`});
  }else {
  let data = {
    tvid: (tvShowInfo.show.id),
    imdb: tvShowInfo.show.externals.imdb,
    tvname: tvShowInfo.show.name,
    tvimg:  tvShowInfo.show.image.medium
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
    tvid: tvShowInfo.show.id
  }
  let userShowUnfollow = this.props.UserUnFollowShow(data)
  userShowUnfollow.then((show)=>{
    if(show.success === true){
      this.setState({open: true, msg: `Show unfollowed!`});
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

let popularShowsAiringTonight;
let show = this.props.shows.shows;

let loader;

if(this.state.loader === true){
  loader = (<img src="https://s3.amazonaws.com/binged-images/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px" alt="n/a"/>);
}else {
  loader = "";
}

let userShowInfo = this.props.user.userFollows;
// console.log(userShowInfo);

if(this.props.shows.shows.length !==0){

popularShowsAiringTonight = show.map((tvshow, index)=>{

let button;

if(this.props.user.isUserLoggedIn === true){
  if(userShowInfo.length>0){
      for(var i = 0; i<userShowInfo.length; i++){
          if(tvshow.show.id === parseInt(userShowInfo[i].tvShowId)){
            // button = (<button onClick={()=>{this.unFollow(tvshow)}}>UnFollow</button>);
            button = (<RaisedButton label="UnFollow" secondary={true}  onClick={()=>{this.unFollow(tvshow)}}/>);
            break;
          }else {
            // button = (<button onClick={()=>{this.Follow(tvshow)}}>Follow</button>);
            button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(tvshow)}}/>);
          }
      }
    }else {
      button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(tvshow)}}/>);
    }

}else {
  button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(tvshow)}}/>);
}


   let image;
  if(tvshow.show.image){
     image = <Link to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}><img alt="n/a" src={tvshow.show.image.medium} className="show_img"/></Link>
}else {
     image = <Link to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}><img alt="n/a" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-tv-poster-irina-march.jpg" height="295px" width="210px" className="show_img"/></Link>
}
    return (
      <Col xs={12} md={3} sm={4} key={tvshow.id}>

<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
        <div className="tvpopular">
        {image}
        <br/>
        <p className="show_name"><Link className="tvpopularLink"  to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}>{tvshow.show.name}</Link> </p>
        <p className="episode_name"><Link className="tvpopularLink" to={`/shows/${tvshow.show.name}/${tvshow.show.id}/${tvshow.season}/episode/${tvshow.number}`}><b>{tvshow.name}</b></Link> </p>
        <p className="episode_num"> <u>S{tvshow.season}E{tvshow.number}</u> </p>
        {button}

        </div>
        <br/>
</Animated>

      </Col>


  )

})

}else {
  popularShowsAiringTonight = "";
}


    return (

<MuiThemeProvider>
      <div className="App">

    <h3 className="headingPopular">Popular shows airing tonight!</h3>

{loader}
<br/>
<Grid fluid>
  <Row>
    {popularShowsAiringTonight}
  </Row>
</Grid>

<Snackbar
          open={this.state.open}
          message={this.state.msg}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
  />

      </div>

      <Helmet>
        <title>Binged! Popular TV Shows Airing Tonight!</title>
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
    user: state.user
          }
}


export default connect(mapStateToProps, {fetchShows, UserFollowShow, UserUnFollowShow})(Home);
