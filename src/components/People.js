import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import striptags from 'striptags';

import Episodes from './Episodes';
import Cast from './Cast';
import {Animated} from "react-animated-css";

class People extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      personInfo : '',
      personShows : []
    }
  }

componentWillMount(){
  console.log("Mounted AboutShow");
  this.setState({loader: true});
  console.log(this.props.match.params.person);
fetch(`http://api.tvmaze.com/people/${this.props.match.params.id}`)
  .then(res=>res.json())
  .then(personInfo=>{
    // console.log(personInfo);
    // this.setState({personInfo: personInfo, loader: false});

      return fetch(`http://api.tvmaze.com/people/${this.props.match.params.id}/castcredits`)
      .then(res=>res.json())
      .then(personShows=>{

        let personPromise =  personShows.map((personShows)=>{
          // console.log(personShows._links.show);
          return fetch(`${personShows._links.show.href}`)
          .then((personShows)=>personShows.json())
          .then((personShows)=>{
            return personShows
          })

        })

        Promise.all(personPromise)
        .then((result)=>{
          console.log(result);
          this.setState({loader: false, personInfo: personInfo, personShows: result}, ()=>{
            console.log(this.state);
          })
        })

      })
    })


}

componentDidMount(){

}

  render() {

let personInfo;
let personInfo1;
let personInfo2;
let image;

let loader;

if(this.state.loader === true){
  loader = (<img src="https://s3.amazonaws.com/binged-images/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}


if(this.state.personInfo){
  if(this.state.personInfo.image){
    image = <img src={this.state.personInfo.image.medium} />
  }else {
    image = '';
  }
  personInfo1 = (

    <Col xs={12} md={12} sm={12}>
<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
  {image}
</Animated>
    </Col> )

let country;
if(this.state.personInfo.country){
  country = (<p>Country: {this.state.personInfo.country.name}</p>);
}else {
  country = '';
}

  personInfo2 = (<Col xs={12} md={12} sm={4}>
  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <div className="people_info">
          <p>{country}</p>
          <p>Birthday: {this.state.personInfo.birthday || ''}</p>

          </div>
  </Animated>

        </Col>)

}

// console.log(this.state);

let personShows;
let image2;
let header;
if(this.state.personShows.length>0){
header = <h3>Starring In: </h3>
personShows = this.state.personShows.map((show)=>{
  console.log(show);
  if(show.image){
    image2 = <Link to={`/shows/${show.name}/${show.id}`}><img src={show.image.medium} className="show_img"/></Link>;
  }else {
    image2 = <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-tv-poster-irina-march.jpg" height="295px" width="210px" className="show_img"/>;
  }
  return(
    <Col xs={12} md={4} sm={4}>
    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
            <div className="tvpopular">
            {image2}<br/>
          <b style={{"color": "white", "font-size":"20px"}}>{show.name}</b>
            <p><img align="middle" src="https://www.iconsplace.com/download/orange-rating-star-512.png" height="25px" width="25px"></img> <span style={{"color":"white"}}>{show.rating.average || 'n/a'} </span></p>
            <br/>
            </div>
    </Animated>

          </Col>)
  // )
})
}


    return (

<MuiThemeProvider>
      <div className="App">

      <h3 className="headingPopular">{this.props.match.params.person}</h3>
      {loader}
        <Grid fluid>
          <Row>
          {personInfo1}
          {personInfo2}
          </Row>
        </Grid>
<hr />
  {header}
        <Grid fluid>
          <Row>
          {personShows}
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
    currentShow: state.shows.currentShow
          }
}


export default connect(mapStateToProps, {fetchShowByID})(People);
