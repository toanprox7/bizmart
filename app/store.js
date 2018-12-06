import RootReducer from './reducers/index';
// var redux = require('redux');
import {createStore, compose, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
// var store = redux.createStore(AppList);
// var store = redux.createStore(RootReducer,
//     window.devToolsExtension? window.devToolsExtension(): f => f
//   );
  export default function configureStore(initialState) {
    return createStore(RootReducer, initialState,
      compose(
        applyMiddleware(thunk),
      window.devToolsExtension? window.devToolsExtension(): f => f
    )
    );
  }
