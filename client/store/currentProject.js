import axios from 'axios';
/**
 * ACTION TYPES
 */
const SAVE_PROJECT = 'SAVE_PROJECT';

/**
 * ACTION CREATORS
 */
const savedProject = projObj => ({
  type: SAVE_PROJECT,
  projObj,
});

/**
 * THUNK CREATORS
 */
export const saveProject = (
  components,
  containers,
  projId = 1
) => async dispatch => {
  const usedComponents = JSON.stringify(components);
  const usedContainers = JSON.stringify(containers);
  try {
    console.log('SAVING PROJECT');
    const { data } = await axios.put(`/api/projects/${projId}`, {
      usedComponents,
      usedContainers,
    });
    console.log('saved dta is ', data);
    dispatch(savedProject({ usedComponents, usedContainers }));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function usedComponents(project = {}, action) {
  switch (action.type) {
    case SAVE_PROJECT:
      return action.projObj;
    default:
      return project;
  }
}
