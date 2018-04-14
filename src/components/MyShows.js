import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

import '../App.css';

const MyShows = (props) => {

let usershows;
let image;
let percentageWatched;
if(props.user.isUserLoggedIn === true){
  usershows = props.user.userFollows.map((shows)=>{
    console.log(shows);
    image = <Link to={`/shows/${shows.show_ref.tvShowName}/${shows.tvShowId}`}><img src={shows.show_ref.tvShowImageUrl}/></Link>
    percentageWatched = Percentage(shows.episodeWatched.length, shows.show_ref.totalEpisodeCount)
    return(
      <Col xs={12} md={3}  key={shows._id}>

        <div className="tvpopular">
        {image}
        <br/>
        <p><Link className="tvpopularLink" to={`/shows/${shows.show_ref.tvShowName}/${shows.show_ref.tvShowId}`}>{shows.show_ref.tvShowName}</Link> </p>
        <p>Percentage Watched: {percentageWatched}</p>
        </div>
        <br/>
      </Col>
    )

  })
}


function Percentage(portion, total){
  return ((portion/total) * 100).toFixed(2) + '%'
}

console.log(props.user.userFollows);

  return (
    <div className="App">
      MyShows
    <br/>
    <br/>

    <Grid fluid>
      <Row>
        {usershows}
      </Row>
    </Grid>
    </div>
  )
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
    user: state.user
         }
}


export default connect(mapStateToProps, {})(MyShows);