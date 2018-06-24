import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import { firebaseStateReducer as firebase } from 'react-redux-firebase'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  firebase,
});

export default rootReducer;
