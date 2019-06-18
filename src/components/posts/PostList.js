import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts as getAllPostsAction, getPostsByCategory as getPostsByCategoryAction } from '../../actions/posts';
import PostItem from './PostItem';

class PostList extends React.Component {
  componentDidMount() {
    const { getAllPosts, getPostsByCategory, category } = this.props;
    if (category) {
      getPostsByCategory(category);
    } else {
      getAllPosts();
    }
  }

  componentDidUpdate(prevProps) {
    const { getAllPosts, getPostsByCategory, category } = this.props;
    if (prevProps.category !== category && category !== null) {
      getPostsByCategory(category);
    } else if (prevProps.category !== category && category === null) {
      getAllPosts();
    }
  }

  renderPosts = () => {
    const { posts } = this.props;

    return (
      <div>
        {posts.length
          ? (
            posts.map(post => (
              <div className="post" key={post.id}>
                <PostItem {...post} />
              </div>
            ))
          )
          : 'No posts found'
        }
      </div>
    );
  }

  render() {
    return (
      <div className="posts-container">
        {this.renderPosts()}
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.instanceOf(Object).isRequired,
  category: PropTypes.string,
  getAllPosts: PropTypes.func.isRequired,
  getPostsByCategory: PropTypes.func.isRequired,
};

PostList.defaultProps = {
  category: null,
};

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  getAllPosts: getAllPostsAction,
  getPostsByCategory: getPostsByCategoryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
