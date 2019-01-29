const mockRequests = () => {  
    let requests = new Map(); 
    requests.set('0x56230B99845C2345329519C30AF40705', [
        {
            id: '0x320AF40703106c1963F34523445w4345', 
            description: 'Desktop Mac',
            campaign: '0x56230B99845C2345329519C30AF40705',
            amount: 15000000000, 
            approved: false,
            finalized: false,
            recipient: '0x887556230B99845C2345329519C30AF'
        },
        {
            id: '0x359984A5644F7320AF40703106c1963F',
            description: 'Computer Table',
            campaign: '0x56230B99845C2345329519C30AF40705',
            amount: 8000000, 
            approved: false,
            finalized: false,
            recipient:'0x83A457556230B99845C2345329519408'
        }
     ])

    requests.set('0x49985Dd342094656230B99845C234532', [
        {
            id: '0x45338B220C20AF40703106c1963F3455',
            description: 'One-Month Office Rent',
            campaign: '0x49985Dd342094656230B99845C234532',
            amount: 1200000000, 
            approved: false,
            finalized: false,
            recipient:'0x3221B556230B99845C23453295C9967D'
        }
    ])  

    return requests;
} 
 
export function action$fetchRequests(campaignId) { 
    const requests = mockRequests() 
    return {
        type: 'FETCH_REQUESTS', 
        requests: requests.get(campaignId)
    };
}


