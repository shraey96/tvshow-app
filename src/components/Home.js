import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShows} from '../actions/showsAction';
import {Link} from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

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

  // if(this.props.)

  console.log("tvshowinfo: ", this.props.userProfile.userProfile._id, tvShowInfo.show.id, tvShowInfo.show.externals.imdb, tvShowInfo.show.name, tvShowInfo.show.image.medium);

 }


  render() {

let popularShowsAiringTonight;
let show = this.props.shows.shows;
if(this.props.shows.shows.length !==0){


popularShowsAiringTonight = show.map((tvshow, index)=>{
  if(index<16)
{ let image;
  if(tvshow.show.image){
     image = <Link to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}><img src={tvshow.show.image.medium}/></Link>
  }
    return (
      <Col xs={12} md={3}  key={tvshow.id}>

        <div className="tvpopular">
        {image}
        <br/>
        <p><Link className="tvpopularLink" to={`/shows/${tvshow.show.name}/${tvshow.show.id}/${tvshow.season}/episode/${tvshow.number}`}><b>{tvshow.name}</b></Link> </p>
        <p><Link className="tvpopularLink" to={`/shows/${tvshow.show.name}/${tvshow.show.id}`}>{tvshow.show.name}</Link> </p>
        <p className="tvpopularLink"> <u>S{tvshow.season}E{tvshow.number}</u> </p>
        <button onClick={()=>{this.Follow(tvshow)}}>Follow</button>
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
    userProfile: state.user
          }
}


export default connect(mapStateToProps, {fetchShows})(Home);
