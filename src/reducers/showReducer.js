import {FETCH_SHOWS, FETCH_SHOWS_ID, FETCH_EPISODE_INFO, FETCH_SEARCH_QUERY} from '../actions/types';

const initialState = {
  shows: [],
  currentShow: '',
  currentShowEpisode: '',
  searchPeople: '',
  searchShow: '',
  searchShowCustom: ''
}


export default function(state = initialState, action){
  switch (action.type) {
    case 'FETCH_SHOWS':

    return {
      ...state,
      currentShow: '',
      currentShowEpisode: '',
      shows: action.payload
    }

    case 'FETCH_SHOWS_ID':
    return {
      ...state,
      currentShow: '',
      currentShow: action.payload
    }

    case 'FETCH_EPISODE_INFO':
    return{
      ...state,
      currentShowEpisode: action.payload
    }

    case 'FETCH_SEARCH_QUERY':
    return{
      ...state,
      searchShow: action.payload.show,
      searchPeople: action.payload.people
    }

    case 'FETCH_SHOWS_CUSTOM':
    return{
      ...state,
      searchShowCustom: action.payload.shows
    }

    default:
      return state
  }
}
