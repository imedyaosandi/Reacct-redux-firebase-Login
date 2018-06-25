import rootReducer from '../reducers';
import * as firebase from 'firebase'
//import firebase from '../firebase'
import { compose, createStore } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'

//createStore(rootReducer);

export default function configureStore (initialState, history) {

  //firebase.initializeApp(fbConfig)

  const createStoreWithMiddleware = compose(
    reactReduxFirebase(firebase,
      {
        userProfile: 'agents/users',
        enableLogging: false
      }
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f)(createStore)
  const store = createStoreWithMiddleware(rootReducer)

  return store
}
//export default store;