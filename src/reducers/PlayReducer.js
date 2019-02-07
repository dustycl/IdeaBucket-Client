import {
  PLAY_PICKER,
  PLAY_PICKED,
  GAME_PICKED,
  PLAY_RESULTS
} from '../actions/types';

const INITIAL_STATE = {
  plays: '',
  waiting: false,
  game: null,
  play_picked: null,
  status: null,
  results: null,
  new_play: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type){
    case PLAY_PICKER:
      return { ...state, plays: action.payload };
    case PLAY_PICKED:
      return { ...state, waiting: action.payload.waiting, play_picked: action.payload.play_picked };
    case GAME_PICKED:
      return { ...state, game: action.payload };
    case PLAY_RESULTS:
      return { ...state, waiting: false, results: action.payload };
    default:
      return state;
  }
};
