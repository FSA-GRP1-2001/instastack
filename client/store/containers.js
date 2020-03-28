/**
 * ACTION TYPES
 */
const SAVE_CONTAINERS = 'SAVE_CONTAINERS';
const ADD_CONTAINER = 'ADD_CONTAINER';
const GOT_SAVED_CONTAINERS = 'GOT_SAVED_CONTAINERS';
const CLEAR_CONTAINERS = 'CLEAR_CONTAINERS';
/**
 * ACTION CREATORS
 */
const savedContainers = containers => ({
  type: SAVE_CONTAINERS,
  containers,
});

const addedContainer = container => ({
  type: ADD_CONTAINER,
  container,
});

export const clearedContainers = () => ({ type: CLEAR_CONTAINERS });

export const gotSavedContainers = containers => ({
  type: GOT_SAVED_CONTAINERS,
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

export const addContainer = container => {
  return dispatch => {
    try {
      dispatch(addedContainer(container));
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
    case ADD_CONTAINER:
      return [...containers, action.container];
    case GOT_SAVED_CONTAINERS:
      return action.containers;
    case CLEAR_CONTAINERS:
      return [];
    default:
      return containers;
  }
}
