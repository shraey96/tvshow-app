import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Animated} from "react-animated-css";

class AboutShowCast extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      cast : []
    }
  }

componentWillMount(){
  console.log("Mounted AboutShowCast");
  console.log(this.props.match.params);
  this.setState({loader: true})

  fetch(`http://api.tvmaze.com/shows/${this.props.match.params.id}/cast`)
  .then(res=>res.json())
  .then(cast=>{
    console.log(cast);
    this.setState({cast: cast, loader: false});

    })
}

  render() {

let cast;
let image;
let loader;

if(this.state.loader === true){
  loader = (<img src="http://backgroundcheckall.com/wp-content/uploads/2017/12/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}

if(this.state.cast.length>0){
cast = this.state.cast.map((cast)=>{
let image;

if(cast.character.image){
  image = <Link to={`/people/${cast.person.name}/${cast.person.id}`}><img src={cast.character.image.medium} className="show_img"/></Link>
}else if(cast.person.image){
  image = <Link to={`/people/${cast.person.name}/${cast.person.id}`}><img src={cast.person.image.medium} className="show_img"/></Link>;
}else{
  image = <Link to={`/people/${cast.person.name}/${cast.person.id}`}><img src="https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg" height="300px;" width="300px;" className="show_img"/></Link>;
}
return(
  <Col xs={12} md={3} sm={4} key={cast.character.id}>

<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
    <div className="tvpopular">
    {image}
    <h4 className="show_name"><b><Link className="tvpopularLink" to={`/people/${cast.person.name}/${cast.person.id}`}>{cast.person.name}</Link></b></h4>
      <p style={{"color":"white"}}>as</p>
    <h5 style={{"color":"white"}}>{cast.character.name}</h5>
    </div>
</Animated>

  </Col>
)

})
}else {
  cast = '';
}

    return (

<MuiThemeProvider>
      <div className="App">

      <h3 className="about_show_header">{this.props.match.params.tvshow} Cast</h3>
      {loader}
        <Grid fluid>
          <Row>

            {cast}
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


export default connect(mapStateToProps, {fetchShowByID})(AboutShowCast);
