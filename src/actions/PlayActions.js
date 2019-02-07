import {
  PLAY_PICKER,
  PLAY_PICKED,
  GAME_PICKED,
  PLAY_RESULTS
} from './types';
import Images from '../../media';


export const playPicker = () => {
  return (dispatch) => {

    dispatch({
      type: PLAY_PICKER,
      payload: Images.Plays
      },
    );
    // dispatch({
    //   type: GAME_PICKED,
    //   payload: this.props.game.away_team
    // })
  };
};

export const playPicked = (play_id) => {
  return (dispatch) => {
    // console.log(this.state.play_id);
    // const new_play = play_id !== this.state.play_id ? true : false;
    // console.log('NEW PLAY...');
    // console.log(new_play);
    // console.log('...NEW PLAY');

    dispatch(
    {
      type: PLAY_PICKED,
      payload: ({waiting: true, play_picked: play_id})
    }
    );

    // const io = require('socket.io-client');
    // const domain = 'https://api.coachzoneapp.com';
    // const apiKey = 'nI6TzutLPjdZ10r8VuKFc5SiaAUosquy8lv7GHWUHaAx7wxgmZJtDq04UMCaCo2tIJQAB34TClk8NrELNk6A';
    // const host = domain + '?api_key='+ apiKey +'&user_id='+ this.props.user_id +'&login_token='+ this.props.login_token + '&game_id=6e2d30ad-a125-4708-9540-ee2ddc119cec';
    // const socket = io(host, { path: '/socket' });
    //
    // function makePlaycall(offense_id) {
    //   const myMsg = {
    //     play_id: "000",
    //     defense_id: "1",
    //     offense_id: offense_id,
    //     offensive_team: "LA"
    //   };
    //   return(myMsg);
    // }
    //
    // const myMsg = makePlaycall(offense_id)
    //
    // socket.emit("playcall", myMsg);
    //
    // // socket.on("play_update", (msg) => {
    // //     this.setState({
    // //       offensive_points: msg.details.info.offensive_points,
    // //       defensive_points: msg.details.info.defensive_points,
    // //       yfd: msg.details.info.yfd,
    // //       down: msg.details.info.down,
    // //       period: msg.details.info.period,
    // //       clock: msg.details.info.clock,
    // //     })
    // //   });

  };
};

export const gamePicked = (game) => {
  return (dispatch) => {
    dispatch({
      type: GAME_PICKED,
      payload: game
    });
  };
};

export const playResults = (results) => {
  return (dispatch) => {
    console.log('leetcode leetcode!')
    dispatch({
      type: PLAY_RESULTS,
      payload: results
    });
  };
};
