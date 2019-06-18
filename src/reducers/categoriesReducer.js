import { GET_ALL_CATEGORIES } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.payload.sort();
    default:
      return state;
  }
};
