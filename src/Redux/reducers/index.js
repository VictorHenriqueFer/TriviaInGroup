import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import gravatarReducer from './gravatarReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  gravatar: gravatarReducer,
});

export default rootReducer;
