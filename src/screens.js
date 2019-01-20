import {Navigation} from 'react-native-navigation'; 

import { Provider } from 'react-redux';

import { store } from './store';

export function registerScreens() {   
  Navigation.registerComponentWithRedux(
    'MainPage', () => require('./Main').default, Provider, store);
       
  Navigation.registerComponentWithRedux(
    'campaign.addCampaign', () => require('./screens/campaign/NewCampaign').default, Provider, store);
  
    // Navigation.registerComponent(
    //   'campaign.Contribution', () => require('./screens/campaign/Contribute').default);    

  Navigation.registerComponentWithRedux(
    'campaign.Contribution', () => require('./components/campaign/Contribute').default, Provider, store);    
}
