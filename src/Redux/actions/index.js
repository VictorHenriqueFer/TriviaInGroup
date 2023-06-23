const GET_USER_TOKEN = 'GET_USER_TOKEN';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_USER_EMAIL = 'SET_USER_EMAIL';

const getPlay = (gettoken) => ({
  type: GET_USER_TOKEN,
  gettoken,

});
const setPlayerName = (nameId) => ({
  type: SET_USER_NAME,
  nameId,

});
const setGravatarEmail = (email) => ({
  type: SET_USER_EMAIL,
  email,
});

export { getPlay, setPlayerName, setGravatarEmail,
  GET_USER_TOKEN, SET_USER_NAME, SET_USER_EMAIL };
