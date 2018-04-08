import {LOGIN_USER, LOGOUT_USER, FOLLOW_SHOW} from './types';
import urlToUse from '../config';
import axios from 'axios';

export function LoginUser(email, password) {

    let data = {
        email: email,
        password: password
    }

    console.log(data);

    return function(dispatch) {

        fetch(`${urlToUse}/users/login`, {
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
                dispatch({
                    type: LOGIN_USER,
                    payload: userData
                })
            })

    }

}


export function LogoutUser() {


    return function(dispatch) {

        fetch(`${urlToUse}/users/logout`, {
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
            })

    }

}


export function UserFollowShow(data) {

    console.log(data);

    return function(dispatch) {


        fetch(`${urlToUse}/users/userTvInfo`, {
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
                    type: FOLLOW_SHOW,
                    payload: show
                })
            })

    }

}
