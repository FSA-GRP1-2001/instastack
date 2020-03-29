/**
 * ACTION TYPES
 */
const ADD_COMPONENT = 'ADD_COMPONENT';
const GOT_SAVED_COMPONENTS = 'GOT_SAVED_COMPONENTS';
const REMOVED_USED_COMPONENTS = 'REMOVED_USED_COMPONENTS';
/**
 * ACTION CREATORS
 */
const addedComponent = componentObj => ({
  type: ADD_COMPONENT,
  componentObj,
});

export const gotSavedComponents = components => ({
  type: GOT_SAVED_COMPONENTS,
  components,
});

export const removedUsedComponents = containerId => ({
  type: REMOVED_USED_COMPONENTS,
  containerId,
});

/**
 * THUNK CREATORS
 */
export const addComponent = (component, containerIdx) => {
  const containerObj = {
    component,
    i: containerIdx,
  };
  return dispatch => {
    try {
      dispatch(addedComponent(containerObj));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */
export default function usedComponents(components = [], action) {
  switch (action.type) {
    case ADD_COMPONENT:
      return [...components, action.componentObj];
    case GOT_SAVED_COMPONENTS:
      return action.components;
    case REMOVED_USED_COMPONENTS:
      return [...components.filter(obj => obj.i !== action.containerId)];
    default:
      return components;
  }
}
