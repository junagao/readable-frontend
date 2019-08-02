import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { createComment as createCommentAction } from '../../actions/comments';
import CommentForm from './CommentForm';

class CommentCreate extends React.Component {
  onSubmit = (formValues) => {
    const { createComment, author } = this.props;
    const timestamp = Date.now();
    const id = uuid();
    createComment({
      ...formValues,
      author,
      timestamp,
      id,
    });
  };

  render() {
    return (
      <div>
        <h3>Create Comment</h3>
        <CommentForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

CommentCreate.propTypes = {
  createComment: PropTypes.func.isRequired,
  author: PropTypes.string,
};

CommentCreate.defaultProps = {
  author: null,
};

const mapStateToProps = state => ({
  author: state.auth.userName,
});

const mapDispatchToProps = {
  createComment: createCommentAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentCreate);
