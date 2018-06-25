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

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      
      //var user = firebase.auth().currentUser;
      //var name, email, photoUrl, uid, emailVerified;

      console.log(user.displayName);
      console.log(user.email);
      //console.log(user.password);
      this.setState(updateByPropertyName('username', user.displayName ));
      this.setState(updateByPropertyName('email', user.email));
      //this.setState(updateByPropertyName('password', user.password));
        

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      console.log("hsbhbcqvcv");
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      
    });

    const {
      history,
    } = this.props; 

    const {
      username,
      email,
      password,
    } = this.state;

    
    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error',error));
      });

   /* auth.doSignInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });
      */

    event.preventDefault();

  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

     history.push(routes.HOME);

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
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        <GoogleButton onClick={this.authWithGoogle}  >
        </GoogleButton>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
