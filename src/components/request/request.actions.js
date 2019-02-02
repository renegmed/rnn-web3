import Web3 from 'web3';
import CampaignFactory from '../../contracts/CampaignFactory.json';
import Campaign from '../../contracts/Campaign.json';  
import {PROVIDER_URI, CONTRACT_ADDRESS } from 'react-native-dotenv';
 
const getWeb3 = () => {
    return new Web3(
        new Web3.providers.HttpProvider(PROVIDER_URI),
    )   
}

const getRequests = (requests) => {  
    return {
        type: 'FETCH_REQUESTS',
        campaignAddress: requests.campaignAddress,
        requests: requests.requests, 
        approversCount: requests.approversCount
    };
} 

const fetchFailed = errorType => ({
    type: 'FETCH_REQUESTS_FAILURE',
    isFetchFailed: false,
    errorType,
});

export const action$fetchRequests = (campaignAddress) => async dispatch => {  
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

    // get campaign given addresses
    let campaign;
    let requestCount;
    let approversCount;
    try {
        campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), campaignAddress);
    } catch (err) {
        console.error(err)
        return dispatch(fetchFailed('ACCESS_TO_CAMPAIGN_FAILED'));
    }
     
    try {
        approversCount = await campaign.methods.approversCount().call();
    } catch (err) {
        console.error(err)
        return dispatch(fetchFailed('ACCESS_TO_REQUEST_APPROVERS_COUNT_FAILED'));
    }
    
    console.log("Approvers count:", approversCount);
      
    try { 
        requestCount = await campaign.methods.getRequestsCount().call();
    } catch (err) {
        console.error(err)
        return dispatch(fetchFailed('ACCESS_TO_REQUEST_COUNT_FAILED'));
    }
   
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map(async (element, index) => { 
          return await campaign.methods.requests(index).call()
            .then( request => { 
                return {
                    description: request[0],
                    value: request[1],
                    recipient: request[2],
                    complete: request[3],
                    approvalCount: request[4], 
                }
            })
            .catch(err => {
                console.error(err)
                return dispatch(fetchFailed('ACCESS_TO_REQUESTS_FAILED'));
            })  
        })
    )
    .catch(err => {
        console.error(err)
        return dispatch(fetchFailed('REQUESTS_DATA_RESTRUCTURING_FAILED'));
    })
    dispatch(getRequests({
        address: campaignAddress,
        requests: requests === 'undefined' ? [] : requests, 
        approversCount: approversCount
    })) 
}
  
 

