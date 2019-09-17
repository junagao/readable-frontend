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
import { getAllComments as getAllCommentsAction } from '../../actions/comments';
import Rating from '../Rating';
import CommentList from '../comments/CommentList';
import CommentCreate from '../comments/CommentCreate';

import './PostDetails.scss';

class PostDetails extends React.Component {
  state = {
    showCommentCreate: false,
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

  onCreateComment = () => {
    this.setState({ showCommentCreate: true });
  };

  onCancelCreateComment = () => {
    this.setState({ showCommentCreate: false });
  }

  onVoteUpPost = (id) => {
    const { voteUpPost } = this.props;
    voteUpPost(id);
  }

  onVoteDownPost = (id) => {
    const { voteDownPost } = this.props;
    voteDownPost(id);
  }

  render() {
    const { showCommentCreate } = this.state;
    const {
      post,
      comments,
      currentUserName,
    } = this.props;

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
    } = post;

    return (
      <div className="post-item">
        <Rating
          id={id}
          currentRating={voteScore}
          onVoteUpPost={this.onVoteUpPost}
          onVoteDownPost={this.onVoteDownPost}
        />
        <div className="post-content">
          <h1 className="post-title">{title}</h1>
          <p>{body}</p>
          <p className="post-details">
            <span className="post-author">{`by ${author} `}</span>
            <span className="post-category">{`in ${category} `}</span>
            <span className="post-date">
              {moment(timestamp)
                .startOf('minute')
                .fromNow()}
            </span>
            {author === currentUserName && (
              <React.Fragment>
                <span className="post-details-separator">|</span>
                <span>
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
                </span>
              </React.Fragment>
            )}
            <span className="post-details-separator">|</span>
            <span className="post-comments">
              {commentCount === 1
                ? `${commentCount} comment`
                : `${commentCount} comments`}
            </span>
            <span className="post-details-separator">|</span>
            <span className="post-comment-reply">
              <button onClick={this.onCreateComment} type="button">add comment</button>
            </span>
          </p>
          <CommentList
            comments={comments}
            commentCount={commentCount}
            author={author}
            currentUserName={currentUserName}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetails);
