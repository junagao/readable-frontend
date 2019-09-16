import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { createComment as createCommentAction } from '../../actions/comments';
import CommentForm from './CommentForm';

class CommentCreate extends React.Component {
  state = {
    showCommentCreate: true,
  }

  onSubmit = (formValues) => {
    const { createComment, author, parentId } = this.props;
    const timestamp = Date.now();
    const id = uuid();
    createComment({
      ...formValues,
      author,
      timestamp,
      id,
      parentId,
    });
    this.setState({ showCommentCreate: false });
  };

  render() {
    const { showCommentCreate } = this.state;
    return (
      <div>
        {showCommentCreate ? (
          <React.Fragment>
            <h3>Create Comment</h3>
            <CommentForm onSubmit={this.onSubmit} />
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

CommentCreate.propTypes = {
  createComment: PropTypes.func.isRequired,
  author: PropTypes.string,
  parentId: PropTypes.string.isRequired,
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
