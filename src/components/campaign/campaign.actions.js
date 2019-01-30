import Web3 from 'web3';
import CampaignFactory from '../../contracts/CampaignFactory.json';
import Campaign from '../../contracts/Campaign.json';  
import {PROVIDER_URI, CONTRACT_ADDRESS } from 'react-native-dotenv';

const getWeb3 = () => {
    return new Web3(
        new Web3.providers.HttpProvider(PROVIDER_URI),
    )   
}

const getCampaigns = (campaigns) => { 
    return {
        type: 'FETCH_CAMPAIGNS',
        payload: campaigns
    };
} 

const fetchFailed = errorType => ({
    type: 'FETCH_FAILURE',
    isFetchFailed: false,
    errorType,
});

export const action$fetchCampaigns = () => async dispatch =>{
    let web3;

    // initialize web3
    try {
        web3 = await getWeb3();

    } catch (e) {
        console.error(e);
        return dispatch(fetchFailed('INITIATE_WEB3'));
    }

    // get instance of contract CampaignFactory

    let instance; 

    const parsedCampaignFactory = await JSON.parse(CampaignFactory.interface); 

    if (typeof parsedCampaignFactory !== 'undefined') { 
            instance = await new web3.eth.Contract(
            parsedCampaignFactory,
            CONTRACT_ADDRESS     
        );
    } else {
        console.log('Instance of CampaigFactory could not be created.');
        return dispatch(fetchFailed('CONTRACT_INSTANCE_FAILED'));
    }

    // get campaign addresses
    let campaignAddresses;

    try {
        campaignAddresses = await instance.methods.getDeployedCampaigns().call();
    } catch (err) {
        console.error(e)
        return dispatch(fetchFailed('ACCESS_TO_CAMPAIGNS_FAILED'));
    } 

    let campaigns = [];  

    await campaignAddresses.map(async address => { 

        let campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), address);
        
        if (typeof campaign !== 'undefined') {
            
            let summary = await campaign.methods.getSummary().call(); 
            await campaigns.push({
                id: address,
                minimum: summary[0],
                amount: summary[1],
                requestsCount: summary[2],
                contributors: summary[3],
                manager: summary[4]
            }); 
        } 
    }); 
    console.log("--- campaign.actions fetchCampaigns ----");
    console.log(campaigns)
    campaigns.map( c => {
        console.log(c.id)
    })
 
    dispatch(getCampaigns(campaigns)) 
   
}  
 
export const action$selectCampaign = (campaign) => {   
    return {
        type: 'SELECT_CAMPAIGN',
        payload: campaign         
    };
}

export const action$selectedCampaign = () => {   
    return {
        type: 'SELECTED_CAMPAIGN' 
    };
}

export function action$addCampaign(data) {
    return {
        type: 'ADD_CAMPAIGN',
        payload: data
    };
}
export function action$addContribution(id, amount) {   
    return {
        type: 'ADD_CONTRIBUTION',
        payload: { id, amount  }
    };
} 
 
