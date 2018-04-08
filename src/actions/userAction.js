import {LOGIN_USER, LOGOUT_USER} from './types';
import urlToUse from '../config';

export function LoginUser(email, password){

let data = {
  email : email,
  password : password
}

console.log(data);

return function(dispatch){

fetch(`${urlToUse}/users/login`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
      .then(userData=> userData.json())
      .then((userData)=>{
        console.log(userData);
         dispatch({
         type: LOGIN_USER,
         payload: userData
       })
      })

  }

}


export function LogoutUser(){


  return function(dispatch){

fetch(`${urlToUse}/users/logout`, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json'
  },
})
      .then(userLogout=> userLogout.json())
      .then((userLogout)=>{
        console.log(userLogout);
         dispatch({
         type: LOGOUT_USER,
         payload: userLogout
       })
      })

  }

}


export function UserFollowShow(data){

console.log(data);

//   return function(dispatch){
//
// fetch(`${urlToUse}/users/logout`, {
//   method: 'get',
//   headers: {
//     'Content-Type': 'application/json'
//   },
// })
//       .then(userLogout=> userLogout.json())
//       .then((userLogout)=>{
//         console.log(userLogout);
//          dispatch({
//          type: LOGOUT_USER,
//          payload: userLogout
//        })
//       })
//
//   }

}
