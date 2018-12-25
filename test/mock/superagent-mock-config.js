import respLoader from './respLoader';
const PRE_FIX = 'mock://api';

module.exports = [
  {
    /**
     * regular expression of URL
     */
    method: 'GET',
    pattern: `${PRE_FIX}/status`,

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send'
     * @param method http method

     */
    fixtures: () => {
      return respLoader('status');
    }

    /**
     * returns the result of the request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    // Below is the default implmentation if no callback provided
    // callback: function(match, data) {
    //   return {
    //     body: data
    //   };
    // }
  },
  {
    method: 'GET',
    pattern: `${PRE_FIX}/dictionary/field$`,
    fixtures: () => {
      return respLoader('dictionary');
    }
  },
  {
    method: 'POST',
    pattern: `${PRE_FIX}/login$`,
    fixtures: () => {
      return respLoader('login_post');
    }
  },
  {
    method: 'GET',
    pattern: `${PRE_FIX}/auth/profile$`,
    fixtures: () => {
      return respLoader('login_post');
    },
    callback: function (match, data) {
      return {
        body: {result: data}
      };
    }
  },
  {
    method: 'GET',
    pattern: `${PRE_FIX}/daily/list$`,
    fixtures: () => {
      return respLoader('noteList');
    },
    callback: function (match, data) {
      return {
        body: {result: data, return_code: 'success'}
      };
    }
  },
  {
    method: 'GET',
    pattern: `${PRE_FIX}/(\\w*)/\\w*$`,
    fixtures: (match) => {
      console.log('superagent-mock-config-get-single', match, `${match[1]}`);
      return respLoader(`${match[1]}`);
    }
  },
  {
    method: 'PUT',
    pattern: `${PRE_FIX}/(\\w*)/\\w*$`,
    fixtures: (match) => {
      console.log('superagent-mock-config-update-single', match, `${match[1]}`);
      return respLoader(`${match[1]}_put`);
    }
  },
  {
    method: 'GET',
    pattern: `${PRE_FIX}/(\\w*)$`,
    fixtures: (match) => {
      console.log('superagent-mock-config-get-list', match, `${match[1]}`);
      return respLoader(`${match[1]}s`);
    }
  },
  {
    method: 'POST',
    pattern: `${PRE_FIX}/(\\w*)$`,
    fixtures: (match) => {
      console.log('superagent-mock-config-post', match, `${match[1]}`);
      return respLoader(`${match[1]}_post.js`);
    }
  }
];
