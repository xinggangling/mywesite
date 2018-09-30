import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import config from '../../config';

export default function createStore(history, client) {
  // Sync dispatched route actions to the history
  // TODO. If we want to fully integrate with react-router-redux, i.e. support time travel
  // We might need to use routeAction from react-router-redux, for url push, currently
  // we use browserHistory directly
  // const reduxRouterMiddleware = syncHistory(history);
  const middleware = [createMiddleware(client)];
  let finalCreateStore;
  if (config.env === 'development' || config.env === 'unit') {
    const { persistState } = require('redux-devtools');
    const ReduxDevTools = require('../components/ReduxDevTools').default;
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : ReduxDevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(require('./modules/reducer').default);

  // reduxRouterMiddleware.listenForReplays(store);

  if ((config.env === 'development' || config.env === 'unit') && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer').default);
    });
  }
  client.setStore(store);
  return store;
}
