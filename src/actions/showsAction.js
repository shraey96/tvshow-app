import {FETCH_SHOWS, FETCH_SHOWS_ID, FETCH_EPISODE_INFO, FETCH_SEARCH_QUERY, FETCH_SHOWS_CUSTOM} from './types';
import urlToUse from '../config';

export function fetchShows(query){
  return function(dispatch){
  return    fetch(`https://api.tvmaze.com/schedule`)
      .then(res=>res.json())
      .then(shows=>
{


    shows = shows.sort((r1, r2)=>{
      if(r1.show.rating.average){
        return r2.show.rating.average - r1.show.rating.average
      }else {
        return r1.show.rating.average
      }
    })

        dispatch
        ({
        type: FETCH_SHOWS,
        payload: shows
        })

        return shows
}
    )

  }
}


export function fetchShowByID(showid){
  return function(dispatch){
      fetch(`https://api.tvmaze.com/shows/${showid}?embed=cast`)
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

return    fetch(`https://api.tvmaze.com/shows/${showID}/episodebynumber?season=${season}&number=${episode}`)
    .then(res=>res.json())
    .then(show=>
{
      dispatch({
      type: FETCH_EPISODE_INFO,
      payload: show
    })
    return show
}
  )

  }
}


export function fetchSearchQueryInfo(query){
let urls = [`https://api.tvmaze.com/search/shows?q=${query}`, `https://api.tvmaze.com/search/people?q=${query}`];

  return function(dispatch){

var apiRequest1 = fetch(urls[0]).then(function(response){
         return response.json()
});
var apiRequest2 = fetch(urls[1]).then(function(response){
         return response.json()
});

return Promise.all([apiRequest1,apiRequest2]).then(function(values){

    dispatch({
    type: FETCH_SEARCH_QUERY,
    payload:{
      show: values[0],
      people: values[1]
    }
  })
  return values[0]

});

  }
}

export function fetchShowsCustom(query){
  console.log(query);
  if(query.rating === 'Show Rating'){
    query.rating = '';
  }

  if(query.genre === 'Show Genre'){
    query.genre = '';
  }

  if(query.status === 'Show Status'){
    query.status = '';
  }

  if(query.language === 'Show Language'){
    query.language = '';
  }


  console.log("##### FETCH SHOWS CUSTOM");
  return function(dispatch){

return fetch(`${urlToUse}/users/shows?page=${query.page}&rating=${query.rating}&genres=${query.genre}&status=${query.status}&language=${query.language}`, {
  method: 'get',
  credentials: 'include',
})
// return fetch(`${urlToUse}/users/shows?page=${query.page}&rating=${query.rating}&genres=${query.genre}&status=${query.status}  `)
    .then(res=>res.json())
    .then(show=>
{
  console.log("FETCH SHOWS CUSTOM: ", show);

  show.shows = shuffle(show.shows);

      dispatch({
      type: FETCH_SHOWS_CUSTOM,
      payload: show
    })
    return show
}
  )

  }

}


function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
