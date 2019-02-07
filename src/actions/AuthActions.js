import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER,
  GAMES_UPDATED,
  PICK_TEAM,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  AGE_CHANGED
} from './types';

export const emailChanged = (text) => {
  return{
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return{
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const firstChanged = (text) => {
  return{
    type: FIRST_NAME_CHANGED,
    payload: text
  };
};

export const lastChanged = (text) => {
  return{
    type: LAST_NAME_CHANGED,
    payload: text
  };
};

export const ageChanged = (value) => {
  return{
    type: AGE_CHANGED,
    payload: value
  };
};

export const loginUser = (email) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER, payload: email })

      fetch('https://ideabucket.herokuapp.com/project/read/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
        {
          'team_id' : 'TC5SSBGH4',
        } ),
      })
      .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          })
  };
};

export const signupUser = (email, first_name, last_name, age, favorite_team) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER, payload: {email, first_name, last_name, age, favorite_team} })
      fetch('https://api.coachzoneapp.com/signup', {
        method: 'POST',
        headers: {
          'API-KEY':'nI6TzutLPjdZ10r8VuKFc5SiaAUosquy8lv7GHWUHaAx7wxgmZJtDq04UMCaCo2tIJQAB34TClk8NrELNk6A',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
        {
          "email" : email,
          "first_name" : first_name,
          "last_name" : last_name,
          "favorite_team": favorite_team,
          "age": age
        } ),
      })
      .then((response) => response.json())
        .then((responseJson) => {

          const user  = responseJson.data[ 'user' ];
          dispatch(loginUserSuccess(dispatch, user))
          return( user );

          })
  };
};

export const loginUserFail = (dispatch, new_user) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: new_user
   });

  Actions.signup();
};


export const loginUserSuccess = (dispatch, user) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
    const user_id = user['user_id'];
    const login_token = user['login_token'];
      fetch('https://api.coachzoneapp.com/update', {
        method: 'POST',
        headers: {
          'API-KEY':'nI6TzutLPjdZ10r8VuKFc5SiaAUosquy8lv7GHWUHaAx7wxgmZJtDq04UMCaCo2tIJQAB34TClk8NrELNk6A',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
        {
          "user_id" : user_id,
          "login_token": login_token
        } ),
      })
      .then((response) => response.json())
        .then((responseJson) => {
          const games = responseJson.data.games;
          dispatch({
            type: GAMES_UPDATED,
            payload: games
           });
          return( games )
          })

    Actions.main();
  };
};

export const pickTeam = ({ prop, value }) => {
  return {
    type: PICK_TEAM,
    payload: { prop, value }
  };
};
