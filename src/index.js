import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.js';
import createStore from 'reduxx';
import config from '../config';
// import ReduxDevTools from 'components/ReduxDevTools';
import 'brace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/github';

let ApiClient;
if (config.env === 'unit') {
  ApiClient = require('../test/mock/AppMockClient').default;
} else {
  ApiClient = require('utils/ApiClient').default;
}

const client = new ApiClient();

// const render = () => {
//   const store = createStore(history, client);
//   // debugger;
//   ReactDOM.render(
//     <App/>,
//     document.getElementById('react-content'),
//   )
// }

const render = () => {
  const store = createStore(history, client);
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div className="app">
        <App/>
      </div>
    </Provider>,
    document.getElementById('react-content'),
  )
}

render();
//{config.env === 'development' ? <ReduxDevTools /> : null}
