import React, {PureComponent} from 'react';
import { View } from 'react-native'; 
import Campaigns from '../../components/campaign/Campaigns'; 
import { Navigation } from 'react-native-navigation';

import { list } from '../../appStyles';

export default class CampaignsScreen extends PureComponent {  

  render() {
    return (
      <View style={list.container}>  
        <Campaigns />
      </View>
    );
  }
}
 