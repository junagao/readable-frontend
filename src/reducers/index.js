import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import categoriesReducer from './categoriesReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';
import sortReducer from './sortReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  sort: sortReducer,
});
