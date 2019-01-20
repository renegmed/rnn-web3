import React, {PureComponent} from 'react';
import {View, Text, TextInput, Button } from 'react-native'; 
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import { action$addContribution } from './campaign.actions';
import { input } from '../../appStyles';

class Contribute extends PureComponent {  

    state = {
      contribution: 0
    } 

    render() { 
      const { campaign } = this.props;  
      return (      
        <View >  
          <Text>{campaign.id}</Text>
          <Text>{campaign.description}</Text>
          <Text>{campaign.target}</Text>
          <Text>{campaign.minimum}</Text>
          <Text>{campaign.contributors}</Text>
          <Text>{campaign.amount}</Text>
          <TextInput
            placeholder="Contribution Amount"
            keyboardType='numeric'
            value={this.state.contribution}
            maxLength={20}
            onChangeText={ (text) => this.contributionChangedHandler(text)}
            style={input.field}
          />
          <Button title='Contribute Now' onPress={ this.onConbribute } />
          <Button title='Cancel' onPress={this.onCancel} />
        </View>
      );
    }

    contributionChangedHandler = val => {    
      this.setState({ contribution: val })
    }

    onConbribute = () => { 
        this.props.action$addContribution(this.props.campaign.id, this.state.contribution)
        Navigation.dismissModal(this.props.componentId);
    }

    onCancel = () => {
        Navigation.dismissModal(this.props.componentId);
    }
}

export default connect(null, { action$addContribution } ) (Contribute)