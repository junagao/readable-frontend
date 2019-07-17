import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { createPost as createPostAction } from '../../actions/posts';
import PostForm from './PostForm';
import './PostCreate.scss';

class PostCreate extends React.Component {
  onSubmit = (formValues) => {
    const { createPost, author } = this.props;
    const timestamp = Date.now();
    const id = uuid();
    createPost({
      ...formValues, author, timestamp, id,
    });
  }

  render() {
    return (
      <div>
        <h3>Create Post</h3>
        <PostForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

PostCreate.propTypes = {
  createPost: PropTypes.func.isRequired,
  author: PropTypes.string,
};

PostCreate.defaultProps = {
  author: null,
};

const mapStateToProps = state => ({
  author: state.auth.userName,
});

const mapDispatchToProps = {
  createPost: createPostAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
