import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  getSinglePost as getSinglePostAction,
  voteUpPost as voteUpPostAction,
  voteDownPost as voteDownPostAction,
} from '../../actions/posts';
import {
  getAllComments as getAllCommentsAction,
  voteUpComment as voteUpCommentAction,
  voteDownComment as voteDownCommentAction,
} from '../../actions/comments';
import Rating from '../Rating';
import CommentList from '../comments/CommentList';
import CommentCreate from '../comments/CommentCreate';
import history from '../../history';

import './PostDetails.scss';

class PostDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCommentCreate: false };
  }

  componentDidMount() {
    const {
      getSinglePost,
      match: {
        params: { postId },
      },
      getAllComments,
    } = this.props;

    getSinglePost(postId);
    getAllComments(postId);
  }

  componentDidUpdate(prevProps) {
    const {
      comments,
      getSinglePost,
      match: {
        params: { postId },
      },
    } = this.props;

    if (prevProps.comments.length < comments.length) {
      getSinglePost(postId);
    }
  }

  onCreateComment = () => {
    this.setState({ showCommentCreate: true });
  };

  onCancelCreateComment = () => {
    this.setState({ showCommentCreate: false });
  };

  onVoteUpPost = (id) => {
    const { voteUpPost } = this.props;

    voteUpPost(id);
  };

  onVoteDownPost = (id) => {
    const { voteDownPost } = this.props;

    voteDownPost(id);
  };

  onVoteUpComment = (commentId) => {
    const { voteUpComment } = this.props;

    voteUpComment(commentId);
  };

  onVoteDownComment = (commentId) => {
    const { voteDownComment } = this.props;

    voteDownComment(commentId);
  };

  render() {
    const { showCommentCreate } = this.state;
    const { post, comments, currentUserName } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    const {
      id,
      title,
      body,
      author,
      timestamp,
      category,
      commentCount,
      voteScore,
      deleted,
    } = post;

    if (deleted) {
      history.push('/404');
    }

    return (
      <div className="post-details-item">
        <Rating
          id={id}
          currentRating={voteScore}
          onVoteUp={this.onVoteUpPost}
          onVoteDown={this.onVoteDownPost}
        />
        <div className="post-details-content">
          <h1 className="post-details-title">{title}</h1>
          <p>{body}</p>
          <div className="post-item-details">
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
                <Link
                  to={`/posts/edit/${id}`}
                  className="edit-bt"
                  type="button"
                >
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
              </>
            )}
            <span className="post-details-separator">|</span>
            <span className="post-comments">
              {commentCount === 1
                ? `${commentCount} comment`
                : `${commentCount} comments`}
            </span>
            <span className="post-details-separator">|</span>
            <button
              className="post-comment-reply-button"
              onClick={this.onCreateComment}
              type="button"
            >
              add comment
            </button>
          </div>
          <CommentList
            comments={comments}
            commentCount={commentCount}
            author={author}
            currentUserName={currentUserName}
            onVoteUpComment={this.onVoteUpComment}
            onVoteDownComment={this.onVoteDownComment}
          />
          {showCommentCreate ? (
            <CommentCreate
              parentId={id}
              category={category}
              onCancelCreateComment={this.onCancelCreateComment}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

PostDetails.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  post: PropTypes.instanceOf(Object),
  voteUpPost: PropTypes.func.isRequired,
  voteDownPost: PropTypes.func.isRequired,
  getAllComments: PropTypes.func.isRequired,
  voteUpComment: PropTypes.func.isRequired,
  voteDownComment: PropTypes.func.isRequired,
  comments: PropTypes.instanceOf(Object).isRequired,
  currentUserName: PropTypes.string,
};

PostDetails.defaultProps = {
  post: null,
  currentUserName: null,
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.match.params.postId],
  comments: Object.values(state.comments),
  currentUserName: state.auth.userName,
});

const mapDispatchToProps = {
  getSinglePost: getSinglePostAction,
  voteUpPost: voteUpPostAction,
  voteDownPost: voteDownPostAction,
  getAllComments: getAllCommentsAction,
  voteUpComment: voteUpCommentAction,
  voteDownComment: voteDownCommentAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetails);
