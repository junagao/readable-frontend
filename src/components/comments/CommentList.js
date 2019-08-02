import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const CommentList = ({ comments, commentCount }) => (
  <div>
    {commentCount > 0 && comments.map(comment => (
      <div className="comment-content" key={comment.id}>
        <p>{comment.body}</p>
        <p className="comment-details">
          <span className="comment-author">{`by ${comment.author} `}</span>
          <span className="comment-date">
            {moment(comment.timestamp)
              .startOf('minute')
              .fromNow()}
          </span>
        </p>
      </div>
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.instanceOf(Object).isRequired,
  commentCount: PropTypes.number.isRequired,
};

export default CommentList;
