import { TIME_UP, TIME_SECONDS, BUTTON_SELECT } from '../actions';

const initialState = {

  isTimeUp: false,
  time: 30,
  buttonSelect: false,

};

const timer = (state = initialState, action) => {
  switch (action.type) {
  case TIME_UP:
    return { ...state, isTimeUp: action.payload };
  case TIME_SECONDS:
    return { ...state, time: action.payload };
  case BUTTON_SELECT:
    return { ...state, buttonSelect: action };
  default:
    return state;
  }
};

export default timer;
