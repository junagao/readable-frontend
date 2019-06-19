import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  signIn as signInAction,
  signOut as signOutAction,
} from '../actions/auth';

import './GoogleAuth.scss';

class GoogleAuth extends React.Component {
  componentWillMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          client_id:
            '66257946110-me8vnbp60q6t19ocakphmo3lnc5866ef.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    const { signIn, signOut } = this.props;
    if (isSignedIn) {
      signIn(this.auth.currentUser.get().getId(),
        this.auth.currentUser.get().getBasicProfile().getGivenName());
    } else {
      signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;
    if (isSignedIn === null) {
      return null;
    }
    if (isSignedIn) {
      return (
        <button
          onClick={this.onSignOutClick}
          className="google-button"
          type="button"
        >
          <i className="google-icon" />
          (sign out)
        </button>
      );
    }
    return (
      <button
        onClick={this.onSignInClick}
        className="google-button"
        type="button"
      >
        <i className="google-icon" />
        (sign in with google)
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

GoogleAuth.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
};

GoogleAuth.defaultProps = {
  isSignedIn: null,
};

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(
  mapStateToProps,
  { signIn: signInAction, signOut: signOutAction },
)(GoogleAuth);
