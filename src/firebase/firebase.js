import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyD4y_aF2EYGcgTClHRK_xMn4D7WUaooV-A",
    authDomain: "my-first-project-505ea.firebaseapp.com",
    databaseURL: "https://my-first-project-505ea.firebaseio.com",
    projectId: "my-first-project-505ea",
    storageBucket: "my-first-project-505ea.appspot.com",
    messagingSenderId: "674997667617"
};

const devConfig = {
  apiKey: "AIzaSyD4y_aF2EYGcgTClHRK_xMn4D7WUaooV-A",
    authDomain: "my-first-project-505ea.firebaseapp.com",
    databaseURL: "https://my-first-project-505ea.firebaseio.com",
    projectId: "my-first-project-505ea",
    storageBucket: "my-first-project-505ea.appspot.com",
    messagingSenderId: "674997667617"
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
