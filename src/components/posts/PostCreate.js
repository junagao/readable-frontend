import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { createPost as createPostAction } from '../../actions/posts';

import './PostCreate.scss';

class PostCreate extends React.Component {
  onSubmit = (formValues) => {
    const { createPost, author, history: { push } } = this.props;
    const timestamp = Date.now();
    const id = uuid();
    createPost({
      ...formValues, author, timestamp, id,
    }).then(
      push('/'),
    );
  }

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="error-message">
          <div className="header">{error}</div>
        </div>
      );
    }
    return null;
  }

  renderInput = ({
    input, type, placeholder, meta,
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        {type === 'input' && (<input placeholder={placeholder} {...input} />)}
        {type === 'textarea' && (<textarea placeholder={placeholder} {...input} />)}
        {type === 'select' && (
          <select {...input}>
            <option value="" disabled>Select category</option>
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </select>
        )}
        {this.renderError(meta)}
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="new-post">
        <p>New Post</p>
        <form className="new-post-form" onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="title" type="input" component={this.renderInput} placeholder="Enter post title" />
          <Field name="body" type="textarea" component={this.renderInput} placeholder="Enter post content" />
          <Field name="category" type="select" component={this.renderInput} />
          <button className="submit-form-button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

PostCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  author: PropTypes.string,
  history: PropTypes.instanceOf(Object).isRequired,
};

PostCreate.defaultProps = {
  author: null,
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.body) {
    errors.body = 'You must enter a content';
  }
  if (!formValues.category) {
    errors.category = 'You must enter a category';
  }
  return errors;
};

const formWrapped = reduxForm({
  form: 'postCreate',
  validate,
})(PostCreate);

const mapStateToProps = state => ({
  author: state.auth.userName,
});

export default connect(mapStateToProps, { createPost: createPostAction })(formWrapped);
