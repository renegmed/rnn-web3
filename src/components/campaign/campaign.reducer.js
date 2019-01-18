
export default function (state = [], action) {
    switch (action.type) {
      case 'FETCH_CAMPAIGNS':
        return action.payload;
      default:
        return state;
    }
}