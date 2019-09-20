import { SORT_POSTS } from '../actions/types';

export default (state = { by: 'date', descending: true }, action) => {
  switch (action.type) {
    case SORT_POSTS:
      return {
        ...state,
        by: action.payload.by,
        descending: action.payload.descending,
      };
    default:
      return state;
  }
};
