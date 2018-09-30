const GET_PROFILE_START = '0xg/auth/GET_PROFILE_START';
const GET_PROFILE_SUCCESS = '0xg/auth/GET_PROFILE_SUCCESS';
const GET_PROFILE_FAILED = '0xg/auth/GET_PROFILE_FAILED';

const initialState = {
  jwt: null,
  user: null
};

/* Private method */
const _handleAuthentication = (jwt, user) => {
  localStorage.setItem('jwt', jwt);
  localStorage.setItem('user', JSON.stringify(user));
  return ({
    jwt: jwt,
    user: user
  });
};

const cleanup = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
};

/* Reducer */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        jwt: action.resp.result.jwt,
        user: action.resp.result.user
      }
    }
    default:
      return state;
  }
}

/* Actions */
export const getProfile = () => {
  return {
    types: [GET_PROFILE_START, GET_PROFILE_SUCCESS, GET_PROFILE_FAILED],
    promise: (client) => {
      return client.get('auth/profile');
    }
  };
};
