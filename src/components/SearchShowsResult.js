import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowsCustom} from '../actions/showsAction';
import {Link} from 'react-router-dom';
import {Animated} from "react-animated-css";
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreShowsSearch from './MoreShowsSearch';

class SearchShowsResult extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      episodes : []
    }
  }

componentWillMount(){
this.setState({loader: true}, ()=>{
  let customShow = this.props.fetchShowsCustom(this.props.search);
  customShow.then((customShow)=>{
    if(customShow.success === true){
      this.setState({loader: false})
    }
  })

})


}

componentDidMount(){

}

componentWillReceiveProps(nextProps){
  // console.log(nextProps.shows.searchShowCustom);
  console.log(nextProps.search);
  if(nextProps.search !== this.props.search){
    console.log("DIFFERENT");
    this.setState({loader: true}, ()=>{
    let customShow = this.props.fetchShowsCustom(nextProps.search);
    customShow.then((customShow)=>{
      if(customShow.success === true){
        this.setState({loader: false})
      }
    })
    })
  }else {
    console.log("SAME");
  }
}

  render() {
let shows;
let loader;
if(this.state.loader === true){
  loader = (<img src="http://backgroundcheckall.com/wp-content/uploads/2017/12/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}
if(this.props.shows.searchShowCustom.length!==0){

  shows = this.props.shows.searchShowCustom.map((tvshow)=>{
    // console.log(tvshow);
    let image;
    let rating;
    if(tvshow.tvShowImageUrl){
       image = <Link to={`/shows/${tvshow.tvShowName}/${tvshow.tvShowId}`}><img src={tvshow.tvShowImageUrl}/></Link>
  }else {
       image = <Link to={`/shows/${tvshow.tvShowName}/${tvshow.tvShowId}`}><img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-tv-poster-irina-march.jpg" height="295px" width="210px"/></Link>
  }

  if(tvshow.tvShowRating){
    rating = tvshow.tvShowRating;
  }else {
    rating = 'n/a';
  }
      return (
        <Col xs={12} md={3} sm={4} key={tvshow._id}>

  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <div className="tvpopular">
          {image}
          <br/>
          <p><Link className="tvpopularLink" to={`/shows/${tvshow.tvShowName}}/${tvshow.tvShowId}`}>{tvshow.tvShowName}</Link> </p>
          <p>{rating}</p>
          </div>
  </Animated>

        </Col>

    )
  })
}


    return (

<MuiThemeProvider>
      <div className="App">
<br/>
{loader}
<Grid fluid>
  <Row>
    {shows}
  </Row>
</Grid>

      </div>
</MuiThemeProvider>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
    search: state.search,
    user: state.user
          }
}


export default connect(mapStateToProps, {fetchShowsCustom})(SearchShowsResult);
