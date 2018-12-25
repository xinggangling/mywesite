const GET_NOTE_LIST_START = '0xg/daily/GET_NOTE_LIST_START';
const GET_NOTE_LIST_SUCCESS = '0xg/daily/GET_NOTE_LIST_SUCCESS';
const GET_NOTE_LIST_FAILED = '0xg/daily/GET_NOTE_LIST_FAILED';

const initialState = {
  list: []
};

/* Reducer */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_NOTE_LIST_SUCCESS: {
      return {
        ...state,
        list: action.resp.result
      }
    }
    default:
      return state;
  }
}

/* Actions */
export const getNoteList = () => {
  return {
    types: [GET_NOTE_LIST_START, GET_NOTE_LIST_SUCCESS, GET_NOTE_LIST_FAILED],
    promise: (client) => {
      return client.get('daily/list');
    }
  };
};
