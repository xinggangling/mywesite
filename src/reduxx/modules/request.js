import { RQST_START, RQST_SUCCESS, RQST_FAILED, RQST_TOKEN } from 'constants/requestStatus';

const initialState = {
  requests: {},
  tokenOfLatestRespedRqst: null,
  test: 'perfect1'
};

export default function reducer(state = initialState, action = {}) {
  let newState = state;
  const result = /.*_([A-Z]*)/.exec(action.type);
  const rqstToken = action[RQST_TOKEN];
  if (result) {
    switch ('RQST_' + result[1]) {
      case RQST_SUCCESS:
        if (action.type === 'rsd/fail/MESSAGE_SUCCESS') {
          // Modal.error({
          //   title: action.resp.return_msg
          // })
          // 此处可添加全局提示
        } else if (action.resp.return_code === 'OK' &&　action.resp.return_msg) {
          // Modal.error({
          //   title: action.resp.return_msg
          // })
          // 此处可添加全局提示
        }
        newState = {
          tokenOfLatestRespedRqst: rqstToken,
          requests: {
            ...state.requests,
            [rqstToken]: {
              rqstToken: rqstToken,
              actionType: action.type,
              resp: action.resp || null,
              status: RQST_SUCCESS
            }
          }
        };
        break;
      case RQST_FAILED:
        newState = {
          tokenOfLatestRespedRqst: rqstToken,
          requests: {
            ...state.requests,
            [rqstToken]: {
              rqstToken: rqstToken,
              actionType: action.type,
              error: action.error || null,
              status: RQST_FAILED
            }
          }
        };
        break;
      case RQST_START:
        newState = {
          ...state,
          requests: {
            ...state.requests,
            [rqstToken]: {
              rqstToken: rqstToken,
              actionType: action.type,
              status: RQST_START
            }
          }
        };
        break;
      default:
        newState = state;
    }
  }
  return newState;
}
