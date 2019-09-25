import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Rating from '../Rating';
import './PostItem.scss';

const PostItem = ({
  id,
  title,
  author,
  timestamp,
  category,
  commentCount,
  voteScore,
  currentUserName,
  onVoteUpPost,
  onVoteDownPost,
}) => (
  <div className="post-item">
    <Rating
      id={id}
      currentRating={voteScore}
      onVoteUp={onVoteUpPost}
      onVoteDown={onVoteDownPost}
    />
    <div className="post-content">
      <Link to={`/${category}/${id}`} className="post-title">
        {title}
      </Link>
      <div className="post-details">
        <span className="post-author">{`by ${author} `}</span>
        <span className="post-category">{`in ${category} `}</span>
        <span className="post-date">
          {moment(timestamp)
            .startOf('minute')
            .fromNow()}
        </span>
        {author === currentUserName && (
          <>
            <span className="post-details-separator">|</span>
            <span>
              <Link to={`/posts/edit/${id}`} className="edit-bt" type="button">
                edit
              </Link>
              <span className="post-details-separator">|</span>
              <Link
                to={`/posts/delete/${id}`}
                className="delete-bt"
                type="button"
              >
                delete
              </Link>
            </span>
          </>
        )}
        <span className="post-details-separator">|</span>
        <span className="post-comments">
          {commentCount === 1
            ? `${commentCount} comment`
            : `${commentCount} comments`}
        </span>
      </div>
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
  onVoteUpPost: PropTypes.func.isRequired,
  onVoteDownPost: PropTypes.func.isRequired,
};

PostItem.defaultProps = {
  currentUserName: null,
};

export default PostItem;
