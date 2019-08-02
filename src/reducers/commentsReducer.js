import _ from 'lodash';
import {
  GET_ALL_COMMENTS,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
