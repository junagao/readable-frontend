import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { createComment as createCommentAction } from '../../actions/comments';
import CommentForm from './CommentForm';

class CommentCreate extends React.Component {
  onSubmit = (formValues) => {
    const {
      createComment,
      author,
      parentId,
      onCancelCreateComment,
    } = this.props;
    const timestamp = Date.now();
    const id = uuid();

    createComment({
      ...formValues,
      author,
      timestamp,
      id,
      parentId,
    });
    onCancelCreateComment();
  };

  render() {
    const { onCancelCreateComment } = this.props;

    return (
      <div>
        <h3>Create Comment</h3>
        <CommentForm
          onSubmit={this.onSubmit}
          onCancelCreateComment={onCancelCreateComment}
        />
      </div>
    );
  }
}

CommentCreate.propTypes = {
  createComment: PropTypes.func.isRequired,
  author: PropTypes.string,
  parentId: PropTypes.string.isRequired,
  onCancelCreateComment: PropTypes.func.isRequired,
};

CommentCreate.defaultProps = {
  author: null,
};

const mapStateToProps = (state) => ({
  author: state.auth.userName,
});

const mapDispatchToProps = {
  createComment: createCommentAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentCreate);
