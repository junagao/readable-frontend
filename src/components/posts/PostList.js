import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllPosts as getAllPostsAction,
  getPostsByCategory as getPostsByCategoryAction,
  voteUpPost as voteUpPostAction,
  voteDownPost as voteDownPostAction,
} from '../../actions/posts';
import PostItem from './PostItem';
import PostFilter from './PostFilter';
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
    const {
      posts,
      currentUserName,
    } = this.props;

    return (
      <div>
        {posts.length
          ? (
            posts.map(post => (
              <div className="post" key={post.id}>
                <PostItem
                  {...post}
                  currentUserName={currentUserName}
                  onVoteUpPost={this.onVoteUpPost}
                  onVoteDownPost={this.onVoteDownPost}
                />
              </div>
            ))
          )
          : 'No posts found'
        }
      </div>
    );
  }

  onVoteUpPost = (id) => {
    const { voteUpPost } = this.props;
    voteUpPost(id);
  }

  onVoteDownPost = (id) => {
    const { voteDownPost } = this.props;
    voteDownPost(id);
  }

  render() {
    return (
      <div>
        <PostFilter />
        <div className="posts-container">
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.instanceOf(Object).isRequired,
  selectedCategory: PropTypes.string,
  getAllPosts: PropTypes.func.isRequired,
  getPostsByCategory: PropTypes.func.isRequired,
  currentUserName: PropTypes.string,
  voteUpPost: PropTypes.func.isRequired,
  voteDownPost: PropTypes.func.isRequired,
};

PostList.defaultProps = {
  selectedCategory: null,
  currentUserName: null,
};

const mapStateToProps = (state, ownProps) => ({
  posts: Object.values(state.posts),
  selectedCategory: ownProps.match.params.category,
  currentUserName: state.auth.userName,
});

const mapDispatchToProps = {
  getAllPosts: getAllPostsAction,
  getPostsByCategory: getPostsByCategoryAction,
  voteUpPost: voteUpPostAction,
  voteDownPost: voteDownPostAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
