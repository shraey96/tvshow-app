import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowByID} from '../actions/showsAction';

import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';
import 'moment-timezone';

import '../App.css';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends Component {

  constructor(){
    super()
    this.state = {
      events: []
    }
  }

componentWillMount(){
  console.log("Mounted Calendar");
  let events = [];
  let tz = moment.tz.guess();


  this.props.user.userFollows.forEach((event, index)=>{
    // console.log(event);
    // console.log(event);
    event.show_ref.episodes.forEach((episode, index2)=>{
      let startYear = moment(episode.airstamp).zone(tz).format('YYYY');
      let startMonth = moment(episode.airstamp).zone(tz).format('MM');
      let startDate = moment(episode.airstamp).zone(tz).format('D');
      // let endDate = (parseInt(startDate) + 1).toString();
      let title = `${event.show_ref.tvShowName} S${episode.season}E${episode.number}`;
      console.log(title);
      let objToPush = {
        id: index + index2,
        title: title,
        start: new Date(startYear, startMonth, startDate),
        end: new Date(startYear, startMonth, startDate)
      };
      // console.log(objToPush);
      events.push(objToPush);
      // console.log(events);
    })
  })
  this.setState({events:events},()=>{
    console.log("events state updated!");
  })
}

componentDidMount(){


}

  render() {

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

    return (

      <div className="Calendar App">

      <BigCalendar
          events={this.state.events}
          views={allViews}
          step={30}
          showMultiDayTimes
          defaultDate={new Date()}
        />

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


export default connect(mapStateToProps, {fetchShowByID})(Calendar);
