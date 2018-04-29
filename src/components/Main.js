import React, { Component } from 'react';

import {Switch, Route} from 'react-router-dom';

// import Shows from './Shows';
import Home from './Home';
import AboutShow from './AboutShow';
import AboutShowEpisode from './AboutShowEpisode';
import Search from './Search';
import Login from './Login';
import Register from './Register';
import About from './About';
import MyShows from './MyShows';
import Calendar from './Calendar';
import MoreShows from './MoreShows';
import AboutShowCast from './AboutShowCast';
import AboutShowCrew from './AboutShowCrew';
import People from './People';
import Episodes from './Episodes';
import ProfilePage from './ProfilePage';

import '../App.css';




//main component to handle routes to pages

class Main extends Component {
  render() {

    return (
      <div className="App">

<main>
  <Switch>
<Route exact path="/" component={Home}/>

<Route exact path="/about" component={About}/>
<Route exact path="/login" component={Login}/>
<Route exact path="/register" component={Register}/>
<Route exact path="/search/:query" component={Search}/>
<Route exact path="/shows/:tvshow/:id" component={AboutShow}/>
<Route exact path="/shows/episodes/:tvshow/:id" component={Episodes}/>
<Route exact path="/shows/cast/:tvshow/:id" component={AboutShowCast}/>
<Route exact path="/shows/crew/:tvshow/:id" component={AboutShowCrew}/>
<Route exact path="/shows/:tvshowname/:tvshowid/:season/episode/:enum" component={AboutShowEpisode}/>
<Route exact path="/calendar" component={Calendar}/>
<Route exact path="/people/:person/:id" component={People}/>
<Route exact path="/:username/myshows" component={MyShows}/>
<Route exact path="/:username/profile" component={ProfilePage}/>
<Route exact path="/more-shows" component={MoreShows}/>
<Route exact path="/more-shows/:genre/:gid/:rating/:rid/:status/:sid/:language/:lid" component={MoreShows}/>

  </Switch>
</main>

      </div>
    );
  }
}

export default Main;
