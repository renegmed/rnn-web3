const initialState = {
    campaignAddress: '',
    requests: [],
    approversCount: 0, 
    failed: false,
    errorType: "",
  }
  
  export default function (state = initialState, action) {
      switch (action.type) {
        case 'FETCH_REQUESTS':
          return {  
              requests: action.requests,
              campaignAddress: action.campaignAddress,
              approversCount: action.approversCount 
          } 
        case 'FETCH_REQUESTS_FAILURE':
          return {
            ...state,
            failed: action.isFetchFailed,
            errorType: action.errorType
          }  
        default:
          return state;
      }
  }