/*TODO
After the google signup doest go to home page,both catch block and then is executed.The entry doesnt go to the firebase
Doesnt know how to get the password of the google signed up user
*/

import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';
import firebase from 'firebase';
import { GoogleButton } from 'react-google-button';
import './index.css'

const SignUpPage = ({ history }) =>
  <div className="abb" >
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    console.log("On Submit")

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        const user = authUser.user;
        console.log("Got user", user)
        return db.doCreateUser(user.uid, { name: username, email: user.email })
      })
      .then(this.afterLogin)
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });
    event.preventDefault();
  }

  authWithGoogle = (event) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.doAuthWithGoogle(provider);
    firebase.auth().signInWithPopup(provider)
      .then(authUser => {
        const user = authUser.user;
        console.log("Got user", user)
        return db.doCreateUser(user.uid, { name: user.displayName, email: user.email })
      })
      .then(this.afterLogin)
      .catch(console.log);
  }

  afterLogin = (authUser) => {
    this.setState(() => ({ ...INITIAL_STATE }));
    this.props.history.push(routes.HOME);
  }


  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
            type="text"
            placeholder="Full Name"
          />
          <br />
          <input
            value={email}
            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <br />
          <input
            value={passwordOne}
            onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <br />
          <input
            value={passwordTwo}
            onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <br />
          <button disabled={isInvalid} type="submit">
            Sign Up
        </button>

          {error && <p>{error.message}</p>}
        </form>

        <GoogleButton onClick={this.authWithGoogle} >
        </GoogleButton>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};