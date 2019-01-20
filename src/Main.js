import React, {PureComponent} from 'react';  
import CampaignsScreen from './screens/campaign/Campaigns' 
import { Navigation } from 'react-native-navigation';

export default class Main extends PureComponent { 
  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'addCampaign',
            text: 'Add'
          }
        ]
      }
    };
  }
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); 
    this.showAddCampaignModal = this.showAddCampaignModal.bind(this);
  }
  
  navigationButtonPressed({buttonId}) {
    if (buttonId === 'addCampaign') {
      this.showAddCampaignModal();
    }
  }
  showAddCampaignModal() {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'campaign.addCampaign',
          }
        }]
      }
    });
  }
  render() {
    return (
      <CampaignsScreen />   
    );
  }
}
 