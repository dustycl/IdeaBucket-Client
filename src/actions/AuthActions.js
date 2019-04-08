import {
  PROJECT_NAME_CHANGED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  PHONE_NUMBER_CHANGED,
  AMOUNT_CHANGED,
  PROJECT_DESCRIPTION_CHANGED,
  TEAM_ID,
  ACCESS_TOKEN,
  TEAM_INFO,
  USERNAME,
  PROJECT_LIST,
} from './types';

export const sendInstallationId = (installationId, user_id, team_id) => {
  return (dispatch) => {
      dispatch({ type: TEAM_ID, payload: team_id })
      fetch('https://ideabucket.herokuapp.com/device/update/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
        {
          'device_id': installationId,
          'user_id': user_id
        } ),
      })
      .then((response) => response.json())
        .then((responseJson) => {
          const access_token = responseJson.access_token;
          const username = responseJson.username;
          dispatch({ type: ACCESS_TOKEN, payload: access_token });
          dispatch({ type: USERNAME, payload: username });
          dispatch(teamInfo(dispatch, team_id, access_token))
          return(team_id, access_token);
          })
  };
};

export const teamInfo = (dispatch, team_id, access_token) => {
  return () => {
      fetch('https://ideabucket.herokuapp.com/slack/team_info/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Token ' + access_token
        },
        body: JSON.stringify(
        {
          'team_id': team_id
        } ),
      })
      .then((response) => response.json())
        .then((responseJson) => {
          const team_info = responseJson.team_info
          dispatch({ type: TEAM_INFO, payload: team_info })
          dispatch(readProjects(dispatch, team_id, access_token))
          return(team_id, access_token);
          })
  };
};

export const createNewAccount = (first_name, last_name, phone_number, amount) => {
  return () => {
      fetch('https://ideabucket.herokuapp.com/project/create/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Token ' + access_token
        },
        body: JSON.stringify(
        {
          'first_name': first_name,
          'last_name': last_name,
          'phone_number': phone_number,
          'amount' : amount
        } ),
      })
  };
};

export const readProjects = (dispatch, team_id, access_token) => {
  return (dispatch) => {
      fetch('https://ideabucket.herokuapp.com/project/read/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Token ' + access_token
        },
        body: JSON.stringify(
        {
          'team_id' : team_id
        } ),
      })
      .then((response) => response.json())
        .then((responseJson) => {
          const project_list = responseJson
          dispatch({ type: PROJECT_LIST, payload: project_list })
          })
  };
};

export const updateProject = (project_name, project_description, access_token, username, team_id) => {
  return () => {
      fetch('https://ideabucket.herokuapp.com/project/update/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Token ' + access_token
        },
        body: JSON.stringify(
        {
          'team_id': team_id,
          'username': username,
          'project_id': null,
          'project_name': project_name,
          'project_description': project_description,
          'project_status': 'O',
          'project_vote_count': 4
        } ),
      })
  };
};

export const deleteProject = (project_name, access_token, username) => {
  return () => {
      fetch('https://ideabucket.herokuapp.com/project/delete/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Token ' + access_token
        },
        body: JSON.stringify(
        {
          'project_name': project_name,
          'username': username
        } ),
      })
  };
};

export const projectNameChanged = (project_name) => {
  return{
    type: PROJECT_NAME_CHANGED,
    payload: project_name
  };
};

export const firstChanged = (first_name) => {
  return{
    type: FIRST_NAME_CHANGED,
    payload: first_name
  };
};

export const lastChanged = (last_name) => {
  return{
    type: LAST_NAME_CHANGED,
    payload: last_name
  };
};

export const phoneChanged = (phone_number) => {
  return{
    type: PHONE_NUMBER_CHANGED,
    payload: phone_number
  };
};

export const amountChanged = (amount) => {
  return{
    type: AMOUNT_CHANGED,
    payload: amount
  };
};

export const projectDescriptionChanged = (project_description) => {
  return{
    type: PROJECT_DESCRIPTION_CHANGED,
    payload: project_description
  };
};
