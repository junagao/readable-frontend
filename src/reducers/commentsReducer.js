import _ from 'lodash';
import {
  GET_ALL_COMMENTS,
  GET_SINGLE_COMMENT,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case GET_SINGLE_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COMMENT:
      return { [action.payload.id]: action.payload };
    case DELETE_COMMENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
