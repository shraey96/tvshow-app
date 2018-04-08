import {combineReducers} from 'redux';

import showReducer from './showReducer';
import userReducer from './userReducer';

export default combineReducers({
  shows: showReducer,
  // options: optionsReducer
  user: userReducer
})
