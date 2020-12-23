import {combineReducers} from 'redux';

import AppStateReducer from './AppStateReducer';
import UserReducer from './UserReducer';
import ActivityReducer from './ActivityReducer';

const rootReducer = combineReducers({
  appState: AppStateReducer,
  user: UserReducer,
  activity: ActivityReducer,
});

export default rootReducer;
