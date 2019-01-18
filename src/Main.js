import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';

import { action$fetchCampaigns } from './components/campaign/campaign.actions';
import { list } from './appStyles';

class Main extends PureComponent { 

  // this update the props.campaigns state  
  componentDidMount() {
    this.props.action$fetchCampaigns();
  }

  renderCampaigns() {
    const items = this.props.campaigns.map( (campaign,i) => {
        return (
          <Text key={i}>{campaign.id}</Text> 
        )  
    });

    return items;
  }
  render() {
    return (
      <View style={list.container}>  
        {this.renderCampaigns()} 
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaigns: state.campaign
  }
}
export default connect(mapStateToProps, { action$fetchCampaigns }) (Main);