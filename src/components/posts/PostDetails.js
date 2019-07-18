import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getSinglePost as getSinglePostAction } from '../../actions/posts';
import { getAllCommentsByPostId as getAllCommentsByPostIdAction } from '../../actions/comments';
import Rating from '../Rating';

import './PostDetails.scss';

class PostDetails extends React.Component {
  componentDidMount() {
    const {
      getSinglePost,
      match: {
        params: { postId },
      },
      getAllCommentsByPostId,
    } = this.props;
    getSinglePost(postId);
    getAllCommentsByPostId(postId);
  }

  render() {
    const { post, comments } = this.props;
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
      currentUserName,
      voteUpPost,
      voteDownPost,
    } = post;
    console.log('author', author);
    console.log('currentUserName', currentUserName);
    return (
      <div className="post-item">
        <Rating
          id={id}
          currentRating={voteScore}
          voteUpPost={voteUpPost}
          voteDownPost={voteDownPost}
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
                  <span className="post-details-separator">|</span>
                </span>
              </React.Fragment>
            )}
          </p>
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
      </div>
    );
  }
}

PostDetails.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  post: PropTypes.instanceOf(Object),
  getAllCommentsByPostId: PropTypes.func.isRequired,
  comments: PropTypes.instanceOf(Object).isRequired,
};

PostDetails.defaultProps = {
  post: null,
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.match.params.postId],
  comments: Object.values(state.comments),
  currentUserName: state.auth.userName,
});

const mapDispatchToProps = {
  getSinglePost: getSinglePostAction,
  getAllCommentsByPostId: getAllCommentsByPostIdAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetails);
