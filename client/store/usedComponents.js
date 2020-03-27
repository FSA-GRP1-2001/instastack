/**
 * ACTION TYPES
 */
const ADD_COMPONENT = 'ADD_COMPONENT';

/**
 * ACTION CREATORS
 */
const addedComponent = componentObj => ({
  type: ADD_COMPONENT,
  componentObj,
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
    default:
      return components;
  }
}
