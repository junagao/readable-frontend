import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts as getAllPostsAction, getPostsByCategory as getPostsByCategoryAction } from '../../actions/posts';
import PostItem from './PostItem';
import './PostList.scss';

class PostList extends React.Component {
  componentDidMount() {
    const { getAllPosts, getPostsByCategory, selectedCategory } = this.props;
    if (selectedCategory) {
      getPostsByCategory(selectedCategory);
    } else {
      getAllPosts();
    }
  }

  componentDidUpdate(prevProps) {
    const { getAllPosts, getPostsByCategory, selectedCategory } = this.props;
    if (prevProps.selectedCategory !== selectedCategory && selectedCategory !== null) {
      getPostsByCategory(selectedCategory);
    } else if (prevProps.selectedCategory !== selectedCategory && selectedCategory === null) {
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
  selectedCategory: PropTypes.string,
  getAllPosts: PropTypes.func.isRequired,
  getPostsByCategory: PropTypes.func.isRequired,
};

PostList.defaultProps = {
  selectedCategory: null,
};

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  selectedCategory: ownProps.match.params.category,
});

const mapDispatchToProps = {
  getAllPosts: getAllPostsAction,
  getPostsByCategory: getPostsByCategoryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
