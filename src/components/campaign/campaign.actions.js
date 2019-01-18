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

const mockRequests = [
    {
        id: '0x320AF40703106c1963F34523445w4345', 
        description: 'Desktop Mac',
        campaign: '0x56230B99845C2345329519C30AF40705',
        amount: 15000000000, 
        approved: false,
        finalized: false,
        recipient: ''
    },
    {
        id: '0x359984A5644F7320AF40703106c1963F',
        description: 'Computer Table',
        campaign: '0x56230B99845C2345329519C30AF40705',
        amount: 8000000, 
        approved: false,
        finalized: false,
        recipient: ''
    },
    {
        id: '0x45338B220C20AF40703106c1963F3455',
        description: 'One-Month Office Rent',
        campaign: '0x49985Dd342094656230B99845C234532',
        amount: 1200000000, 
        approved: false,
        finalized: false,
        recipient: ''
    },
  ];

export function action$fetchCampaigns() {
    return {
        type: 'FETCH_CAMPAIGNS',
        payload: mockCampaigns
    };
}  
export function action$fetchRequests() {
    return {
        type: 'FETCH_REQUESTS',
        payload: mockRequests
    };
}