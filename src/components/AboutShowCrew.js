import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Animated} from "react-animated-css";
import { withRouter } from 'react-router-dom';

class AboutShowCrew extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      crew : []
    }
  }

componentWillMount(){
  console.log("Mounted AboutShowCrew");
  this.setState({loader: true})

  fetch(`http://api.tvmaze.com/shows/${this.props.match.params.id}/crew`)
  .then(res=>res.json())
  .then(crew=>{
    console.log(crew);
    this.setState({crew: crew, loader: false});

    })
}

componentDidMount(){

}

  render() {

let crew;
let image;
let loader;

if(this.state.loader === true){
  loader = (<img src="https://s3.amazonaws.com/binged-images/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}

if(this.state.crew.length>0){
crew = this.state.crew.map((crew)=>{
let image;
if(crew.person.image){
  image = <Link to={`/people/${crew.person.name}/${crew.person.id}`}><img className="show_img" src={crew.person.image.medium}/></Link>;
}else {
  image = <Link to={`/people/${crew.person.name}/${crew.person.id}`}><img className="show_img" src="https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg" height="300px;" width="250px;"/></Link>;
}
return(
  <Col xs={12} md={3} sm={4} key={crew.person.id}>

<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
    <div className="tvpopular">
    {image}
    <h4><b><Link className="tvpopularLink" to={`/people/${crew.person.name}/${crew.person.id}`}>{crew.person.name}</Link></b></h4>
    <p style={{"color":"white"}}>as</p>
    <h5 style={{"color":"white"}}>{crew.type}</h5>
    </div>
</Animated>

  </Col>
)

})
}else {
  crew = '';
}


    return (

<MuiThemeProvider>
      <div className="App">

      <h3 className="about_show_header">{this.props.match.params.tvshow} Crew</h3>
      {loader}
        <Grid fluid>
          <Row>
{crew}

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


export default withRouter(AboutShowCrew);
