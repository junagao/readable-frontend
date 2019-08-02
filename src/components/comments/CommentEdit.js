import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSingleComment as getSingleCommentAction,
  editComment as editCommentAction,
} from '../../actions/comments';
import CommentForm from './CommentForm';

class CommentEdit extends React.Component {
  componentDidMount() {
    const {
      getSingleComment,
      match: {
        params: { postId },
      },
    } = this.props;
    getSingleComment(postId);
  }

  onSubmit = (formValues) => {
    const {
      editComment,
      match: {
        params: { postId },
      },
    } = this.props;
    const timestamp = Date.now();

    editComment(postId, { ...formValues, timestamp });
  };

  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Post</h3>
        <CommentForm
          initialValues={_.pick(comment, 'body')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

CommentEdit.propTypes = {
  getSingleComment: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  editComment: PropTypes.func.isRequired,
  post: PropTypes.instanceOf(Object),
};

CommentEdit.defaultProps = {
  post: null,
};

const mapStateToProps = (state, ownProps) => ({
  comment: state.comments[ownProps.match.params.postId],
});

const mapDispatchToProps = {
  getSingleComment: getSingleCommentAction,
  editComment: editCommentAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentEdit);
