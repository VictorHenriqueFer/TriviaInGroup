import { combineReducers } from 'redux';
import playerReducer from './playerNameReducer';
import gravatarReducer from './gravatarReducer';
import user from './user';

const rootReducer = combineReducers({
  gravatar: playerReducer,
  playerName: gravatarReducer,
  user,
});

export default rootReducer;
