import { combineReducers } from 'redux';
import playerReducer from './playerNameReducer';
import user from './user';

const rootReducer = combineReducers({
  gravatar: playerReducer,
  user,
});

export default rootReducer;
