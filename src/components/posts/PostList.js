import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllPosts as getAllPostsAction,
  getPostsByCategory as getPostsByCategoryAction,
  voteUpPost as voteUpPostAction,
  voteDownPost as voteDownPostAction,
  sortPostsBy as sortPostsByAction,
} from '../../actions/posts';
import PostItem from './PostItem';
import PostFilter from './PostFilter';
import './PostList.scss';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortPostsBy: 'date',
    };
  }

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

    if (
      prevProps.selectedCategory !== selectedCategory
      && selectedCategory !== null
    ) {
      getPostsByCategory(selectedCategory);
    } else if (
      prevProps.selectedCategory !== selectedCategory
      && selectedCategory === null
    ) {
      getAllPosts();
    }
  }

  sortPosts = (posts, sortPostsBy) => {
    if (sortPostsBy === 'date') {
      return posts.sort((a, b) => b.timestamp - a.timestamp);
    }

    if (sortPostsBy === 'vote') {
      return posts.sort((a, b) => a.voteScore - b.voteScore);
    }

    return posts;
  };

  sortPostsBy = (value) => {
    if (value === 'date') {
      this.setState({ sortPostsBy: 'date' });
    }
    if (value === 'vote') {
      this.setState({ sortPostsBy: 'vote' });
    }
  }

  renderPosts = () => {
    const { sortPostsBy } = this.state;
    const { posts, currentUserName } = this.props;
    const postsToSort = [...posts];
    const sortedPosts = this.sortPosts(postsToSort, sortPostsBy);

    return (
      <div>
        {sortedPosts.length
          ? sortedPosts.map((post) => (
            <div className="post" key={post.id}>
              <PostItem
                id={post.id}
                title={post.title}
                author={post.author}
                timestamp={post.timestamp}
                category={post.category}
                commentCount={post.commentCount}
                voteScore={post.voteScore}
                currentUserName={currentUserName}
                onVoteUpPost={this.onVoteUpPost}
                onVoteDownPost={this.onVoteDownPost}
              />
            </div>
          ))
          : 'No posts found'}
      </div>
    );
  };

  onVoteUpPost = (id) => {
    const { voteUpPost } = this.props;
    voteUpPost(id);
  };

  onVoteDownPost = (id) => {
    const { voteDownPost } = this.props;
    voteDownPost(id);
  };

  render() {
    return (
      <div>
        <PostFilter sortPostsBy={this.sortPostsBy} />
        <div className="posts-container">{this.renderPosts()}</div>
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
  sortPostsBy: sortPostsByAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);
