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
      match: { params: { commentId } },
    } = this.props;
    getSingleComment(commentId);
  }

  renderActions = () => {
    const {
      deleteComment,
      match: { params: { commentId } },
    } = this.props;
    return (
      <React.Fragment>
        <button
          onClick={() => deleteComment(commentId)}
          className="delete"
          type="button"
        >
          Delete
        </button>
        <button onClick={() => history.goBack()} className="cancel" type="button">
          Cancel
        </button>
      </React.Fragment>
    );
  };

  renderContent = () => {
    const { comment } = this.props;
    if (!comment) {
      return 'Are you sure you want to delete this comment?';
    }
    return `Are you sure you want to delete the comment with title: ${comment.title}`;
  };

  render() {
    return (
      <Modal
        title="Delete Comment"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

CommentDelete.propTypes = {
  getSingleComment: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  comment: PropTypes.instanceOf(Object),
  deleteComment: PropTypes.func.isRequired,
};

CommentDelete.defaultProps = {
  comment: null,
};

const mapStateToProps = (state, ownProps) => ({
  comment: state.comments[ownProps.match.params.postId],
});

const mapDispatchToProps = {
  getSingleComment: getSingleCommentAction,
  deleteComment: deleteCommentAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentDelete);
