/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import AppRouter from './routers/AppRouter';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import 'react-dates/lib/css/_datepicker.css';

// Import root app
import App from 'containers/App';

import './firebase/firebase';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles
import 'styles/theme.scss';

import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'

import { Provider } from 'react-redux'

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

const MOUNT_NODE = document.getElementById('app');
// Create redux store with history
// const store = configureStore(initialState, history);

const initialState = {};
const store = configureStore();
// store.subscribe( () => {
//   const state = store.getState();
//   console.log(getVisibleExpenses(state.expenses, state.filters));
// });


// store.dispatch(addExpense({description: "Gas bill", createdAt: 100, amount: 2500}));
// store.dispatch(addExpense({description: "Water bill", createdAt: 200, amount: 7500}));
// store.dispatch(addExpense({description: "Rent", amount: 10000}));
// store.dispatch(setTextFilter(''));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const render = () => {
  ReactDOM.render(jsx, document.getElementById('app'));
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
