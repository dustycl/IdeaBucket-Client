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
   PROJECT_LIST
} from '../actions/types';

const INITIAL_STATE = {
   project_name: '',
   first_name: '',
   last_name: '',
   phone_number: '',
   amount: '',
   project_description: '',
   team_id: '',
   access_token: '',
   team_info: null,
   project_list: null
 };

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case PROJECT_NAME_CHANGED:
      return { ...state, project_name: action.payload };
    case FIRST_NAME_CHANGED:
      return { ...state, first_name: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, last_name: action.payload };
    case PHONE_NUMBER_CHANGED:
      return { ...state, phone_number: action.payload };
    case AMOUNT_CHANGED:
      return { ...state, amount: action.payload };
    case PROJECT_DESCRIPTION_CHANGED:
      return { ...state, project_description: action.payload };
    case TEAM_ID:
      return { ...state, team_id: action.payload };
    case ACCESS_TOKEN:
      return { ...state, access_token: action.payload };
    case TEAM_INFO:
      return { ...state, team_info: action.payload };
    case PROJECT_LIST:
      return { ...state, project_list: action.payload };
    default:
      return state;
  }
};
