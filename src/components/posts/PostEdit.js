import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSinglePost as getSinglePostAction,
  editPost as editPostAction,
} from '../../actions/posts';
import PostForm from './PostForm';
import './PostEdit.scss';

class PostEdit extends React.Component {
  componentDidMount() {
    const {
      getSinglePost,
      match: {
        params: { postId },
      },
    } = this.props;

    getSinglePost(postId);
  }

  onSubmit = (formValues) => {
    const {
      editPost,
      match: {
        params: { postId },
      },
    } = this.props;
    const timestamp = Date.now();

    editPost(postId, { ...formValues, timestamp });
  };

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div className="post-edit">
        <h3>Edit a Post</h3>
        <PostForm
          initialValues={_.pick(post, 'title', 'body', 'category')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

PostEdit.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  editPost: PropTypes.func.isRequired,
  post: PropTypes.instanceOf(Object),
};

PostEdit.defaultProps = {
  post: null,
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.match.params.postId],
});

const mapDispatchToProps = {
  getSinglePost: getSinglePostAction,
  editPost: editPostAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostEdit);
