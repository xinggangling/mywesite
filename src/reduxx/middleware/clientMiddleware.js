export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      const { promise, types, initRqstToken, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [START, SUCCESS, FAILED] = types;

      const rqstToken = initRqstToken || '' + Date.now();
      next({...rest, rqstToken, type: START});
      const actionPromise = promise(client);
      
      // const nSys = getState().nSys;
      actionPromise.then(
        (resp) => {
          // if (nSys) {
          //   nSys.addNotification({
          //     title: 'Info',
          //     message: resp.clientResponse,
          //     level: 'info',
          //     position: 'tc',
          //     autoDismiss: 5
          //   });
          // }
          next({...rest, rqstToken, resp, type: SUCCESS});
        },
        (error) => {
          // if (nSys) {
          //   nSys.addNotification({
          //     title: 'Error',
          //     message: error.clientResponse,
          //     level: 'error',
          //     position: 'tc',
          //     autoDismiss: 10
          //   });
          // }

          next({...rest, rqstToken, error, type: FAILED});
        }
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        console.log(error.stack);
        // if (nSys) {
        //   nSys.addNotification({
        //     title: 'Error',
        //     message: 'MIDDLEWARE ERROR,' + error.message,
        //     level: 'error'
        //   });
        // }
        next({...rest, error, type: FAILED});
      });
      return { actionPromise, rqstToken };
    };
  };
}
