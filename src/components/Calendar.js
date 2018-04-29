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
  // console.log("Mounted Calendar");
  let events = [];
  let tz = moment.tz.guess();
  // console.log(tz);
  // console.log(moment('2018-04-17').utcOffset("+05:30").format('MMMM Do YYYY'));
  // console.log(moment("2018-04-16T02:00:00+00:00").zone('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a'));
  // console.log(moment.tz("2018-04-16T02:00:00+00:00", tz).format('MMMM Do YYYY, h:mm:ss a'));
// console.log(moment.tz("2018-04-16T02:00:00+00:00", "America/Toronto").format('MMMM Do YYYY, h:mm:ss a'));
  this.props.user.userFollows.forEach((event, index)=>{
    // console.log(event);
    // console.log(event);
    // <Link className="tvpopularLink" to={`/shows/${tvshow.show.name}/${tvshow.show.id}/${tvshow.season}/episode/${tvshow.number}`}><b>{tvshow.name}</b></Link>
    event.show_ref.episodes.forEach((episode, index2)=>{
      // let startYear = moment(episode.airstamp).zone(tz).format('YYYY');
      // let startMonth = moment(episode.airstamp).zone(tz).format('MM');
      // let startDate = moment(episode.airstamp).zone(tz).format('D');

      let startYear = moment(episode.airstamp).zone(tz).format('YYYY');
      let startMonth = moment(episode.airstamp).zone(tz).format('M');
      let startDate = moment(episode.airstamp).zone(tz).format('D');
      startMonth = (parseInt(startMonth) - 1).toString();

      let title = `${event.show_ref.tvShowName} S${episode.season}E${episode.number}`;

      let objToPush = {
        id: index + index2,
        title: title,
        start: new Date(startYear, startMonth, startDate),
        end: new Date(startYear, startMonth, startDate)
      };

      events.push(objToPush);
    })
  })
  this.setState({events:events},()=>{
    // console.log("events state updated!");
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
