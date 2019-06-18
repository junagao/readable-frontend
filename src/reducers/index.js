import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoriesReducer from './categoriesReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  posts: postsReducer,
});
