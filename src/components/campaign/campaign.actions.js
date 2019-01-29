const mockCampaigns = [
    {
        id: '0x56230B99845C2345329519C30AF40705',
        description: 'RMA Campaign Group',
        target: 80000000000,
        minimum: 1000000,
        contributors: 2,
        amount: 5000000 
    },
    {
        id: '0x49985Dd342094656230B99845C234532',
        description: 'Red Lion Funding',
        target: 75000000000,
        minimum: 1000000,
        contributors: 1,
        amount: 2000000 
    } 
  ];


export function action$fetchCampaigns() {
    return {
        type: 'FETCH_CAMPAIGNS',
        payload: mockCampaigns
    };
}  
export function action$selectCampaign(campaign) {   
    return {
        type: 'SELECT_CAMPAIGN',
        payload: campaign         
    };
}

export function action$selectedCampaign() {   
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
 
