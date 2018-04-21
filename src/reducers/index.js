import {combineReducers} from 'redux';

import showReducer from './showReducer';
import userReducer from './userReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  shows: showReducer,
  search: searchReducer,
  user: userReducer
})
