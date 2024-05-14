import {applyMiddleware, legacy_createStore} from 'redux';
import {thunk} from 'redux-thunk';
import reducers from './reducers';
// import {composeWithDevTools} from '@redux-devtools/extension';

const store = legacy_createStore(reducers, applyMiddleware(thunk));

export default store;
