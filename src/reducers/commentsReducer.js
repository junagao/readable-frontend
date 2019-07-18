import _ from 'lodash';
import {
  GET_ALL_COMMENTS_BY_POST_ID,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS_BY_POST_ID:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
