import api from '../api';
import history from '../history';
import {
  GET_ALL_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_SINGLE_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_UP_POST,
  VOTE_DOWN_POST,
} from './types';

export const getAllPosts = () => async (dispatch) => {
  const response = await api.get('/posts');
  dispatch({
    type: GET_ALL_POSTS,
    payload: response.data,
  });
};

export const getPostsByCategory = (category) => async (dispatch) => {
  const response = await api.get(`/${category}/posts`);
  dispatch({
    type: GET_POSTS_BY_CATEGORY,
    payload: response.data,
  });
};

export const getSinglePost = (postId) => async (dispatch) => {
  const response = await api.post(`/posts/${postId}`);
  dispatch({
    type: GET_SINGLE_POST,
    payload: response.data,
  });
};

export const createPost = (formValues) => async (dispatch) => {
  const response = await api.post('/posts', formValues);
  dispatch({
    type: CREATE_POST,
    payload: response.data,
  });
  history.push('/');
};

export const editPost = (postId, formValues) => async (dispatch) => {
  const response = await api.put(`/posts/${postId}`, formValues);
  dispatch({
    type: EDIT_POST,
    payload: response.data,
  });
  history.push('/');
};

export const deletePost = (postId) => async (dispatch) => {
  await api.delete(`/posts/${postId}`);
  dispatch({
    type: DELETE_POST,
    payload: postId,
  });
  history.push('/');
};

export const voteUpPost = (postId) => async (dispatch) => {
  const response = await api.post(`/posts/${postId}`, { option: 'upVote' });
  dispatch({
    type: VOTE_UP_POST,
    payload: response.data,
  });
};

export const voteDownPost = (postId) => async (dispatch) => {
  const response = await api.post(`/posts/${postId}`, { option: 'downVote' });
  dispatch({
    type: VOTE_DOWN_POST,
    payload: response.data,
  });
};
