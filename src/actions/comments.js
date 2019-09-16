import api from '../api';
import history from '../history';
import {
  GET_ALL_COMMENTS,
  GET_SINGLE_COMMENT,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_UP_COMMENT,
  VOTE_DOWN_COMMENT,
} from './types';

export const getAllComments = postId => async (dispatch) => {
  const response = await api.get(`/posts/${postId}/comments`);
  dispatch({
    type: GET_ALL_COMMENTS,
    payload: response.data,
  });
};

export const getSingleComment = commentId => async (dispatch) => {
  const response = await api.get(`/comments/${commentId}`);
  dispatch({
    type: GET_SINGLE_COMMENT,
    payload: response.data,
  });
};

export const createComment = formValues => async (dispatch) => {
  const response = await api.post('/comments/', formValues);
  dispatch({
    type: CREATE_COMMENT,
    payload: response.data,
  });
};

export const editComment = (formValues, commentId) => async (dispatch) => {
  const response = await api.put(`/comments/${commentId}`, formValues);
  dispatch({
    type: EDIT_COMMENT,
    payload: response.data,
  });
  history.push('/');
};

export const deleteComment = commentId => async (dispatch) => {
  await api.delete(`/comments/${commentId}`);
  dispatch({
    type: DELETE_COMMENT,
    payload: commentId,
  });
  history.push('/');
};

export const voteUpComment = id => async (dispatch) => {
  const response = await api.post(`/comments/${id}`, { option: 'upVote' });
  dispatch({
    type: VOTE_UP_COMMENT,
    payload: response.data,
  });
};

export const voteDownComment = id => async (dispatch) => {
  const response = await api.post(`/comments/${id}`, { option: 'downVote' });
  dispatch({
    type: VOTE_DOWN_COMMENT,
    payload: response.data,
  });
};
