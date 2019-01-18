import './global' 
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'MainPage'
            }
          }
        ],
        options: {
          topBar: {
            title: {
              text: 'Welcome To Kickstart'
            }
          }
        }
      }
    }
  });
});

