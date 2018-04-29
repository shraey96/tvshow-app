import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import {Animated} from "react-animated-css";
import '../App.css';

const MyShows = (props) => {

let usershows;
let image;
let percentageWatched;
if(props.user.isUserLoggedIn === true){

  if(props.user.userFollows.length>0){
  usershows = props.user.userFollows.map((shows)=>{
    console.log(shows);
    image = <Link to={`/shows/${shows.show_ref.tvShowName}/${shows.tvShowId}`}><img className="show_img" src={shows.show_ref.tvShowImageUrl}/></Link>
    if(shows.show_ref.tvShowImageUrl === "" || !shows.show_ref.tvShowImageUrl){
       image = <Link to={`/shows/${shows.show_ref.tvShowName}/${shows.tvShowId}`}><img className="show_img" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-tv-poster-irina-march.jpg" height="295px" width="210px"/></Link>
    }
    percentageWatched = Percentage(shows.episodeWatched.length, shows.show_ref.totalEpisodeCount)
    return(
      <Col xs={12} md={3}  key={shows._id}>
<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
        <div className="tvpopular">
        {image}
        <br/>
        <p className="my_shows"><Link className="tvpopularLink" to={`/shows/${shows.show_ref.tvShowName}/${shows.show_ref.tvShowId}`}>{shows.show_ref.tvShowName}</Link> </p>
        <p className="my_shows_percent">Percentage Watched: {percentageWatched}</p>
        </div>
        <br/>
      </Animated>
      </Col>
    )

  })
}else {
  usershows = (
    <Col xs={12} md={12}>
        <h3 style={{"color":"white"}}>Looks like you haven't followed any shows!</h3>
    </Col>
  )
}
}else {
    props.history.push('/login');
  console.log("NOOO");
}


function Percentage(portion, total){
  return ((portion/total) * 100).toFixed(2) + '%'
}

console.log(props.user.userFollows);

  return (
    <div className="App">
      <h3 className="headingPopular">My Shows</h3>
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


// export default connect(mapStateToProps, {})(MyShows);
export default withRouter(connect(mapStateToProps, {})(MyShows))
