import {
  PROJECT_NAME_CHANGED,
  PROJECT_DESCRIPTION_CHANGED,
  TEAM_ID
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
          console.log(responseJson);
          })
  };
};

export const teamInfo = (team_id) => {
  return () => {
      fetch('https://ideabucket.herokuapp.com/slack/team_info/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
        {
          'team_id': team_id
        } ),
      })
      .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          })
  };
};

export const projectNameChanged = (project_name) => {
  return{
    type: PROJECT_NAME_CHANGED,
    payload: project_name
  };
};

export const projectDescriptionChanged = (project_description) => {
  return{
    type: PROJECT_DESCRIPTION_CHANGED,
    payload: project_description
  };
};

export const readProjects = (team_id) => {
  return () => {
      fetch('https://ideabucket.herokuapp.com/project/read/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
        {
          'team_id' : team_id
        } ),
      })
      .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          })
  };
};

export const createProject = (email, password) => {
  return () => {
      fetch('https://ideabucket.herokuapp.com/project/create/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
        {
          'project_name': email,
          'project_description': password,
          'username': 'jmbrenna',
          'team_id' : 'TC5SSBGH4'
        } ),
      })
  };
};

export const updateProject = (email, password) => {
  return () => {
      fetch('https://ideabucket.herokuapp.com/project/update/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
        {
          'username': 'jmbrenna',
          'project_name': email,
          'project_description': password,
          'project_status': 'O',
          'project_vote_count': 4
        } ),
      })
  };
};

export const deleteProject = (email) => {
  return () => {
      fetch('https://ideabucket.herokuapp.com/project/delete/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
        {
          'project_name': email,
          'username': 'jmbrenna'
        } ),
      })
  };
};
