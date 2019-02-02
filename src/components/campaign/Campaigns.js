import React, {PureComponent} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { action$fetchCampaigns, action$selectCampaign } from './campaign.actions';
import { list, field } from '../../appStyles';
 

class Campaigns extends PureComponent {  
   
    componentDidMount() { 
       //this.navigationEventListener = Navigation.events().bindComponent(this); // needed for navigationButtonPressed
       this.props.fetchCampaigns();
    }
   
    componentWillUnmount() { 
        if (this.navigationEventListener) {
          this.navigationEventListener.remove();
        } 
    }
    
    // navigationButtonPressed({ buttonId }) { 
    //     switch(buttonId) {
    //         case 'sideDrawerToggle':             
    //             Navigation.mergeOptions(this.props.componentId, {
    //                 sideMenu: {
    //                     left: {
    //                         visible: true
    //                     }
    //                 }
    //             });
    //             break;
    //         default:
    //             break;     
    //     } 
    // }

    onCampaign = (item) => {  
    
        this.props.selectCampaign(item);
        Navigation.showModal({
            stack: {
              children: [{
                component: {
                    name: 'campaign.Campaign',
                    passProps: {
                      campaign: item
                    }, 
                    options: {
                      topBar: {
                        title: {
                          text: 'Campaign Requests'
                        }
                      }
                    }
                } 
              }]
            }
        });
        
        
    }
  
    renderItem = (item) => { 
        return (
            <View style={styles.itemContainer}>
                <Text style = {field.label}>Address:</Text>
                <Text style = {field.item}>{item.id}</Text> 
                <Text style = {field.label}>Target amount:</Text>
                <Text style = {field.item}>{item.amount}</Text>
                <Text style = {field.label}>Minimum contribution:</Text>
                <Text style = {field.item}>{item.minimum}</Text>
                <Text style = {field.label}>No. of requests:</Text>
                <Text style = {field.item}>{item.requestsCount}</Text>
                <Text style = {field.label}>No. of current contributors:</Text>
                <Text style = {field.item}>{item.contributors}</Text>
                <Text style = {field.label}>Manager:</Text>
                <Text style = {field.item}>{item.manager}</Text> 
                <TouchableOpacity style={styles.button}>
                    <Button title='Contribute Now' onPress={ () => this.onContribute(item) } /> 
                </TouchableOpacity> 
            </View> 
        ) 
    }

    render() { 
        const { campaigns } = this.props; 
        return (
            <ScrollView style={list.container}> 
                {
                    campaigns.map((item, index) => (
                       <TouchableOpacity
                          key = {item.id}  
                          onPress = {() => this.onCampaign(item)}>
                           {this.renderItem(item)}
                       </TouchableOpacity>
                    ))
                }  
           </ScrollView>
        ) 
    }

    onContribute = (item) => { 
        this.props.selectCampaign(item); 
        Navigation.showModal({
            stack: {
              children: [{
                component: {
                    name: 'campaign.Contribute', 
                    options: {
                      topBar: {
                        title: {
                          text: 'Contribute To Campaign'
                        }
                      }
                    }
                } 
              }]
            }
        });
    }
}


const styles = StyleSheet.create({  
    itemContainer: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "95%",
        height: 410,
        marginTop: 6,
        marginBottom: 6
    },
    button: {
        width: "40%", 
        alignItems: "center",
        margin: 10
    } 
  })

const mapStateToProps = (state) => {
    return {
        campaigns: state.campaign.campaigns 
    }
}

const mapDistpatchToProps = dispatch => {
    return {
        fetchCampaigns: () => dispatch(action$fetchCampaigns()),
        selectCampaign: (item) => dispatch(action$selectCampaign(item))
    }
}

export default connect(mapStateToProps, mapDistpatchToProps ) (Campaigns);