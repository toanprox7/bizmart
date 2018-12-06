import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import {Provider} from 'react-redux';
import configureStore from './store';
import * as ratingsAction from './actions/ratingsAction';
import * as categorysAction from './actions/categorysAction';

const store = configureStore();
store.dispatch(ratingsAction.fetchRatings());
store.dispatch(categorysAction.fetchCategorys());

ReactDOM.render(
<Provider store={store}>
   <Router />
</Provider>,
 document.getElementById('layout'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
