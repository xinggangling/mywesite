import { combineReducers } from 'redux';
import nSys from './notification';
import request from './request';
import auth from './auth';
import dailyMiniNote from './dailyMiniNote';

const appReducer = combineReducers({
  auth,
  request,
  nSys,
  dailyMiniNote
});

/* Create a top level reducer to faciliate store clean up*/
export default (state, action) => {
  if (action.resp && action.resp.return_code && action.resp.return_code === 'OK') {
    return appReducer(state, action);
  } else if (action.resp && action.resp.return_code && action.resp.return_code !== 'OK') {
    return appReducer(state, {type: action.type.substring(0, action.type.lastIndexOf('/') + 1) + 'MESSAGE_SUCCESS', rqstToken: action.rqstToken, resp: action.resp});
  } else if (action.resp && action.resp.message && action.resp.message.E000) {
    return appReducer(state, {type: action.type.substring(0, action.type.lastIndexOf('/') + 1) + 'MESSAGE_SUCCESS', rqstToken: action.rqstToken, resp: 'error'});
  } else {
    return appReducer(state, action);
  }
};
