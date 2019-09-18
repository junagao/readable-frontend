import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentList = ({
  comments,
  commentCount,
  currentUserName,
  onVoteUpComment,
  onVoteDownComment,
}) => (
  <React.Fragment>
    {commentCount > 0 && comments.map(comment => (
      <CommentItem
        {...comment}
        key={comment.id}
        currentUserName={currentUserName}
        onVoteUpComment={onVoteUpComment}
        onVoteDownComment={onVoteDownComment}
      />
    ))}
  </React.Fragment>
);

CommentList.propTypes = {
  comments: PropTypes.instanceOf(Object).isRequired,
  commentCount: PropTypes.number.isRequired,
  currentUserName: PropTypes.string,
  onVoteUpComment: PropTypes.func.isRequired,
  onVoteDownComment: PropTypes.func.isRequired,
};

CommentList.defaultProps = {
  currentUserName: null,
};

export default CommentList;
