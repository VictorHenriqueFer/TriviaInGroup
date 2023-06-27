import { SET_USER_EMAIL, SET_USER_NAME, SET_USER_SCORE } from '../actions';

const initialState = {

  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  data: [],

};

const user = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER_EMAIL:
    return { ...state, gravatarEmail: action.gravatarEmail };
  case SET_USER_NAME:
    return { ...state, name: action.name };
  case SET_USER_SCORE:
    return { ...state, score: action.score };
  case 'API_SEARCH_SUCCESS':
    return { ...state, data: action.data };
  case 'API_SEARCH_ERROR':
    return { ...state, error: action.error };
  default:
    return state;
  }
};

export default user;
