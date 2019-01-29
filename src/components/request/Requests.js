import React, {PureComponent} from 'react';
import {View, ScrollView, Text, Button, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { action$fetchRequests} from './request.actions';
import {  action$addContribution  } from '../campaign/campaign.actions';
import {  field } from '../../appStyles';
 

class Requests extends PureComponent {  
    
    componentDidMount() {  
        const { selectedCampaign } = this.props;        
        this.props.action$fetchRequests(selectedCampaign.id)
    }  
 
    onUpdateRequest = (item) => { 
        alert("Update Request: " + item.description) 
    }
     
    renderItem = (item) => {        
        return (
            <ScrollView style={styles.itemContainer}>
                <Text style = {field.label}>Address:</Text>
                <Text style = {field.item}>{item.id}</Text>
                <Text style = {field.label}>Description:</Text>
                <Text style = {field.item}>{item.description}</Text>
                <Text style = {field.label}>Amount requested:</Text>
                <Text style = {field.item}>{item.amount}</Text>
                <Text style = {field.label}>Recipient:</Text>
                <Text style = {field.item}>{item.recipient}</Text>
                <Text style = {field.label}>Approved:</Text>
                <Text style = {field.item}>{item.approved}</Text>
                <Text style = {field.label}>Finalized:</Text>
                <Text style = {field.item}>{item.finalized}</Text>
               
                <TouchableHighlight style={styles.button}>
                    <Button title='Approve' onPress={ () => alert('Approve Request by Owner') } /> 
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}>
                    <Button title='Finalize' onPress={ () => alert('Finalize Request by Owner') } /> 
                </TouchableHighlight>
            </ScrollView>
            
        ) 
    }

    render() {  
        return (
            <View> 
                {
                    this.props.requests.map((item, index) => (
                       <TouchableHighlight
                          key = {item.id}  
                          >
                          {this.renderItem(item)}
                       </TouchableHighlight>
                    ))
                }  
           </View>
        ) 
    }
  
}

const styles = StyleSheet.create({  
    itemContainer: {
        borderWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#eee",
        width: "100%",
        height: 450,
        marginTop: 6,
        marginBottom: 6
    },
    button: {
        width: "40%",
        alignItems: "center",
        margin: 10
    } 
  })

function mapStateToProps(state) {
    return {
        selectedCampaign: state.campaign.selectedCampaign ,
        requests: state.request.requests
    }
}

 export default connect(mapStateToProps, { action$fetchRequests, action$addContribution }) (Requests);