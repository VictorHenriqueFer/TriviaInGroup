import { TIME_UP, TIME_SECONDS } from '../actions';

const initialState = {

  isTimeUp: false,
  time: 30,

};

const timer = (state = initialState, action) => {
  switch (action.type) {
  case TIME_UP:
    return { isTimeUp: action };
  case TIME_SECONDS:
    return { time: action };
  default:
    return state;
  }
};

export default timer;
