import {combineReducers} from 'redux';

import campaignReducer from './components/campaign/campaign.reducer';

const rootReducer = combineReducers({
  campaign: campaignReducer
});

export default rootReducer;
