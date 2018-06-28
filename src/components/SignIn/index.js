/*TODO
After the google signin doest go to home page,both catch block and then is executed.The entry doesnt go to the firebase
Doesnt know how to get the password of the google signed in user
*/ 


import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
// import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import { GoogleButton } from 'react-google-button';
// import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
//import  GoogleAuthProvider  from '@firebase/auth-types';
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import './index.css';


const SignInPage = ({ history }) =>
  <div className="sig">
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    
    <SignUpLink />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
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

  
  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }


  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div>
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />

        <br/>
        <input
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          type="password"
          placeholder="Password"
        />

        <br/>

        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
      <GoogleButton onClick={this. authWithGoogle}> </GoogleButton>
      </div>
     
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
