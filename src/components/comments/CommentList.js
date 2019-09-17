import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CommentList = ({
  comments,
  commentCount,
  author,
  currentUserName,
}) => (
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
          {author === currentUserName && (
          <React.Fragment>
            <span className="comment-details-separator">|</span>
            <span>
              <Link to={`/comments/edit/${comment.id}`} className="edit-bt" type="button">
                edit
              </Link>
              <span className="comment-details-separator">|</span>
              <Link
                to={`/comments/delete/${comment.id}`}
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
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.instanceOf(Object).isRequired,
  commentCount: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  currentUserName: PropTypes.string,
};

CommentList.defaultProps = {
  currentUserName: null,
};

export default CommentList;
