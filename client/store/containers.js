/**
 * ACTION TYPES
 */
const SAVE_CONTAINERS = 'SAVE_CONTAINERS';

/**
 * ACTION CREATORS
 */
const savedContainers = containers => ({
  type: SAVE_CONTAINERS,
  containers,
});

/**
 * THUNK CREATORS
 */
export const saveContainers = containers => {
  return dispatch => {
    try {
      dispatch(savedContainers(containers));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */
export default function containers(containers = [], action) {
  switch (action.type) {
    case SAVE_CONTAINERS:
      return action.containers;
    default:
      return containers;
  }
}
