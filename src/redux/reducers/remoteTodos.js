import {
  FETCH_TODOS_STARTED,
  FETCH_TODOS_SUCCEEDED,
  FETCH_TODOS_FAILED,
} from '../action_types';

const initialState = {
  status: 'uninitialized',
  todos: [],
  error: null,
};

export default function remoteTodosReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS_STARTED: {
      return {
        ...state,
        status: 'loading',
      };
    }
    case FETCH_TODOS_SUCCEEDED: {
      return {
        ...state,
        status: 'succeeded',
        todos: [...state.todos, ...action.todos], // Append new todos
      };
    }
    case FETCH_TODOS_FAILED: {
      return {
        ...state,
        status: 'failed',
        todos: [],
        error: action.error,
      };
    }
    default:
      return state;
  }
}
