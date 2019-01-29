import React, {PureComponent} from 'react';
import {View, Text, TextInput, Button } from 'react-native'; 
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import { action$addContribution } from '../../components/campaign/campaign.actions';
import { input } from '../../appStyles';

class Contribute extends PureComponent {  

    state = {
      contribution: "" 
    } 

    // componentWillUnmount() {
    //   try{
    //     Navigation.dismissModal(this.props.componentId);
    //   } catch (err) {
    //     console.log(err);
    //   }
     
    // }

    render() { 
      const campaign = this.props.selectedCampaign;  
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
          <Button title='Contribute Now' onPress={ this.onContribute } />
          <Button title='Cancel' onPress={this.onCancel} />
        </View>
      );
    }

    contributionChangedHandler = val => {    
      this.setState({ contribution: val })
    }

    onContribute = async () => { 
        try {
            await this.props.action$addContribution(this.props.selectedCampaign.id, Number(this.state.contribution))
        } catch (err) {
            console.log(err)
        }      
        Navigation.dismissModal(this.props.componentId);
    }

    onCancel = () => {
        Navigation.dismissModal(this.props.componentId);
    }
}

function mapStateToProps(state) {
  return {
      selectedCampaign: state.campaign.selectedCampaign 
  }
}
export default connect(mapStateToProps, { action$addContribution } ) (Contribute)