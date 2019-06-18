import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

import './Header.scss';

const Header = () => (
  <div className="menu-container">
    <div className="menu-left">
      <Link to="/" className="logo">Readable</Link>
    </div>
    <div className="menu-right">
      <Link to="/posts/new" className="create-post">add new post</Link>
      <span className="separator">|</span>
      <GoogleAuth />
    </div>
  </div>
);

export default Header;
