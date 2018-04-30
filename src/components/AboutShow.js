import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';
import {withRouter} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {UserFollowShow, UserUnFollowShow} from '../actions/userAction';
import striptags from 'striptags';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

import { Helmet } from "react-helmet";

import { Google } from 'react-social-sharing';
import { Twitter } from 'react-social-sharing';
import { Facebook } from 'react-social-sharing';

class AboutShow extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      episodes : [],
      showid: ''
    }
  }

componentWillMount(){
  // console.log("Mounted AboutShow");
  this.setState({loader: true})
  let fetchShowByID = this.props.fetchShowByID(this.props.match.params.id);
  fetchShowByID.then((response)=>{
    // console.log(response);
    if(response){
      this.setState({loader: false});
    }
  })
}

componentDidMount(){



}

componentWillReceiveProps(nextProps){
   // console.log("############", this.props.currentShow);
   // console.log("############", this.props.currentShow);
  if(nextProps.match.params.id !== this.props.match.params.id){
    this.setState({loader: true})
    let fetchShowByID = this.props.fetchShowByID(nextProps.match.params.id);
    fetchShowByID.then((response)=>{
      // console.log(response);
      if(response){
        this.setState({loader: false});
      }
    })
    // this.fetchEpisodesByID(nextProps.match.params.id);

  }
}



Follow = (tvShowInfo) => {
  if(this.props.user.isUserLoggedIn === false){
  this.setState({open: true, msg: `You must login to follow shows!`});
  }else {
    // console.log(tvShowInfo);
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

// console.log(this.props.user);
// console.log(this.props.shows);
let userShowInfo = this.props.user.userFollows;
let button;
let info1;
let info2;
let info3;

let loader;

if(this.state.loader === true){
  loader = (<img alt="n/a" src="https://s3.amazonaws.com/binged-images/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}

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
let col1;
let col2;

if(currentShow){
  let image;
if(currentShow.image){
  image = <img alt="n/a" src={currentShow.image.medium}/>
}else {
  image = <img alt="n/a" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-tv-poster-irina-march.jpg" height="295px" width="210px"/>;
}

let shareURL = (window.location.href);

col1 = (


    <Col xs={12} md={6}>
      <div>
        {image}<br/>
        {button}<br/>
        <br/>
<Facebook link={shareURL}/>
<Google link={shareURL}/>
<Twitter link={shareURL}/>

      </div>
    </Col>

  )
col2 = (
    <Col xs={12} md={6} sm={4}>
      <div className="about_show">
      <p className="about_show_name">{currentShow.name} </p>
      <p className="about_show_lang">({currentShow.language})</p>
      <p className="about_show_lang">Run time: {currentShow.runtime} minutes</p>
      <i><a href={currentShow.officialSite} className="about_show_official">officialSite</a></i>
      <p className="about_show_lang">Air's On: <span style={{"color":"red"}}>{currentShow.network.name}</span></p>
      <p className="about_show_lang"><img alt="n/a" align="middle" src="https://www.iconsplace.com/download/orange-rating-star-512.png" height="25px" width="25px"></img>{currentShow.rating.average}</p>
      <p className="about_show_summary">{striptags(this.props.currentShow.summary)} </p>

      </div>
    </Col>
  )

info1 = (
  <Col xs={12} md={4} sm={4}>
  <p className="about_show_info"><Link to={`/shows/cast/${currentShow.name}/${currentShow.id}`}>Cast</Link></p>
  </Col>
  )

info2 = (
  <Col xs={12} md={4} sm={4}>
  <p className="about_show_info"><Link to={`/shows/crew/${currentShow.name}/${currentShow.id}`}>Crew</Link></p>
  </Col>
  )

info3 = (
  <Col xs={12} md={4} sm={4}>
  <p className="about_show_info"><Link to={`/shows/episodes/${currentShow.name}/${currentShow.id}`}>Episodes</Link></p>
  </Col>
  )

}else {
  // currentShowInfo = "";
  col1='';
  col2='';
  info1='';
  info2='';
  info3='';
}

    return (

<MuiThemeProvider>
      <div className="App">
<br />
{loader}
        <Grid fluid>
          <Row>
{col1}
{col2}
<br/>
          </Row>
<br /><br /><br />
          <Row>
            {info1}
            {info2}
            {info3}
          </Row>

        </Grid>

<Grid fluid>
<Row>


</Row>
</Grid>



      </div>

        <Snackbar
                open={this.state.open}
                message={this.state.msg}
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose}
        />

        <Helmet>
          <title>Binged!: {this.props.match.params.tvshow}</title>
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
    currentShow: state.shows.currentShow,
    user: state.user
          }
}


// export default connect(mapStateToProps, {fetchShowByID,UserFollowShow, UserUnFollowShow})(AboutShow);
// export default withRouter(connect(mapStateToProps, {LogoutUser})(Simple))
export default withRouter(connect(mapStateToProps,  {fetchShowByID, UserFollowShow, UserUnFollowShow})(AboutShow))
