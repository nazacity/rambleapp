import {combineReducers} from 'redux';

import AppStateReducer from './AppStateReducer';
import UserReducer from './UserReducer';
import ActivityReducer from './ActivityReducer';
import CommunityReducer from './CommunityReducer';
import PDPAReducer from './PDPAReducer';
import SocialReducer from './SocialReducer';

const rootReducer = combineReducers({
  appState: AppStateReducer,
  user: UserReducer,
  activity: ActivityReducer,
  community: CommunityReducer,
  PDPA: PDPAReducer,
  social: SocialReducer,
});

export default rootReducer;
