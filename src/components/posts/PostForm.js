import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import './PostCreate.scss';

class PostForm extends React.Component {
  onSubmit = (formValues) => {
    const { onSubmit } = this.props;
    onSubmit(formValues);
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
      <div className="post">
        <form className="post-form" onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="title" type="input" component={this.renderInput} placeholder="Enter post title" />
          <Field name="body" type="textarea" component={this.renderInput} placeholder="Enter post content" />
          <Field name="category" type="select" component={this.renderInput} />
          <button className="submit-form-button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
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

export default reduxForm({
  form: 'postForm',
  validate,
})(PostForm);
