import {LOGIN_USER, LOGOUT_USER, FOLLOW_SHOW} from './types';
import urlToUse from '../config';
import axios from 'axios';

export function LoginUser(email, password){

let data = {
  email : email,
  password : password
}

console.log(data);

return function(dispatch){

// fetch(`${urlToUse}/users/login`, { credentials : 'same-origin' },{
//   method: 'post',
//   credentials: 'same-origin',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// })
//       .then(userData=> userData.json())
//       .then((userData)=>{
//         console.log(userData);
//          dispatch({
//          type: LOGIN_USER,
//          payload: userData
//        })
//       })

axios({
    method: 'post',
    url: `${urlToUse}/users/login`,
    data: (data),
    config: { headers: {'Content-Type': 'application/json' }}
})
    .then(function (response) {
        //handle success
                 dispatch({
                 type: LOGIN_USER,
                 payload: response.data
               })
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

  }

}


export function LogoutUser(){


  return function(dispatch){

fetch(`${urlToUse}/users/logout`, {
  method: 'get',
  credentials: 'same-origin',
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

  return function(dispatch){

    axios({
        method: 'post',
        url: `${urlToUse}/users/userTvInfo`,
        data: (data),

        config: { headers: {'Content-Type': 'application/json' }}
    })
        .then(function (response) {
            //handle success
                     dispatch({
                     type: LOGIN_USER,
                     payload: response.data
                   })
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });


// fetch(`${urlToUse}/users/userTvInfo`, {
//   method: 'post',
//   credentials: 'same-origin',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// })
//       .then(show=> show.json())
//       .then((show)=>{
//         console.log(show);
//          dispatch({
//          type: LOGOUT_USER,
//          payload: show
//        })
//       })





  }


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
