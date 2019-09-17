import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Rating.scss';

const Rating = ({
  id,
  currentRating,
  onVoteUp,
  onVoteDown,
}) => (
  <div className="rating">
    <div className="upvote-bt">
      <FontAwesomeIcon onClick={() => onVoteUp(id)} icon={faChevronUp} className="vote-icon" />
    </div>
    <div className="rating-value">
      {currentRating}
    </div>
    <div className="downvote-bt">
      <FontAwesomeIcon onClick={() => onVoteDown(id)} icon={faChevronDown} className="vote-icon" />
    </div>
  </div>
);

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  currentRating: PropTypes.number,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
};

Rating.defaultProps = {
  currentRating: null,
};

export default Rating;
