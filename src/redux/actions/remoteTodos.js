import axios from 'axios';

import {
  FETCH_TODOS_STARTED,
  FETCH_TODOS_SUCCEEDED,
  FETCH_TODOS_FAILED,
} from '../action_types';

export const fetchTodosStarted = () => ({
  type: FETCH_TODOS_STARTED,
});

export const fetchTodosSucceeded = todos => ({
  type: FETCH_TODOS_SUCCEEDED,
  todos,
});

export const fetchTodosFailed = error => ({
  type: FETCH_TODOS_FAILED,
  error,
});

export const fetchTodos = searchParams => {
  const {page, limit} = searchParams;
  const url = `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`;

  return async dispatch => {
    dispatch(fetchTodosStarted());

    try {
      const res = await axios.get(url);
      dispatch(fetchTodosSucceeded(res.data));
    } catch (err) {
      dispatch(fetchTodosFailed(err.message));
    }
  };
};
