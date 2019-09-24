import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
  getAllPosts as getAllPostsAction,
  getPostsByCategory as getPostsByCategoryAction,
  voteUpPost as voteUpPostAction,
  voteDownPost as voteDownPostAction,
} from '../../actions/posts';
import sortPostsAction from '../../actions/sort';
import PostItem from './PostItem';
import PostSort from './PostSort';
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

  onSortPostsBy = (sortType) => {
    const { sortPosts, sort } = this.props;

    if (sortType) {
      sortPosts(sortType, !sort.descending);
    } else {
      sortPosts(sortType, sort.descending);
    }
  };

  sortPosts = (posts) => {
    const { sort } = this.props;

    if (sort.by === 'date' && sort.descending) {
      return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    if (sort.by === 'date' && !sort.descending) {
      return posts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }

    if (sort.by === 'vote' && sort.descending) {
      return posts.sort((a, b) => b.voteScore - a.voteScore);
    }

    if (sort.by === 'vote' && !sort.descending) {
      return posts.sort((a, b) => a.voteScore - b.voteScore);
    }

    return posts;
  };

  onVoteUpPost = (id) => {
    const { voteUpPost } = this.props;
    voteUpPost(id);
  };

  onVoteDownPost = (id) => {
    const { voteDownPost } = this.props;
    voteDownPost(id);
  };

  renderPosts = () => {
    const { posts, currentUserName } = this.props;
    const postsToSort = [...posts];
    const sortedPosts = this.sortPosts(postsToSort);

    return (
      sortedPosts.length
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
        : 'No posts found'
    );
  };

  getSortIcon = (sortType) => {
    const { sort } = this.props;

    if (sortType === sort.by) {
      if (sort.descending) {
        return <FontAwesomeIcon icon={faChevronDown} className="sort-order-icon" />;
      }
      return <FontAwesomeIcon icon={faChevronUp} className="sort-order-icon" />;
    }

    return <span />;
  }

  render() {
    return (
      <div>
        <PostSort
          onSortPostsBy={this.onSortPostsBy}
          dateIcon={this.getSortIcon('date')}
          voteIcon={this.getSortIcon('vote')}
        />
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
  sortPosts: PropTypes.func.isRequired,
  sort: PropTypes.instanceOf(Object).isRequired,
};

PostList.defaultProps = {
  selectedCategory: null,
  currentUserName: null,
};

const mapStateToProps = (state, ownProps) => ({
  posts: Object.values(state.posts),
  selectedCategory: ownProps.match.params.category,
  currentUserName: state.auth.userName,
  sort: state.sort,
});

const mapDispatchToProps = {
  getAllPosts: getAllPostsAction,
  getPostsByCategory: getPostsByCategoryAction,
  voteUpPost: voteUpPostAction,
  voteDownPost: voteDownPostAction,
  sortPosts: sortPostsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);
