import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

//const INITIAL_STATE = {
// authUser: null,
//};
const initialState = window.__INITIAL_STATE__ // set initial state here
const store = configureStore(rootReducer,initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
