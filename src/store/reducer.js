export default function RootReducer(state = {}, action) {
  switch (action.type) {
    case 'tracks/trackAdded': {
      return {
        ...state,
        tracks: [...state.tracks, action.track]
      }
    }
    case 'load/web3Loaded': {
      return {
        ...state,
        web3Connection: action.web3Connection
      }
    }
    case 'load/dimuLoaded': {
      return {
        ...state,
        dimuContract: action.dimuContract
      }
    }
    case 'load/accountLoaded': {
      return {
        ...state,
        accountAddress: action.accountAddress
      }
    }
    default: 
      return state;
  }
}