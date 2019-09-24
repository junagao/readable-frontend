import React from 'react';
import PropTypes from 'prop-types';

import './PostSort.scss';

const PostSort = ({ onSortPostsBy, dateIcon, voteIcon }) => (
  <div className="posts-sort">
    <div className="sort-by">sort by:</div>
    <div className="sort-type">
      <button
        onClick={(e) => onSortPostsBy(e.target.value)}
        value="date"
        type="button"
      >
        date
        {dateIcon}
      </button>
      <span className="post-details-separator">|</span>
      <button
        onClick={(e) => onSortPostsBy(e.target.value)}
        value="vote"
        type="button"
      >
        vote
        {voteIcon}
      </button>
    </div>
  </div>
);

PostSort.propTypes = {
  onSortPostsBy: PropTypes.func.isRequired,
  dateIcon: PropTypes.instanceOf(Object).isRequired,
  voteIcon: PropTypes.instanceOf(Object).isRequired,
};

export default PostSort;
