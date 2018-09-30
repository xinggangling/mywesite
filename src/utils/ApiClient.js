import superagent from 'superagent';
import { getAPIHostPrefix } from 'utils/commonUtils';
import config from '../../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export const formatUrl = (path) => {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return getAPIHostPrefix() + adjustedPath;
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path) + '?lang=' + (localStorage.getItem('languageType') ? localStorage.getItem('languageType') : 'zhCN'));
        if (this.store) {
          const state = this.store.getState();
          // console.log('jwt:', state.auth && state.auth.jwt ? 'JWT ' + state.auth.jwt : null);
          request.set('Authorization', state.auth && state.auth.jwt ? 'JWT ' + state.auth.jwt : null);
          request.withCredentials();
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
            if (body && body.return_code && body.return_code === 'OK') {
              resolve(body);
            } else if (body && body.return_code && body.return_code !== 'OK' && body.return_msg) {
              resolve(body);
            } else {
              resolve(body);
            }
          }
        });
      }));
  }

  setStore(store) {
    this.store = store; // Keep a reference to store, from where to get the jwt token
  }
}
