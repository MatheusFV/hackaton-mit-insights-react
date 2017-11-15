/* global window */
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { responsiveStoreEnhancer } from 'redux-responsive'
import reducers from './reducers';

// Firebase config
const config = {
  apiKey: 'AIzaSyCYQNFdHj2laP6oVOfSI1GTKCEz_XJEZD0',
  authDomain: 'baseproject-9b045.firebaseapp.com',
  databaseURL: 'https://baseproject-9b045.firebaseio.com',
  projectId: 'baseproject-9b045',
  storageBucket: 'baseproject-9b045.appspot.com',
  messagingSenderId: '891409840901',
}


const logger = createLogger({
  stateTransformer: state => state.toJS ? state.toJS() : state,
  predicate: (getState, action) => !/redux-form|router|responsive/.test(action.type),
});

export default (initialState = {}, history) => {
  const routerMiddleware = createRouterMiddleware(history)
  let middleware = applyMiddleware(
    thunk.withExtraArgument(getFirebase),
    routerMiddleware,
    logger,
  );

  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    middleware = compose(middleware, devToolsExtension());
  }

  const createStoreWithFirebase = compose(
    reactReduxFirebase(config),
  )(createStore)

  const store = createStoreWithFirebase(reducers, initialState, compose(
    responsiveStoreEnhancer,
    middleware,
  ))

  // ----
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
};
