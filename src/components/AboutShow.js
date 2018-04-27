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
import Episodes from './Episodes';
import RaisedButton from 'material-ui/RaisedButton';

import { SocialIcon } from 'react-social-icons';
import ShareButton from 'react-social-share-buttons';

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
  console.log("Mounted AboutShow");
  console.log(this.props);
  this.props.fetchShowByID(this.props.match.params.id);
}

componentDidMount(){



}

componentWillReceiveProps(nextProps){
   console.log("############", this.props.currentShow);
   console.log("############", this.props.currentShow);
  if(nextProps.match.params.id !== this.props.match.params.id){
    this.props.fetchShowByID(nextProps.match.params.id);

    // this.fetchEpisodesByID(nextProps.match.params.id);

  }
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
let info1;
let info2;
let info3;

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
        {button}<br/>
        <br/>
      <SocialIcon url="https://jaketrent.com" network="facebook" />
      <SocialIcon url="test.com" network="google" />
      <SocialIcon url="https://jaketrent.com" network="twitter" />

      </div>
    </Col>

  )
col2 = (
    <Col xs={12} md={6} sm={4}>
      <div className="about_show">
      <p className="about_show_name">Name: {currentShow.name} </p>
      <p className="about_show_lang">({currentShow.language})</p>
      <p className="about_show_lang">Run time: {currentShow.runtime} minutes</p>
      <a href={currentShow.officialSite}>officialSite</a>
      <p className="about_show_lang"><img align="middle" src="http://www.iconsplace.com/download/orange-rating-star-512.png" height="25px" width="25px"></img>{currentShow.rating.average}</p>
      <p className="about_show_summary">Summary: {striptags(this.props.currentShow.summary)} </p>

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
  currentShowInfo = "";
  col1='';
  col2='';
  info1='';
  info2='';
  info3='';
}

    return (

<MuiThemeProvider>
      <div className="App">

      <h3 className="about_show_header">{this.props.match.params.tvshow}</h3>
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
