import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {fetchShows} from '../actions/showsAction';
import {UserFollowShow} from '../actions/userAction';



class Home extends Component {

  constructor(){
    super();
    this.state = {
      value : ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

componentWillMount(){
    console.log("Mounted");
    this.props.fetchShows();
  }


handleSubmit(e){
  e.preventDefault();
  this.props.history.push(`/search/${this.state.value}`)
}

handleChange(e){
  this.setState({value: e.target.value})
}

Follow = (tvShowInfo) => {

  if(this.props.user.isUserLoggedIn === false){
  alert("PLEASE LOGIN FIRST");
  }else {
  let data = {
    tvid: String(tvShowInfo.show.id),
    imdb: tvShowInfo.show.externals.imdb,
    tvname: tvShowInfo.show.name,
    tvimg:  tvShowInfo.show.image.medium
  }
  this.props.UserFollowShow(data);
  }

}

unFollow = (tvShowInfo) => {
  console.log("AAAA");
}


  render() {

let popularShowsAiringTonight;
let show = this.props.shows.shows;

let userShowInfo = this.props.user.userFollows;
console.log(userShowInfo);

if(this.props.shows.shows.length !==0){

popularShowsAiringTonight = show.map((tvshow, index)=>{

let button;

if(this.props.user.isUserLoggedIn === true){
console.log("YES");
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
  console.log("NO");
  button = ""
}

  if(index<16)
{ let image;
  if(tvshow.show.image){
     image = <Link to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}><img src={tvshow.show.image.medium}/></Link>
  }
    return (
      <Col xs={12} md={3} sm={4} key={tvshow.id}>

        <div className="tvpopular">
        {image}
        <br/>
        <p><Link className="tvpopularLink" to={`/shows/${tvshow.show.name}/${tvshow.show.id}/${tvshow.season}/episode/${tvshow.number}`}><b>{tvshow.name}</b></Link> </p>
        <p><Link className="tvpopularLink" to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}>{tvshow.show.name}</Link> </p>
        <p className="tvpopularLink"> <u>S{tvshow.season}E{tvshow.number}</u> </p>
        {button}
        </div>

      </Col>


  )
}
})

}else {
  popularShowsAiringTonight = "";
}


    return (
      <div className="App">




    <u><h3 className="headingPopular">Popular shows airing tonight!</h3></u>



<Grid fluid>
  <Row>
    {popularShowsAiringTonight}
  </Row>
</Grid>

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


export default connect(mapStateToProps, {fetchShows, UserFollowShow})(Home);
