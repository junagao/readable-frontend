import _ from 'lodash';
import {
  GET_ALL_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_SINGLE_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_UP_POST,
  VOTE_DOWN_POST,
  SORT_POSTS_BY,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return { ..._.mapKeys(action.payload, 'id') };
    case GET_POSTS_BY_CATEGORY:
      return { ..._.mapKeys(action.payload, 'id') };
    case GET_SINGLE_POST:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_POST:
      return { [action.payload.id]: action.payload };
    case EDIT_POST:
      return { [action.payload.id]: action.payload };
    case DELETE_POST:
      return _.omit(state, action.payload);
    case VOTE_UP_POST:
      return { ...state, [action.payload.id]: action.payload };
    case VOTE_DOWN_POST:
      return { ...state, [action.payload.id]: action.payload };
    case SORT_POSTS_BY:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
