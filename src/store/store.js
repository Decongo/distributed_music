import { createStore } from 'redux'
import rootReducer from './reducer.js'

// remove this: load state from contract instead
const initialState = {
  tracks: []
};

const store = createStore(
  rootReducer, 
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;