import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import GoogleAuth from './GoogleAuth';
import PostCategoryList from './posts/PostCategoryList';

import './Header.scss';

const Header = ({ isSignedIn, userName }) => (
  <div className="menu-container">
    <div className="menu-left">
      <Link to="/" className="logo">
        Readable
      </Link>
      <PostCategoryList />
    </div>
    <div className="menu-right">
      {isSignedIn && (
        <span>
          <Link to="/posts/new" className="create-post">
            add new post
          </Link>
          <span className="separator">|</span>
          <span className="user-name">{userName}</span>
        </span>
      )}
      <GoogleAuth />
    </div>
  </div>
);

Header.propTypes = {
  isSignedIn: PropTypes.bool,
  userName: PropTypes.string,
};

Header.defaultProps = {
  isSignedIn: null,
  userName: null,
};

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(Header);
