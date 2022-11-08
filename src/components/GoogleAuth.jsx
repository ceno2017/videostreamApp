import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '988461415801-41pn0296gh3ibn5pcjr24ouclc6ouksk.apps.googleusercontent.com',
        scope: 'email',
        plugin_name: 'reactVideoStreamApp',
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        // this.setState({isSignedIn: this.auth.isSignedIn.get()});
        this.onAuthChange(this.auth.isSignedIn.get());
        //we will sit and wait for this auth state to change sometime in
        //the future.
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    })
  }

  onAuthChange = (isSignedIn) => {
    //this.setState({isSignedIn: this.auth.isSignedIn.get()});
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }


  renderAuthButton() {
    if (this.props.isSignedIn == null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className='ui red google button' onClick={this.onSignOutClick}>
          <i className='google icon'></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button className='ui red google button' onClick={this.onSignInClick}>
          <i className='google icon'></i>
          Sign In With Google
        </button>
      );
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);