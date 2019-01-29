import {combineReducers} from 'redux';

import campaignReducer from './components/campaign/campaign.reducer';
import requestReducer from './components/request/request.reducer';

const rootReducer = combineReducers({
  campaign: campaignReducer,
  request: requestReducer
});

export default rootReducer;
