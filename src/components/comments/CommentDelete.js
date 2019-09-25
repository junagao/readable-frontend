import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import {
  getSingleComment as getSingleCommentAction,
  deleteComment as deleteCommentAction,
} from '../../actions/comments';

class CommentDelete extends React.Component {
  componentDidMount() {
    const {
      getSingleComment,
      match: {
        params: { commentId },
      },
    } = this.props;

    getSingleComment(commentId);
  }

  renderActions = () => {
    const {
      deleteComment,
      match: {
        params: { commentId },
      },
    } = this.props;

    return (
      <>
        <button
          onClick={() => deleteComment(commentId)}
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
        content="Are you sure you want to delete this comment?"
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

CommentDelete.propTypes = {
  getSingleComment: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getSingleComment: getSingleCommentAction,
  deleteComment: deleteCommentAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(CommentDelete);
