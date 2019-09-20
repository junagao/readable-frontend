import { SORT_POSTS } from './types';

const sortPosts = (by, descending) => ({
  type: SORT_POSTS,
  payload: {
    by,
    descending,
  },
});

export default sortPosts;
