import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Rating = ({ currentRating }) => (
  <div className="rating">
    <div className="upvote-bt">
      <FontAwesomeIcon icon={faChevronUp} className="vote-icon" />
    </div>
    <div className="rating-value">
      {currentRating}
    </div>
    <div className="downvote-bt">
      <FontAwesomeIcon icon={faChevronDown} className="vote-icon" />
    </div>
  </div>
);

Rating.propTypes = {
  currentRating: PropTypes.number.isRequired,
};

export default Rating;
