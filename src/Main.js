import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';

class Main extends PureComponent {
    static get options() {
        return {
          topBar: { 
            rightButtons: [
                { 
                  text: 'Menu'
                }
              ]
          }
        };
    }
    
  render() {
    return (
      <View> 
        <Text>Main Page</Text>
      </View>
    );
  }
}

export default Main;