import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Rating from '../Rating';
import './PostItem.scss';

const PostItem = ({
  id, title, author, timestamp, category, commentCount, voteScore, currentUserName,
}) => (
  <div className="post-item">
    <Rating currentRating={voteScore} />
    <div className="post-content">
      <Link to={`/posts/${category}/${id}`} className="post-title">{title}</Link>
      <p className="post-details">
        <span className="post-author">
          {`by ${author} `}
        </span>
        <span className="post-category">
          {`in ${category} `}
        </span>
        <span className="post-date">
          {moment(timestamp).startOf('minute').fromNow()}
        </span>
        <span className="post-details-separator">|</span>
        {author === currentUserName && (
          <span>
            <Link to={`/posts/edit/${id}`} className="edit-bt" type="button">edit</Link>
            <span className="post-details-separator">|</span>
            <button className="delete-bt" type="button">delete</button>
            <span className="post-details-separator">|</span>
          </span>
        )}
        <span className="post-comments">
          {commentCount === 1
            ? `${commentCount} comment`
            : `${commentCount} comments`}
        </span>
      </p>
    </div>
  </div>
);

PostItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  currentUserName: PropTypes.string,
};

PostItem.defaultProps = {
  currentUserName: null,
};

export default PostItem;
