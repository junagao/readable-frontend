import api from '../api';
import { GET_ALL_CATEGORIES } from './types';

export const getAllCategories = () => async (dispatch) => {
  const response = await api.get('/categories');
  dispatch({
    type: GET_ALL_CATEGORIES,
    payload: response.data.categories,
  });
};

export default getAllCategories;
