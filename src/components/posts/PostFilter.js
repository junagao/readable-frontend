import React from 'react';

import './PostFilter.scss';

const Filter = () => (
  <div className="posts-filter">
    <div className="sort">sort by:</div>
    <div>
      <button value="date" type="button">date</button>
      <span className="post-details-separator">|</span>
      <button value="vote" type="button">vote</button>
    </div>
  </div>
);

export default Filter;
