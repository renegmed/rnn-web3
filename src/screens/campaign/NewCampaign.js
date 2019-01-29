import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';  
import { Navigation } from 'react-native-navigation';
  
import {  action$addCampaign } from '../../components/campaign/campaign.actions'; 

class NewCampaign extends PureComponent {  
    state = {
        campaign: {
            description: "",
            targetAmount: "",
            minimum: ""    
        }
    }
    // inputChangedHandler(e) { 
       
    //    //  const {  value } = e.target;  //it will destructure your name and value where ever you are using _handleChange method.
        
    //    //alert("value: " + value + "  field: " + name);

    //     // this.setState( prevState => { 
    //     //     return {
    //     //         campaign: {
    //     //             ...prevState.campaign,
    //     //             [field]: val
    //     //         }
    //     //     }
    //     // })
    // }

    render() {
      return (
        <View >  
          <Text>Add Campaign</Text>
          <TextInput
            placeholder="Campaign description" 
            value={this.state.description}
            maxLength={20}
            onChangeText={(text) => this.setState(prevState => {
                 return {
                    campaign: {
                        ...prevState.campaign,
                        description: text
                    }    
                 }
            })}
            
          />

          <TextInput
            placeholder="Target amount"
            keyboardType='numeric'
            value={this.state.targetAmount}
            maxLength={20}
            onChangeText={(text) => this.setState(prevState => {
                 return {
                    campaign: {
                        ...prevState.campaign,
                        targetAmount: text
                    }    
                 }
            })}
             
          />

          <TextInput
            placeholder="Minimum Contribution"
            keyboardType='numeric'
            value={this.state.minimum}
            maxLength={20}
            onChangeText={(text) => this.setState(prevState => {
                 return {
                    campaign: {
                        ...prevState.campaign,
                        minimum: text
                    }    
                 }
            })}
           
          />

          <Button title='Add Campaign Now!' onPress={this.onAddCampaign} />
          <Button title='Cancel' onPress={this.onCancel} />
        </View>
      );
    }

    onAddCampaign = async () => {
        // alert(this.state.campaign.description + "," + 
        //     this.state.campaign.targetAmount + "," +
        //     this.state.campaign.minimum
        // );
        try {
            const data = { 
                id: '0x5774566230B99845C2345329519C30AF',
                description: this.state.campaign.description,
                target: this.state.campaign.targetAmount,
                minimum: this.state.campaign.minimum,
                contributors: 0,
                amount: 0  
            }
    
            await this.props.action$addCampaign(data)
    
            Navigation.dismissModal(this.props.componentId);
            
        } catch (err) {
            console.log(err)
        }
       
    }


    onCancel = () => {
        Navigation.dismissModal(this.props.componentId);
    } 
} 

export default connect(null, { action$addCampaign }) (NewCampaign);
 