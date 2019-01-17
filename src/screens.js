import {Navigation} from 'react-native-navigation'; 
export function registerScreens() { 

  Navigation.registerComponent('MainPage', () => require('./Main').default); 

}
