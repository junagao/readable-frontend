import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentList = ({
  comments,
  commentCount,
  currentUserName,
}) => (
  <div>
    {commentCount > 0 && comments.map(comment => (
      <div className="comment-content" key={comment.id}>
        <CommentItem
          {...comment}
          currentUserName={currentUserName}
        />
      </div>
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.instanceOf(Object).isRequired,
  commentCount: PropTypes.number.isRequired,
  currentUserName: PropTypes.string,
};

CommentList.defaultProps = {
  currentUserName: null,
};

export default CommentList;
