const initialState = {
    requests: [],
    campaign: null
  }
  
  export default function (state = initialState, action) {
      switch (action.type) {
        case 'FETCH_REQUESTS':
          return { 
            ...state,        
            requests: action.requests 
          } 
        default:
          return state;
      }
  }