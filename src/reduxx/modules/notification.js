/* TODO not being used */
const ADD_NOTIFICATION = 'rsd/notification/add';
const REMOVE_NOTIFICATION = 'rsd/notification/remove';

export default function reducer(state = null, action = {}) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return action.notificationSystem;
    case REMOVE_NOTIFICATION:
      return null;
    default: {
      return state;
    }
  }
}


export function addNotificationSystem(notificationSystem) {
  return {
    type: ADD_NOTIFICATION,
    notificationSystem
  };
}

export function removeNotificationSystem() {
  return {
    type: REMOVE_NOTIFICATION
  };
}
