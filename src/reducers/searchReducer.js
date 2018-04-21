import {SEARCH_OPTIONS} from '../actions/types';

const initialState = {
  rating: '',
  genre: '',
  status: '',
  page: 1
}

export default function(state = initialState, action){
  switch (action.type) {
    case 'SEARCH_OPTIONS':
    console.log(action.payload);
    return {
      ...state,
      rating: action.payload.rating,
      genre: action.payload.genre,
      status: action.payload.status
    }

    case 'PAGE_CHANGE':
    console.log(action.payload);
    return {
      ...state,
      page: action.payload
    }


    default:
      return state
  }
}
