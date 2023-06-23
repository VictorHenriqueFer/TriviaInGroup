import { GET_USER_TOKEN } from '../actions';

const InitialState = {
  gettoken: [],

};

const playerNameReducer = (state = InitialState, action) => {
  switch (action.type) {
  case GET_USER_TOKEN:
    return { ...state, gettoken: action.gettoken };
  default:
    return state;
  }
};
export default playerNameReducer;
