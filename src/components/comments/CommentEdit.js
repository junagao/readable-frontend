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
        params: { commentId },
      },
    } = this.props;
    getSingleComment(commentId);
  }

  onSubmit = (formValues) => {
    const {
      editComment,
      match: {
        params: { commentId },
      },
    } = this.props;
    const timestamp = Date.now();

    editComment(commentId, { ...formValues, timestamp });
  };

  render() {
    const { comment } = this.props;
    if (!comment) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit Comment</h3>
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
  comment: PropTypes.instanceOf(Object),
};

CommentEdit.defaultProps = {
  comment: null,
};

const mapStateToProps = (state, ownProps) => ({
  comment: state.comments[ownProps.match.params.commentId],
});

const mapDispatchToProps = {
  getSingleComment: getSingleCommentAction,
  editComment: editCommentAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentEdit);
