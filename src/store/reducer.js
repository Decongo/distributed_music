export default function RootReducer(state = {}, action) {
  switch (action.type) {
    case 'tracks/trackAdded': {
      return {
        ...state,
        tracks: [...state.tracks, action.track]
      }
    }
    default: 
      return state;
  }
}