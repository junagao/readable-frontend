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
  voteScore,
  currentUserName,
  onVoteUpComment,
  onVoteDownComment,
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
      <div className="comment-details">
        <span className="comment-author">{`by ${author} `}</span>
        <span className="comment-date">
          {moment(timestamp)
            .startOf('minute')
            .fromNow()}
        </span>
        {author === currentUserName && (
          <>
            <span className="comment-details-separator">|</span>
            <Link
              to={`/comments/edit/${id}`}
              className="edit-bt"
              type="button"
            >
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
          </>
        )}
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string,
  timestamp: PropTypes.number.isRequired,
  currentUserName: PropTypes.string,
  onVoteUpComment: PropTypes.func.isRequired,
  onVoteDownComment: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired,
};

CommentItem.defaultProps = {
  author: null,
  currentUserName: null,
};

export default CommentItem;
