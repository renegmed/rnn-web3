const initialState = {
    requests: [],
    campaign: null,
    failed: false,
    errorType: "",
  }
  
  export default function (state = initialState, action) {
      switch (action.type) {
        case 'FETCH_REQUESTS':
          return { 
            ...state,        
            requests: action.requests 
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