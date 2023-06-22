import { combineReducers } from 'redux';
import playerReducer from './playerNameReducer';
import gravatarReducer from './gravatarReducer';

const rootReducer = combineReducers({
  gravatar: playerReducer,
  playerName: gravatarReducer,
});

export default rootReducer;
