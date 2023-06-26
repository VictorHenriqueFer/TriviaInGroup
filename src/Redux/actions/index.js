const GET_USER_TOKEN = 'GET_USER_TOKEN';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_USER_EMAIL = 'SET_USER_EMAIL';
const SET_USER_SCORE = 'SET_USER_SCORE';

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
const setScore = (score) => ({
  type: SET_USER_SCORE,
  score,
});

export { getPlay, setPlayerName, setGravatarEmail, setScore,
  SET_USER_SCORE,
  GET_USER_TOKEN, SET_USER_NAME, SET_USER_EMAIL };
