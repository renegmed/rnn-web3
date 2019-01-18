import {Navigation} from 'react-native-navigation'; 

import { Provider } from 'react-redux';

import { store } from './store';

export function registerScreens() {   
  Navigation.registerComponentWithRedux(
      'MainPage', () => require('./Main').default, Provider, store);
}
