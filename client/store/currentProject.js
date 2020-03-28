import axios from 'axios';
import history from '../history';
import { gotSavedComponents, gotSavedContainers } from './index';
/**
 * ACTION TYPES
 */
const SAVE_PROJECT = 'SAVE_PROJECT';
const GET_SAVED_PROJECT = 'GET_SAVED_PROJECT';
const CLEAR_PROJECT = 'CLEAR_PROJECT';
/**
 * ACTION CREATORS
 */
const savedProject = projObj => ({
  type: SAVE_PROJECT,
  projObj,
});

const gotSavedProject = projObj => ({
  type: GET_SAVED_PROJECT,
  projObj,
});

export const clearedProject = () => ({
  type: CLEAR_PROJECT,
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

export const getSavedProject = () => {
  return async dispatch => {
    try {
      // remove hard coded proj ID
      const { data } = await axios.get('/api/projects/1');
      const { usedContainers, usedComponents } = data;
      console.log('saved data is ', usedContainers, usedComponents);
      dispatch(
        gotSavedProject({
          usedComponents: JSON.parse(usedComponents),
          containers: JSON.parse(usedContainers),
        })
      );
      dispatch(gotSavedContainers(JSON.parse(usedContainers)));
      dispatch(gotSavedComponents(JSON.parse(usedComponents)));
      history.push('/mainPage');
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */
const defaultProj = {
  usedComponents: {},
  usedContainers: {},
};
export default function usedComponents(project = defaultProj, action) {
  switch (action.type) {
    case SAVE_PROJECT:
      return action.projObj;
    case GET_SAVED_PROJECT:
      return action.projObj;
    case CLEAR_PROJECT:
      return defaultProj;
    default:
      return project;
  }
}
