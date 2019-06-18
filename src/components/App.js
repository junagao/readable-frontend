import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import PostList from './posts/PostList';
import PostDetails from './posts/PostDetails';
import PostCreate from './posts/PostCreate';
import PostEdit from './posts/PostEdit';
import PostDelete from './posts/PostDelete';
import PageNotFound from './PageNotFound';

import './App.scss';

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <Header />
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/posts/new" component={PostCreate} />
        <Route exact path="/posts/:category" component={PostList} />
        <Route exact path="/posts/:postId" component={PostDetails} />
        <Route exact path="/posts/edit/:postId" component={PostEdit} />
        <Route exact path="/posts/delete/:postId/" component={PostDelete} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
