import { SET_USER_EMAIL, SET_USER_NAME, SET_SCORE } from '../actions';

const initialState = {
  email: '',
  nameId: '',
  score: 0,
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER_EMAIL:
    return { ...state, email: action.email };
  case SET_USER_NAME:
    return { ...state, nameId: action.nameId };
  case SET_SCORE:
    return { ...state, score: action.score };
  default:
    return state;
  }
};

export default user;
