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
        requests: requests
    };
} 

const fetchFailed = errorType => ({
    type: 'FETCH_REQUESTS_FAILURE',
    isFetchFailed: false,
    errorType,
});

export const action$fetchRequests = (campaignAddress) => async dispatch => { 

    console.log('---- request.actions.js action$fetchRequests -----');
    console.log(campaignAddress);

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
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
 
    dispatch(getRequests({
        address: campaignAddress,
        requests: requests,
        requestCount: requestCount,
        approversCount: approversCount
    }))
}

// const mockRequests = () => {  
//     let requests = new Map(); 
//     requests.set('0x56230B99845C2345329519C30AF40705', [
//         {
//             id: '0x320AF40703106c1963F34523445w4345', 
//             description: 'Desktop Mac',
//             campaign: '0x56230B99845C2345329519C30AF40705',
//             amount: 15000000000, 
//             approved: false,
//             finalized: false,
//             recipient: '0x887556230B99845C2345329519C30AF'
//         },
//         {
//             id: '0x359984A5644F7320AF40703106c1963F',
//             description: 'Computer Table',
//             campaign: '0x56230B99845C2345329519C30AF40705',
//             amount: 8000000, 
//             approved: false,
//             finalized: false,
//             recipient:'0x83A457556230B99845C2345329519408'
//         }
//      ])

//     requests.set('0x49985Dd342094656230B99845C234532', [
//         {
//             id: '0x45338B220C20AF40703106c1963F3455',
//             description: 'One-Month Office Rent',
//             campaign: '0x49985Dd342094656230B99845C234532',
//             amount: 1200000000, 
//             approved: false,
//             finalized: false,
//             recipient:'0x3221B556230B99845C23453295C9967D'
//         }
//     ])  

//     return requests;
// } 
 

