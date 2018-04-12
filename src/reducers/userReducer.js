import {LOGIN_USER, LOGOUT_USER, FOLLOW_SHOW} from '../actions/types';

const initialState = {

  isUserLoggedIn: false,
  userProfile: '',
  userFollows: []

}


export default function(state = initialState, action){

  console.log("User Reducer Called: ", action.type);

  switch (action.type) {
    case 'LOGIN_USER':
    console.log(action.payload);
    return {
      ...state,
      isUserLoggedIn : action.payload.login.success,
      userProfile : action.payload.login.user,
      userFollows: action.payload.userInfo.info.tvShowInfo
    }

    case 'LOGOUT_USER':
    console.log("logout");
    return {
      ...state,
      isUserLoggedIn: false,
      userProfile : '',
      userFollows: ''
    }

    case 'FOLLOW_EPISODE':
    return {
      ...state,
      userFollows: action.payload.user.tvShowInfo
    }

    case 'FOLLOW_SHOW':
    console.log(action.payload);
    return{
      ...state,
      userFollows: action.payload.result.tvShowInfo
    }


    default:
      return state
  }
}
