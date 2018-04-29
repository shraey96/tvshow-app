import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {searchAlter} from '../actions/searchAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { withRouter } from 'react-router-dom';

class MoreShowsSearch extends Component {

  constructor(){
    super()
    this.state = {
      options:{
        status: '',
        rating: '',
        genre: '',
        language: ''
      },
      optionsValue:{
        status: 1,
        rating: 1,
        genre: 1,
        language: 1
      }
    }
  }

componentWillMount(){
  let optionsValue = {
    status: parseInt(this.props.search.searchValue) || parseInt(this.props.match.params.sid) || 1,
    rating: parseInt(this.props.search.ratingValue) || parseInt(this.props.match.params.rid) || 1,
    genre: parseInt(this.props.search.genreValue)|| parseInt(this.props.match.params.gid) || 1,
    language: parseInt(this.props.search.languageValue)|| parseInt(this.props.match.params.lid) || 1,
  }
  // console.log(optionsValue);
this.setState({
  optionsValue: optionsValue
}, ()=>{
  // console.log(this.state);
})

}

componentDidMount(){

}


handleStatusChange = (e, index, value) =>{
  let options = Object.assign({}, this.state.options);
  let optionsValue = Object.assign({}, this.state.optionsValue);
  options.status = e.target.textContent;
  optionsValue.status = value;
  this.setState({
    options: options,
    optionsValue: optionsValue
  })
}

handleGenreChange = (e, index, value) => {
  let options = Object.assign({}, this.state.options);
  let optionsValue = Object.assign({}, this.state.optionsValue);
  options.genre = e.target.textContent;
  optionsValue.genre = value;
  this.setState({
    options: options,
    optionsValue: optionsValue
  })
}

handleRatingChange = (e, index, value) =>{
  let options = Object.assign({}, this.state.options);
  let optionsValue = Object.assign({}, this.state.optionsValue);
  options.rating = e.target.textContent;
  optionsValue.rating = value;
  this.setState({
    options: options,
    optionsValue: optionsValue
  })
}

handleLanguageChange = (e, index, value) =>{
  let options = Object.assign({}, this.state.options);
  let optionsValue = Object.assign({}, this.state.optionsValue);
  options.language = e.target.textContent;
  optionsValue.language = value;
  this.setState({
    options: options,
    optionsValue: optionsValue
  })
}


handleSubmit = (e) =>{
  e.preventDefault();
  // console.log(this.state);
  this.props.searchAlter(this.state);
  this.props.history.push(`/more-shows/${this.state.options.genre || 1}/${this.state.optionsValue.genre || 1}/${this.state.options.rating || 1}/${this.state.optionsValue.rating || 1}/${this.state.options.status || 1}/${this.state.optionsValue.status || 1}/${this.state.options.language || 1}/${this.state.optionsValue.language || 1}`);
}


