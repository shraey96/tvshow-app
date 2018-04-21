import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {fetchShows} from '../actions/showsAction';
import {UserFollowShow} from '../actions/userAction';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Animated} from "react-animated-css";

class Home extends Component {

  constructor(){
    super();
    this.state = {
      value : '',
      open: false,
      msg: '',
      loader: false
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

componentWillMount(){
    console.log("Mounted");
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
  this.props.history.push(`/search/${this.state.value}`)
}

handleChange = (e) =>{
  this.setState({value: e.target.value})
}

Follow = (tvShowInfo) => {

  if(this.props.user.isUserLoggedIn === false){
  this.setState({open: true, msg: `You must login to follow shows!`});
  }else {
  let data = {
    tvid: String(tvShowInfo.show.id),
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
  console.log("AAAA");
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
  loader = (<img src="http://backgroundcheckall.com/wp-content/uploads/2017/12/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}

let userShowInfo = this.props.user.userFollows;
console.log(userShowInfo);

if(this.props.shows.shows.length !==0){

popularShowsAiringTonight = show.map((tvshow, index)=>{

let button;

if(this.props.user.isUserLoggedIn === true){
  if(userShowInfo.length>0){
      for(var i = 0; i<userShowInfo.length; i++){
          if(tvshow.show.id === parseInt(userShowInfo[i].tvShowId)){
            button = (<button onClick={()=>{this.unFollow(tvshow)}}>UnFollow</button>);
            break;
          }else {
            button = (<button onClick={()=>{this.Follow(tvshow)}}>Follow</button>);
          }
      }
    }else {
      button = (<button onClick={()=>{this.Follow(tvshow)}}>Follow</button>);
    }

}else {
  button = (<button onClick={()=>{this.Follow(tvshow)}}>Follow</button>);
}


   let image;
  if(tvshow.show.image){
     image = <Link to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}><img src={tvshow.show.image.medium}/></Link>
}else {
     image = <Link to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}><img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-tv-poster-irina-march.jpg" height="295px" width="210px"/></Link>
}
    return (
      <Col xs={12} md={3} sm={4} key={tvshow.id}>

<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
        <div className="tvpopular">
        {image}
        <br/>
        <p><Link className="tvpopularLink" to={`/shows/${tvshow.show.name}/${tvshow.show.id}/${tvshow.season}/episode/${tvshow.number}`}><b>{tvshow.name}</b></Link> </p>
        <p><Link className="tvpopularLink" to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}>{tvshow.show.name}</Link> </p>
        <p className="tvpopularLink"> <u>S{tvshow.season}E{tvshow.number}</u> </p>
        {button}
        </div>
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

    <u><h3 className="headingPopular">Popular shows airing tonight!</h3></u>

{loader}

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


export default connect(mapStateToProps, {fetchShows, UserFollowShow})(Home);
