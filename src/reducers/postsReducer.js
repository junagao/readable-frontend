import {
  GET_ALL_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_SINGLE_POST,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload;
    case GET_POSTS_BY_CATEGORY:
      return action.payload;
    case GET_SINGLE_POST:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
