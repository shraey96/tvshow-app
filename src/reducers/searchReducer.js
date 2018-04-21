import {SEARCH_OPTIONS} from '../actions/types';

const initialState = {
  rating: '',
  genre: '',
  status: ''
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


    default:
      return state
  }
}
