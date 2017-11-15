/* global document */
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory'
import configureStore from '@actions/store.js';
import Root from '@globalComponents/Root'
import './styles/styles.css';
import './styles/reactCrop.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = createHistory()
const store = configureStore({}, history)
const rootElement = document.getElementById('root');

/**
 * Raiz do React que é renderizado no DOM
 * Aqui incluimos o AppContainer, que serve apenas colocar o HMR em funcionamento
 * Renderizamos o RootComponent
 */
 // AppContainer -> Para funcionar o HOT RELOAD
function render(RootClass) {
  ReactDOM.render(
    <AppContainer>
      <RootClass
        history={history}
        store={store}
      />
    </AppContainer>,
    rootElement,
  );
}

// Para funcionar o HOT RELOAD
if (module.hot) {
  module.hot.accept('./globalComponents/Root', () => {
    render(require('./globalComponents/Root').default);
  });
}

render(Root)
