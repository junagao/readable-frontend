import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './CommentItem.scss';

const CommentItem = ({
  id,
  body,
  author,
  timestamp,
  currentUserName,
}) => (
  <React.Fragment>
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
  </React.Fragment>
);

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  currentUserName: PropTypes.string,
};

CommentItem.defaultProps = {
  currentUserName: null,
};

export default CommentItem;
