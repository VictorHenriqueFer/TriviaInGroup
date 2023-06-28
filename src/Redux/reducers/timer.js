import { TIME_UP, TIME_SECONDS, BUTTON_SELECT } from '../actions';

const initialState = {

  isTimeUp: false,
  time: 30,
  buttonSelect: false,

};

const timer = (state = initialState, action) => {
  switch (action.type) {
  case TIME_UP:
    return { isTimeUp: action };
  case TIME_SECONDS:
    return { time: action };
  case BUTTON_SELECT:
    return { buttonSelect: action };
  default:
    return state;
  }
};

export default timer;
