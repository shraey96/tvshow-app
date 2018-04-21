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

import { withRouter } from 'react-router-dom'

class MoreShowsSearch extends Component {

  constructor(){
    super()
    this.state = {
      options:{
        status: '',
        rating: '',
        genre: ''
      },
      optionsValue:{
        status: 1,
        rating: 1,
        genre: 1
      }
    }
  }

componentWillMount(){

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

handleSubmit = (e) =>{
  e.preventDefault();
  console.log(this.state);
  this.props.searchAlter(this.state);
  this.props.history.push(`/more-shows/${this.state.options.genre || 1}/${this.state.optionsValue.genre || 1}/${this.state.options.rating || 1}/${this.state.optionsValue.rating || 1}/${this.state.options.status || 1}/${this.state.optionsValue.status || 1}`);
  // this.props.history.push(`/browse/${this.state.searchTitle || 0}/${this.state.quality || 0}/${this.state.genre || 0}/${this.state.rating || 0}/${this.state.orderBy || 0}`)
}

  render() {


    return (

<MuiThemeProvider>
      <div className="App">

      <Grid fluid>

        <form onSubmit={this.handleSubmit}>
        <Row>
        <Col xs={12} md={3}>
        <DropDownMenu value={this.state.optionsValue.status} onChange={this.handleStatusChange}>
        <MenuItem value={1} primaryText="Show Status" />
        <MenuItem value={2} primaryText="Running" />
        <MenuItem value={3} primaryText="Ended" />
        <MenuItem value={4} primaryText="To be Determined" />
        <MenuItem value={5} primaryText="In Development" />
        </DropDownMenu>
        </Col>

        <Col xs={12} md={3}>
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
    currentShow: state.shows.currentShow
          }
}


// export default connect(mapStateToProps, {searchAlter})(MoreShowsSearch);
export default withRouter(connect(mapStateToProps, {searchAlter})(MoreShowsSearch))
