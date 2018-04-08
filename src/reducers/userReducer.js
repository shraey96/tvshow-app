import {LOGIN_USER, LOGOUT_USER} from '../actions/types';

const initialState = {

  isUserLoggedIn: false,
  userProfile: '',
  userFollows: ''

}


export default function(state = initialState, action){

  console.log("User Reducer Called");


  switch (action.type) {
    case 'LOGIN_USER':
    return {
      ...state,
      isUserLoggedIn : action.payload.success,
      userProfile : action.payload.user,
      userFollows: ''
    }

    case 'LOGOUT_USER':
    console.log("logout");
    return {
      ...state,
      isUserLoggedIn: false,
      userProfile : '',
      userFollows: ''
    }


    default:
      return state
  }
}
