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

  render() {
    return (
      <Modal
        content="Are you sure you want to delete this post?"
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

PostDelete.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getSinglePost: getSinglePostAction,
  deletePost: deletePostAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(PostDelete);
