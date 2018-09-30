import superagent from 'superagent';
import superagentMock from 'superagent-mock';

superagentMock(superagent, require('./superagent-mock-config.js'));

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return 'mock://' + 'api' + adjustedPath;
}

export default class ApiMockClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        if (this.store) {
          const state = this.store.getState();
          request.set('Authorization', state.auth && state.auth.jwt ? 'JWT ' + state.auth.jwt : null);
        }

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }
        request.end((err, { body } = {}) => {
          if (err) {
            reject(body || err);
          } else {
            setTimeout(() => {
              resolve(body);
            }, 500);
          }
        });
      }));
  }
  setStore(store) {
    this.store = store; // Keep a reference to store, from where to get the jwt token
  }
}
