import {
   EMAIL_CHANGED,
   PASSWORD_CHANGED,
   FIRST_NAME_CHANGED,
   LAST_NAME_CHANGED,
   AGE_CHANGED,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_FAIL,
   LOGIN_USER,
   SIGNUP_USER,
   GAMES_UPDATED,
   PICK_TEAM
} from '../actions/types';

const INITIAL_STATE = {
   email: '',
   password: '',
   first_name: '',
   last_name: '',
   age: null,
   favorite_team: '',
   user: null,
   error: '',
   loading: false,
   new_user: false,
   games: ''
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case FIRST_NAME_CHANGED:
      return { ...state, first_name: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, last_name: action.payload };
    case AGE_CHANGED:
      return { ...state, age: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '', email: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false, new_user: action.payload }
    case SIGNUP_USER:
      return { ...state, loading: true, error: '', user: action.payload };
    case GAMES_UPDATED:
      return { ...state, games: action.payload };
      case PICK_TEAM:
        return { ...state, favorite_team: action.payload.value};
    default:
      return state;
  }
};
