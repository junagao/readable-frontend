import React from 'react';
import PropTypes from 'prop-types';

import './PostFilter.scss';

const Filter = ({ sortPostsBy }) => (
  <div className="posts-filter">
    <div className="sort">sort by:</div>
    <div>
      <button onClick={(e) => sortPostsBy(e.target.value)} value="date" type="button">
        date
      </button>
      <span className="post-details-separator">|</span>
      <button onClick={(e) => sortPostsBy(e.target.value)} value="vote" type="button">
        vote
      </button>
    </div>
  </div>
);

Filter.propTypes = {
  sortPostsBy: PropTypes.func.isRequired,
};

export default Filter;
