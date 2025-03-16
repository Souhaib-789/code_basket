import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import Reducer from './Reducers';

const Store = createStore(Reducer, applyMiddleware(thunk));
// let persistor = persistStore(Store)
Store.subscribe(async () => {
  // console.log('STATE=>', store.getState());
});
export { Store };

