import React, { Component } from 'react';

import {Switch, Route} from 'react-router-dom';

import Shows from './Shows';
import Home from './Home';
import AboutShow from './AboutShow';
import AboutShowEpisode from './AboutShowEpisode';
import Search from './Search';
import Login from './Login'
import About from './About'
import MyShows from './MyShows'
import '../App.css';




//main component to handle routes to pages

class Main extends Component {
  render() {
    return (
      <div className="App">

<main>
  <Switch>
<Route exact path="/" component={Home}/>
<Route exact path="/shows" component={Shows}/>
<Route exact path="/about" component={About}/>
<Route exact path="/login" component={Login}/>
<Route exact path="/search/:query" component={Search}/>
<Route exact path="/shows/:tvshow/:id" component={AboutShow}/>
<Route exact path="/shows/:tvshowname/:tvshowid/:season/episode/:enum" component={AboutShowEpisode}/>

<Route exact path="/:username/myshows" component={MyShows}/>

  </Switch>
</main>

      </div>
    );
  }
}

export default Main;
