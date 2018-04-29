import {LOGIN_USER, LOGOUT_USER, REGISTER_USER ,FOLLOW_SHOW, UNFOLLOW_SHOW, FOLLOW_EPISODE, UNFOLLOW_EPISODE, GET_USER_INFO, LOGIN_USER_GOOGLE} from './types';
import urlToUse from '../config';

export function LoginUser(email, password) {

  // let OneSignal = window.OneSignal || [];
  // OneSignal.push(function() {
  //   OneSignal.init({
  //     appId: "19de5a98-baae-4f0c-91f6-9f3127e36de3",
  //     autoRegister: false,
  //     notifyButton: {
  //       enable: true,
  //     },
  //   });
  //
  //   OneSignal.getUserId(function(userId) {
  //     console.log(userId);
  //
  //
  //
  //
  //
  //   })
  //
  // });


    let data = {
        email: email,
        password: password
    }

    console.log(data);

    return function(dispatch) {

      return  fetch(`${urlToUse}/users/login`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(userData => userData.json())
            .then((userData) => {
                console.log(userData);


sendOSID();

                if(userData.success === true){
                        dispatch({
                            type: LOGIN_USER,
                            payload: userData
                        })

                               localStorage.setItem('isUserLoggedIn', true);
                  return userData
                }else {
                  return userData
                }



            })

    }

}


export function LoginUserGoogle(credentials){
console.log(credentials);
  return function(dispatch) {

    return  fetch(`${urlToUse}/users/login/google`, {
              method: 'post',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(credentials)
          })
          .then(userData => userData.json())
          .then((userData) => {
              console.log(userData);


              sendOSID();

              if(userData.success === true){
                      dispatch({
                          type: LOGIN_USER_GOOGLE,
                          payload: userData
                      })

                             localStorage.setItem('isUserLoggedIn', true);
                return userData
              }else {
                return userData
              }



          })

  }

}


export function LogoutUser() {


    return function(dispatch) {

      return  fetch(`${urlToUse}/users/logout`, {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(userLogout => userLogout.json())
            .then((userLogout) => {
                console.log(userLogout);
                dispatch({
                    type: LOGOUT_USER,
                    payload: userLogout
                })
                return userLogout

                if(userLogout.success === true){
                    localStorage.setItem('isUserLoggedIn', false);
                }

            })

    }

}

export function RegisterUser(data){

  return function(dispatch){

    return  fetch(`${urlToUse}/users/register`, {
                  method: 'post',
                  credentials: 'include',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              })
              .then(registered => registered.json())
              .then((registered) => {
                  console.log(registered);


                  return registered

                })

  }

}


export function UserFollowShow(data) {

    console.log(data);

    return function(dispatch) {


      return  fetch(`${urlToUse}/users/userTvInfo/follow`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(show => show.json())
            .then((show) => {
                console.log(show);
                dispatch({
                    type: UNFOLLOW_SHOW,
                    payload: show
                })
                return show
            })

    }

}

export function UserUnFollowShow(data) {

    console.log(data);

    return function(dispatch) {


      return  fetch(`${urlToUse}/users/userTvInfo/unfollow`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(show => show.json())
            .then((show) => {
                console.log(show);
                dispatch({
                    type: UNFOLLOW_SHOW,
                    payload: show
                })
                return show
            })

    }

}


export function getUserData(userData){
return function(dispatch){

  return fetch(`${urlToUse}/users/tvseries`, {credentials: 'include'})
  .then((userCompleteList) => userCompleteList.json())
  .then((userCompleteList)=>{
    console.log(userCompleteList);
    if(userCompleteList.success===true){
    dispatch({
        type: GET_USER_INFO,
        payload: userCompleteList
    })
    return userCompleteList
  }
  })
}
}


export function followEpisode(data){


  return function(dispatch){

  return  fetch(`${urlToUse}/users/episodeWatched`, {
            method: 'put',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(result => result.json())
        .then((result) => {
          console.log(result);

          dispatch({
            type: FOLLOW_EPISODE,
            payload: result
          })

          return result

        })

  }

}

export function unFollowEpisode(data){
  return function(dispatch){

  return  fetch(`${urlToUse}/users/episodeWatched`, {
            method: 'put',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(result => result.json())
        .then((result) => {
          console.log(result);

          dispatch({
            type: UNFOLLOW_EPISODE,
            payload: result
          })

          return result

        })

  }
}


function sendOSID(){
  console.log("Sending osID");
  let OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "19de5a98-baae-4f0c-91f6-9f3127e36de3",
      autoRegister: false,
      notifyButton: {
        enable: true,
      },
    });

    OneSignal.getUserId(function(userId) {

      let data = {
        osid: userId
      };

      fetch(`${urlToUse}/users/login/osid`, {
                method: 'put',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(osid => osid.json())
            .then((osid) => {
                console.log(osid);
              })



    })

  });


}
