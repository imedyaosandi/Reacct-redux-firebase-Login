import { createStore } from 'redux';
import rootReducer from '../reducers';
import firebase from '../firebase'

const store = createStore(rootReducer);


export default store;