  render() {


    return (

<MuiThemeProvider>
      <div className="App">

      <Grid fluid>

        <form onSubmit={this.handleSubmit}>
        <Row>
        <Col xs={12} md={3}>
        <p className="show_dropdown_header">Show Status</p>
        <DropDownMenu value={this.state.optionsValue.status} onChange={this.handleStatusChange}>
        <MenuItem value={1} primaryText="Show Status" />
        <MenuItem value={2} primaryText="Running" />
        <MenuItem value={3} primaryText="Ended" />
        <MenuItem value={4} primaryText="To be Determined" />
        <MenuItem value={5} primaryText="In Development" />
        </DropDownMenu>
        </Col>

        <Col xs={12} md={3}>
          <p className="show_dropdown_header">Show Genre</p>
          <DropDownMenu value={this.state.optionsValue.genre} onChange={this.handleGenreChange}>
          <MenuItem value={1} primaryText="Show Genre" />
          <MenuItem value={2} primaryText="Action" />
          <MenuItem value={3} primaryText="Adult" />
          <MenuItem value={4} primaryText="Adventure" />
          <MenuItem value={5} primaryText="Anime" />
          <MenuItem value={6} primaryText="Children" />
          <MenuItem value={7} primaryText="Comedy" />
          <MenuItem value={8} primaryText="Crime" />
          <MenuItem value={9} primaryText="DIY" />
          <MenuItem value={10} primaryText="Drama" />
          <MenuItem value={11} primaryText="Espionage" />
          <MenuItem value={12} primaryText="Family" />
          <MenuItem value={13} primaryText="Fantasy" />
          <MenuItem value={14} primaryText="Food" />
          <MenuItem value={15} primaryText="History" />
          <MenuItem value={16} primaryText="Horror" />
          <MenuItem value={17} primaryText="Legal" />
          <MenuItem value={18} primaryText="Medical" />
          <MenuItem value={19} primaryText="Music" />
          <MenuItem value={20} primaryText="Mystery" />
          <MenuItem value={21} primaryText="Romance" />
          <MenuItem value={22} primaryText="Science-Fiction" />
          <MenuItem value={23} primaryText="Sports" />
          <MenuItem value={24} primaryText="Supernatural" />
          <MenuItem value={25} primaryText="Thriller" />
          <MenuItem value={26} primaryText="Travel" />
          <MenuItem value={27} primaryText="War" />
          <MenuItem value={28} primaryText="Western" />
          </DropDownMenu>
        </Col>

        <Col xs={12} md={3}>
          <p className="show_dropdown_header">Show Rating</p>
          <DropDownMenu value={this.state.optionsValue.rating} onChange={this.handleRatingChange}>
          <MenuItem value={1} primaryText="Show Rating" />
          <MenuItem value={2} primaryText="9+" />
          <MenuItem value={3} primaryText="8+" />
          <MenuItem value={4} primaryText="7+" />
          <MenuItem value={5} primaryText="6+" />
          <MenuItem value={6} primaryText="5+" />
          <MenuItem value={7} primaryText="4+" />
          <MenuItem value={8} primaryText="3+" />
          <MenuItem value={9} primaryText="2+" />
          <MenuItem value={10} primaryText="1+" />
          </DropDownMenu>
        </Col>

        <Col xs={12} md={3}>
          <p className="show_dropdown_header">Show Language</p>
          <DropDownMenu value={this.state.optionsValue.language} onChange={this.handleLanguageChange}>
            <MenuItem value={1} primaryText="Show Language" />
            <MenuItem value={2} primaryText="Arabic" />
            <MenuItem value={3} primaryText="Albanian" />
            <MenuItem value={4} primaryText="Armenian" />
            <MenuItem value={5} primaryText="Azerbaijani" />
            <MenuItem value={6} primaryText="Bosnian" />
            <MenuItem value={7} primaryText="Catalan" />
            <MenuItem value={8} primaryText="Chinese" />
            <MenuItem value={9} primaryText="Croatian" />
            <MenuItem value={10} primaryText="Czech" />
            <MenuItem value={11} primaryText="Danish" />
            <MenuItem value={12} primaryText="Divehi" />
            <MenuItem value={13} primaryText="Dutch" />
            <MenuItem value={14} primaryText="English" />
            <MenuItem value={15} primaryText="Estonian" />
            <MenuItem value={16} primaryText="Finnish" />
            <MenuItem value={17} primaryText="French" />
            <MenuItem value={18} primaryText="Georgian" />
            <MenuItem value={19} primaryText="German" />
            <MenuItem value={20} primaryText="Greek" />
            <MenuItem value={21} primaryText="Hebrew" />
            <MenuItem value={22} primaryText="Hindi" />
            <MenuItem value={23} primaryText="Hungarian" />
            <MenuItem value={24} primaryText="Icelandic" />
            <MenuItem value={25} primaryText="Irish" />
            <MenuItem value={26} primaryText="Italian" />
            <MenuItem value={27} primaryText="Japanese" />
            <MenuItem value={28} primaryText="Javanese" />
            <MenuItem value={29} primaryText="Kazakh" />
            <MenuItem value={30} primaryText="Kongo" />
            <MenuItem value={31} primaryText="Korean" />
            <MenuItem value={32} primaryText="Latin" />
            <MenuItem value={33} primaryText="Lithuanian" />
            <MenuItem value={34} primaryText="Norwegian" />
            <MenuItem value={35} primaryText="Pashto" />
            <MenuItem value={36} primaryText="Norwegian" />
            <MenuItem value={37} primaryText="Persian" />
            <MenuItem value={38} primaryText="Polish" />
            <MenuItem value={39} primaryText="Portuguese" />
            <MenuItem value={40} primaryText="Romanian" />
            <MenuItem value={41} primaryText="Russian" />
            <MenuItem value={42} primaryText="Serbian" />
            <MenuItem value={43} primaryText="Slovak" />
            <MenuItem value={44} primaryText="Slovenian" />
            <MenuItem value={45} primaryText="Spanish" />
            <MenuItem value={46} primaryText="Swedish" />
            <MenuItem value={47} primaryText="Tagalog" />
            <MenuItem value={48} primaryText="Tamil" />
            <MenuItem value={49} primaryText="Thai" />
            <MenuItem value={50} primaryText="Turkish" />
            <MenuItem value={51} primaryText="Ukrainian" />
            <MenuItem value={52} primaryText="Urdu" />
            <MenuItem value={53} primaryText="Vietnamese" />
            <MenuItem value={54} primaryText="Welsh" />
            <MenuItem value={55} primaryText="Scottish Gaelic" />
          </DropDownMenu>
        </Col>

        </Row>
        <Row>
          <Col xs={12} md={12}>
        <RaisedButton label="Search" className="form-field search-button" primary={true} onClick={this.handleSubmit}/>
          </Col>
        </Row>
        </form>


        </Grid>


      </div>
</MuiThemeProvider>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
    currentShow: state.shows.currentShow,
    search: state.search
          }
}


// export default connect(mapStateToProps, {searchAlter})(MoreShowsSearch);
export default withRouter(connect(mapStateToProps, {searchAlter})(MoreShowsSearch))
