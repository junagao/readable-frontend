import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Rating.scss';

const Rating = ({
  id, currentRating, onVoteUpPost, onVoteDownPost,
}) => (
  <div className="rating">
    <div className="upvote-bt">
      <FontAwesomeIcon onClick={() => onVoteUpPost(id)} icon={faChevronUp} className="vote-icon" />
    </div>
    <div className="rating-value">
      {currentRating}
    </div>
    <div className="downvote-bt">
      <FontAwesomeIcon onClick={() => onVoteDownPost(id)} icon={faChevronDown} className="vote-icon" />
    </div>
  </div>
);

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  currentRating: PropTypes.number.isRequired,
  onVoteUpPost: PropTypes.func.isRequired,
  onVoteDownPost: PropTypes.func.isRequired,
};

export default Rating;
