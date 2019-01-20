import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';  
import { Navigation } from 'react-native-navigation';
  
import {  action$addCampaign } from '../../components/campaign/campaign.actions';

class NewCampaign extends PureComponent {  
  
    render() {
      return (
        <View >  
          <Text>Add Campaign</Text>
          <Button title='Add Campaign Now!' onPress={this.onAddCampaign} />
          <Button title='Cancel' onPress={this.onCancel} />
        </View>
      );
    }

    onAddCampaign = () => {
        const data = { 
            id: '0x5774566230B99845C2345329519C30AF',
            description: 'Election Fund',
            target: 10000000000000,
            minimum: 1000000,
            contributors: 3,
            amount: 9000000  
        }

        this.props.action$addCampaign(data)

        Navigation.dismissModal(this.props.componentId);
    }

    onCancel = () => {
        Navigation.dismissModal(this.props.componentId);
    } 
} 

export default connect(null, { action$addCampaign }) (NewCampaign);
 