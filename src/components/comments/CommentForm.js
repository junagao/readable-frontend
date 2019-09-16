import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import './CommentForm.scss';

class CommentForm extends React.Component {
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
        {type === 'textarea' && (<textarea placeholder={placeholder} {...input} />)}
        {this.renderError(meta)}
      </div>
    );
  }

  render() {
    const { handleSubmit, onCancelCreateComment } = this.props;
    return (
      <div className="new-comment">
        <p>New Comment</p>
        <form className="new-comment-form" onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="body" type="textarea" component={this.renderInput} placeholder="Enter comment" />
          <button className="submit-form-button" type="submit">Submit</button>
          <button type="button" onClick={onCancelCreateComment}>Cancel</button>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelCreateComment: PropTypes.func.isRequired,
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.body) {
    errors.body = 'You must enter a content';
  }
  return errors;
};

export default reduxForm({
  form: 'commentForm',
  validate,
})(CommentForm);
