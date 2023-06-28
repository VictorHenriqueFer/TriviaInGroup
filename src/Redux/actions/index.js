export const GET_USER_TOKEN = 'GET_USER_TOKEN';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_SCORE = 'SET_USER_SCORE';
export const TIME_UP = 'TIME_UP';
export const TIME_SECONDS = 'TIME_SECONDS';
export const BUTTON_SELECT = 'BUTTON_SELECT';

export const getPlay = (gettoken) => ({
  type: GET_USER_TOKEN,
  gettoken,

});
export const setPlayerName = (name) => ({
  type: SET_USER_NAME,
  name,

});
export const setGravatarEmail = (gravatarEmail) => ({
  type: SET_USER_EMAIL,
  gravatarEmail,
});
export const setScore = (score) => ({
  type: SET_USER_SCORE,
  score,
});
export const isTimeUp = (timeUp) => ({
  type: TIME_UP,
  timeUp,
});
export const isTimeSeconds = (time) => ({
  type: TIME_SECONDS,
  time,
});
export const buttonSelect = (button) => ({
  type: 'BUTTON_SELECT',
  button,
});

export const apiSeachSuccess = (data) => (
  { type: 'API_SEARCH_SUCCESS', data }
);
export const apiSeachError = (error) => (
  { type: 'API_SEARCH_ERROR', error }
);

export const apiSeachToken = (token) => async (dispatch) => {
  try {
    const min = 3;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    if (data.response_code === min) {
      return true;
    }
    dispatch(apiSeachSuccess(data.results));
  } catch (error) {
    dispatch(apiSeachError(error));
  }
};
