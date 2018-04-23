import {SEARCH_OPTIONS} from '../actions/types';

const initialState = {
  rating: '',
  genre: '',
  status: '',
  language: '',
  statusValue: '',
  ratingValue: '',
  genreValue: '',
  languageValue: '',
  page: 1
}

export default function(state = initialState, action){
  switch (action.type) {
    case 'SEARCH_OPTIONS':
    console.log(action.payload);
    return {
      ...state,
      rating: action.payload.options.rating,
      genre: action.payload.options.genre,
      status: action.payload.options.status,
      language: action.payload.options.language,
      statusValue: action.payload.optionsValue.status,
      ratingValue: action.payload.optionsValue.rating,
      genreValue: action.payload.optionsValue.genre,
      languageValue: action.payload.optionsValue.language,
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
