import React, { PureComponent } from 'react' 
import Campaigns from '../../components/campaign/Campaigns'  
 
export default class CampaignList extends PureComponent {  
    static options(props) {
        return {
            topBar: {
                title: {
                    text: 'Open Campaigns'
                }
            }
        }
    }
    
    render() { 
        return ( 
           <Campaigns />  
        ) 
    }
} 
