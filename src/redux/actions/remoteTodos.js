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

export const fetchTodos = (searchParams, reset = false) => {
  const {page, limit, title} = searchParams;
  console.log('title123: ', title);
  let url = `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}&title_like=${encodeURIComponent(
    title,
  )}`;

  return async dispatch => {
    dispatch({type: FETCH_TODOS_STARTED, reset});

    try {
      const {data} = await axios.get(url);
      console.log('dataRES: ', data);
      dispatch({type: FETCH_TODOS_SUCCEEDED, todos: data});
    } catch (err) {
      dispatch({type: FETCH_TODOS_FAILED, error: err.message});
    }
  };
};
