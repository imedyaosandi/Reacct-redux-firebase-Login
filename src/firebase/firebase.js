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
  apiKey: "AIzaSyBej5lQpETMFzOcmLUIVCLI1H9c0uOA5Vc",
  authDomain: "lift-f4de9.firebaseapp.com",
  databaseURL: "https://lift-f4de9.firebaseio.com",
  projectId: "lift-f4de9",
  storageBucket: "lift-f4de9.appspot.com",
  messagingSenderId: "87308972639"
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
};
