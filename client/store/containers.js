/* eslint-disable no-shadow */
import { removedUsedComponents } from './usedComponents';

const templates = {
  landing: [
    { i: '0', x: 0, y: 0, w: 12, h: 4 },
    { i: '1', x: 0, y: 4, w: 12, h: 1 },
    { i: '2', x: 0, y: 5, w: 5, h: 4 },
    { i: '3', x: 7, y: 5, w: 5, h: 4 },
  ],
};

/**
 * ACTION TYPES
 */
const SAVE_CONTAINERS = 'SAVE_CONTAINERS';
const ADD_CONTAINER = 'ADD_CONTAINER';
const GOT_SAVED_CONTAINERS = 'GOT_SAVED_CONTAINERS';
const CLEAR_CONTAINERS = 'CLEAR_CONTAINERS';
const REMOVE_CONTAINER = 'REMOVE_CONTAINER';
const RESIZE_CONTAINER = 'RESIZE_CONTAINER';
const LOAD_TEMPLATE_CONTAINERS = 'LOAD_TEMPLATE_CONTAINERS';
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

const removedContainer = containerId => ({
  type: REMOVE_CONTAINER,
  containerId,
});

export const resizedContainer = container => ({
  type: RESIZE_CONTAINER,
  container,
});

export const clearedContainers = () => ({ type: CLEAR_CONTAINERS });

export const gotSavedContainers = containers => ({
  type: GOT_SAVED_CONTAINERS,
  containers,
});

export const loadTemplateContainers = template => ({
  type: LOAD_TEMPLATE_CONTAINERS,
  template,
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

export const removeContainer = containerId => dispatch => {
  try {
    dispatch(removedContainer(containerId));
    dispatch(removedUsedComponents(containerId));
  } catch (error) {
    console.log(error);
  }
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
    case REMOVE_CONTAINER:
      // i is the key on the container obj we use, not the idx
      return [...containers.filter(c => c.i !== action.containerId)];
    case RESIZE_CONTAINER:
      return containers.map(c => {
        if (c.i === action.container.i) {
          return action.container;
        } else {
          return c;
        }
      });
    case LOAD_TEMPLATE_CONTAINERS:
      return templates[action.template];
    default:
      return containers;
  }
}
