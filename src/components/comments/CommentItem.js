import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from '../Rating';

import './CommentItem.scss';

const CommentItem = ({
  id,
  body,
  author,
  timestamp,
  currentUserName,
  onVoteUpComment,
  onVoteDownComment,
  voteScore,
}) => (
  <div className="comment-item">
    <Rating
      id={id}
      currentRating={voteScore}
      onVoteUp={onVoteUpComment}
      onVoteDown={onVoteDownComment}
    />
    <div className="comment-content">
      <p>{body}</p>
      <p className="comment-details">
        <span className="comment-author">{`by ${author} `}</span>
        <span className="comment-date">
          {moment(timestamp)
            .startOf('minute')
            .fromNow()}
        </span>
        {author === currentUserName && (
        <React.Fragment>
          <span className="comment-details-separator">|</span>
          <span>
            <Link to={`/comments/edit/${id}`} className="edit-bt" type="button">
              edit
            </Link>
            <span className="comment-details-separator">|</span>
            <Link
              to={`/comments/delete/${id}`}
              className="delete-bt"
              type="button"
            >
              delete
            </Link>
          </span>
        </React.Fragment>
        )}
      </p>
    </div>
  </div>
);

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  currentUserName: PropTypes.string,
  onVoteUpComment: PropTypes.func.isRequired,
  onVoteDownComment: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired,
};

CommentItem.defaultProps = {
  currentUserName: null,
};

export default CommentItem;
