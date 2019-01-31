import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet } from 'react-native'; 
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
 
import { field } from '../../appStyles';
import Requests from '../request/Requests'

class Campaign extends Component {  

  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'addRequest',
            text: 'Add Request'
          }
        ] 
      }
    };
  }
  
  componentWillUnmount() {
    Navigation.dismissModal(this.props.componentId);
  }
  
  render() { 
    const  campaign  = this.props.selectedCampaign;        
    return (      
      <ScrollView >  
        <View style={styles.itemContainer} >
          <Text style = {field.label}>Address:</Text>
          <Text style = {field.item}>{campaign.id}</Text> 
          <Text style = {field.label}>Target amount:</Text>
          <Text style = {field.item}>{campaign.amount}</Text>
          <Text style = {field.label}>Minimum contribution:</Text>
          <Text style = {field.item}>{campaign.minimum}</Text>
          <Text style = {field.label}>No. of requests:</Text>
          <Text style = {field.item}>{campaign.requestsCount}</Text>
          <Text style = {field.label}>No. of current contributors:</Text>
          <Text style = {field.item}>{campaign.contributors}</Text>
          <Text style = {field.label}>Manager:</Text>
          <Text style = {field.item}>{campaign.manager}</Text> 
        </View>
       
        <Requests />  
        
      </ScrollView>
    );
  } 
  
  onAddRequest = () => { 
      //alert("add request")
    
  }
 
}

const styles = StyleSheet.create({  
  itemContainer: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "100%",
      height: 320,
      marginTop: 6,
      marginBottom: 6
  },
  button: {
      margin: 8, 
  } 
})
 

function mapStateToProps(state) {
  return {
      selectedCampaign: state.campaign.selectedCampaign 
  }
}
export default connect(mapStateToProps ) (Campaign)