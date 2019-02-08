import {
   PROJECT_NAME_CHANGED,
   PROJECT_DESCRIPTION_CHANGED,
   TEAM_ID
} from '../actions/types';

const INITIAL_STATE = {
   project_name: '',
   project_description: '',
   team_id: '',
 };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PROJECT_NAME_CHANGED:
      return { ...state, project_name: action.payload };
    case PROJECT_DESCRIPTION_CHANGED:
      return { ...state, project_description: action.payload };
    case TEAM_ID:
      return { ...state, team_id: action.payload };
    default:
      return state;
  }
};
