import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getAllCategoriesAction from '../../actions/categories';

import './PostCategoryList.scss';

class CategoryList extends React.Component {
  componentDidMount() {
    const { getAllCategories } = this.props;

    getAllCategories();
  }

  renderCategories = () => {
    const { categories } = this.props;

    return categories.map((category, index) => (categories.length === index + 1 ? (
      <div className="category-item" key={category.name}>
        <Link to={`/posts/${category.name}`} className="category-name">
          {category.name}
        </Link>
      </div>
    ) : (
      <div className="category-item" key={category.name}>
        <Link to={`/posts/${category.name}`} className="category-name">
          {category.name}
        </Link>
        <span className="category-separator">|</span>
      </div>
    )));
  };

  render() {
    return (
      <div className="category-list">
        <Link to="/" className="category-name">
          all
        </Link>
        <span className="category-separator">|</span>
        {this.renderCategories()}
      </div>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  getAllCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const mapDispatchToProps = {
  getAllCategories: getAllCategoriesAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryList);
