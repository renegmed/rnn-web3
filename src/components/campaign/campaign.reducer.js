
const initialState = {
  campaigns: [],
  selectedCampaign: null
}

export default function (state = initialState, action) {
    switch (action.type) {
      case 'FETCH_CAMPAIGNS':
        return {         
          ...state,
          campaigns: state.campaigns.concat(action.payload) 
      }
      case 'ADD_CAMPAIGN':
        return {         
            ...state,
            campaigns: state.campaigns.concat(action.payload) 
        }
      case 'ADD_CONTRIBUTION':
      
        const campaign = state.campaigns.find( c => c.id === action.payload.id);

        return { ...state, 
          campaigns: [ ...state.campaigns.filter(c => c !== campaign), { 
            ...campaign, 
            amount: campaign.amount + action.payload.amount,
            contributors: campaign.contributors + 1
          } ] };

        // let campaign = state.campaigns.find( campaign => { return campaign.id == action.payload.id})
        // campaign.amount = action.payload.amount + campaign.amount;
        // campaign.contributors = campaign.contributors + 1;
        // return {         
        //     ...state,
        //     campaigns: state.campaigns.find( campaign => { 
        //       return campaign.id == action.payload.id}) 
        // }  
      default:
        return state;
    }
}