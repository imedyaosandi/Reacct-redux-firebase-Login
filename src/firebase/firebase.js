import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyAsS7PJKhDnU0nekpftRg_E6_NC6j1Odu0",
    authDomain: "react-firebase-demo-fcdf5.firebaseapp.com",
    databaseURL: "https://react-firebase-demo-fcdf5.firebaseio.com",
    projectId: "react-firebase-demo-fcdf5",
    storageBucket: "react-firebase-demo-fcdf5.appspot.com",
    messagingSenderId: "421556921926",
};

const devConfig = {
  apiKey: "AIzaSyAsS7PJKhDnU0nekpftRg_E6_NC6j1Odu0",
    authDomain: "react-firebase-demo-fcdf5.firebaseapp.com",
    databaseURL: "https://react-firebase-demo-fcdf5.firebaseio.com",
    projectId: "react-firebase-demo-fcdf5",
    storageBucket: "react-firebase-demo-fcdf5.appspot.com",
    messagingSenderId: "421556921926",
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();



export {
  db,
  auth,
  firebase,
};
