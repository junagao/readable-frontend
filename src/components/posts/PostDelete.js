import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import {
  getSinglePost as getSinglePostAction,
  deletePost as deletePostAction,
} from '../../actions/posts';
import './PostDelete.scss';

class PostDelete extends React.Component {
  componentDidMount() {
    const {
      getSinglePost,
      match: {
        params: { postId },
      },
    } = this.props;

    getSinglePost(postId);
  }

  renderActions = () => {
    const {
      deletePost,
      match: {
        params: { postId },
      },
    } = this.props;

    return (
      <>
        <button
          onClick={() => deletePost(postId)}
          className="submit-delete-button"
          type="button"
        >
          Delete
        </button>
        <button
          onClick={() => history.goBack()}
          className="cancel-delete-button"
          type="button"
        >
          Cancel
        </button>
      </>
    );
  };

  renderContent = () => {
    const { post } = this.props;

    if (!post) {
      return 'Are you sure you want to delete this post?';
    }

    return `Are you sure you want to delete the post with title: ${post.title}`;
  };

  render() {
    return (
      <Modal
        title="Delete Post"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

PostDelete.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  post: PropTypes.instanceOf(Object),
  deletePost: PropTypes.func.isRequired,
};

PostDelete.defaultProps = {
  post: null,
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.match.params.postId],
});

const mapDispatchToProps = {
  getSinglePost: getSinglePostAction,
  deletePost: deletePostAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDelete);
