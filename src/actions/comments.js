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

export const getAllComments = (postId) => async (dispatch) => {
  const response = await api.get(`/posts/${postId}/comments`);
  dispatch({
    type: GET_ALL_COMMENTS,
    payload: response.data,
  });
};

export const getSingleComment = (commentId) => async (dispatch) => {
  const response = await api.get(`/comments/${commentId}`);
  dispatch({
    type: GET_SINGLE_COMMENT,
    payload: response.data,
  });
};

export const createComment = (formValues) => async (dispatch) => {
  const response = await api.post('/comments/', formValues);
  dispatch({
    type: CREATE_COMMENT,
    payload: response.data,
  });
};

export const editComment = (commentId, formValues) => async (dispatch) => {
  const response = await api.put(`/comments/${commentId}`, formValues);
  dispatch({
    type: EDIT_COMMENT,
    payload: response.data,
  });
  history.goBack();
};

export const deleteComment = (commentId) => async (dispatch) => {
  await api.delete(`/comments/${commentId}`);
  dispatch({
    type: DELETE_COMMENT,
    payload: commentId,
  });
  history.goBack();
};

export const voteUpComment = (commentId) => async (dispatch) => {
  const response = await api.post(`/comments/${commentId}`, { option: 'upVote' });
  dispatch({
    type: VOTE_UP_COMMENT,
    payload: response.data,
  });
};

export const voteDownComment = (commentId) => async (dispatch) => {
  const response = await api.post(`/comments/${commentId}`, { option: 'downVote' });
  dispatch({
    type: VOTE_DOWN_COMMENT,
    payload: response.data,
  });
};
