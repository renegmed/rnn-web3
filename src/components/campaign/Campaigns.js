import React, {PureComponent} from 'react';
import {View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { action$fetchCampaigns } from './campaign.actions';
import { list, layout } from '../../appStyles';
 

class Campaigns extends PureComponent {  
    componentDidMount() {
        this.props.action$fetchCampaigns();
    }
 
    alertItemName = (item) => {
        alert(item.description)
    }

    renderItem = (item) => {
        return (
            <Text style = {list.item}>
                {item.id}
            </Text>
        ) 
    }

    render() {
        return (
            <ScrollView style={list.container}> 
                {
                    this.props.campaigns.map((item, index) => (
                       <TouchableOpacity
                          key = {item.id}  
                          onPress = {() => this.alertItemName(item)}>
                          {this.renderItem(item)}
                       </TouchableOpacity>
                    ))
                }  
           </ScrollView>
        ) 
    }
}

function mapStateToProps(state) {
  return {
    campaigns: state.campaign
  }
}
export default connect(mapStateToProps, { action$fetchCampaigns }) (Campaigns);