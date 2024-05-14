import {combineReducers} from 'redux';
import remoteTodosReducer from './remoteTodos';

const rootReducer = combineReducers({
  remoteTodos: remoteTodosReducer,
});

export default rootReducer;
