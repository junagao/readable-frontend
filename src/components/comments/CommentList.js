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
  <>
    {commentCount > 0
      && comments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          body={comment.body}
          author={comment.author}
          timestamp={comment.timestamp}
          voteScore={comment.voteScore}
          currentUserName={currentUserName}
          onVoteUpComment={onVoteUpComment}
          onVoteDownComment={onVoteDownComment}
        />
      ))}
  </>
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
