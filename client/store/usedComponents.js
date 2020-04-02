/**
 * ACTION TYPES
 */
const ADD_COMPONENT = 'ADD_COMPONENT';
const GOT_SAVED_COMPONENTS = 'GOT_SAVED_COMPONENTS';
const REMOVED_USED_COMPONENTS = 'REMOVED_USED_COMPONENTS';
const UPDATED_COMPONENT = 'UPDATED_COMPONENT';
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

export const updatedComponent = updateObj => ({
  type: UPDATED_COMPONENT,
  updateObj,
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
    case UPDATED_COMPONENT: {
      let updatedComponents = components.filter(c => {
        return c.component.domId !== action.updateObj.domId;
      });
      let currentComponent = components.filter(
        c => c.component.domId === action.updateObj.domId
      )[0];
      currentComponent.component.content = action.updateObj.content;
      console.log('updateObj is ', action.updateObj);
      if (action.updateObj.tagName === 'UL') {
        currentComponent.component.children.forEach((child, i) => {
          console.log(child.content, action.updateObj.listItems);
          child.content =
            action.updateObj.listItems[
              Object.keys(action.updateObj.listItems)[i]
            ];
        });
      }
      updatedComponents.push(currentComponent);
      return updatedComponents;
    }
    default:
      return components;
  }
}
