import {FETCH_SHOWS, FETCH_SHOWS_ID, FETCH_EPISODE_INFO, FETCH_SEARCH_QUERY} from './types';

export function fetchShows(query){
  return function(dispatch){
      fetch(`http://api.tvmaze.com/schedule`)
      .then(res=>res.json())
      .then(shows=>
{
        dispatch({
        type: FETCH_SHOWS,
        payload: shows
      })
}
    )

  }
}


export function fetchShowByID(showid){
  return function(dispatch){
      fetch(`http://api.tvmaze.com/shows/${showid}?embed=cast`)
      .then(res=>res.json())
      .then(show=>
{
        dispatch({
        type: FETCH_SHOWS_ID,
        payload: show
      })
}
    )

  }
}


export function fetchEpisodeByNumber(showID, season, episode){
  return function(dispatch){

    fetch(`http://api.tvmaze.com/shows/${showID}/episodebynumber?season=${season}&number=${episode}`)
    .then(res=>res.json())
    .then(show=>
{
      dispatch({
      type: FETCH_EPISODE_INFO,
      payload: show
    })
}
  )

  }
}


export function fetchSearchQueryInfo(query){
let urls = [`http://api.tvmaze.com/search/shows?q=${query}`, `http://api.tvmaze.com/search/people?q=${query}`];

  return function(dispatch){

var apiRequest1 = fetch(urls[0]).then(function(response){
         return response.json()
});
var apiRequest2 = fetch(urls[1]).then(function(response){
         return response.json()
});

Promise.all([apiRequest1,apiRequest2]).then(function(values){

    dispatch({
    type: FETCH_SEARCH_QUERY,
    payload:{
      show: values[0],
      people: values[1]
    }
  })


});

  }
}
