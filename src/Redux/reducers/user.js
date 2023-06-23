import { SET_USER_EMAIL, SET_USER_NAME } from '../actions';

const InitialState = {
  email: '',
  nameId: '',
};

const user = (state = InitialState, action) => {
  switch (action.type) {
  case SET_USER_EMAIL:
    return { ...state, email: email.action };
  case SET_USER_NAME:
    return { ...state, nameId: nameId.action };
  default:
    return state;
  }
};

export default user;
