/* eslint-disable no-shadow */
import axios from 'axios';
import history from '../history';
import { gotSavedComponents } from './usedComponents';
import { gotSavedContainers } from './containers';
import { gotSavedStyles } from './usedStyles';
/**
 * ACTION TYPES
 */
const CREATE_PROJECT = 'CREATE_PROJECT';
const SAVE_PROJECT = 'SAVE_PROJECT';
const GET_SAVED_PROJECT = 'GET_SAVED_PROJECT';
const CLEAR_PROJECT = 'CLEAR_PROJECT';

/**
 * ACTION CREATORS
 */

export const createdProject = (title, id) => ({
  type: CREATE_PROJECT,
  title,
  id,
});

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

export const createProject = title => async dispatch => {
  try {
    console.log('ADD TITLE');
    const { data } = await axios.post(`/api/projects`, { title });
    dispatch(createdProject(data.title, data.id));
  } catch (error) {
    console.error(error);
  }
};

export const saveProject = (
  components,
  containers,
  styles,
  projId
  //projId = 1
) => async dispatch => {
  const usedComponents = JSON.stringify(components);
  const usedContainers = JSON.stringify(containers);
  const usedStyles = JSON.stringify(styles);
  try {
    console.log('SAVING PROJECT');
    const { data } = await axios.put(`/api/projects/${projId}`, {
      usedComponents,
      usedContainers,
      usedStyles,
    });
    console.log('saved data is ', data);
    dispatch(savedProject({ usedComponents, usedContainers }));
  } catch (error) {
    console.error(error);
  }
};

export const getSavedProject = projId => async dispatch => {
  try {
    console.log('dispatch proj id is ', projId);
    const { data } = await axios.get(`/api/projects/${projId}`);
    const { usedContainers, usedComponents, usedStyles } = data;
    console.log('saved data is ', usedContainers, usedComponents);
    dispatch(
      gotSavedProject({
        usedComponents: JSON.parse(usedComponents),
        containers: JSON.parse(usedContainers),
        usedStyles: JSON.parse(usedStyles),
      })
    );
    dispatch(gotSavedContainers(JSON.parse(usedContainers)));
    dispatch(gotSavedComponents(JSON.parse(usedComponents)));
    dispatch(gotSavedStyles(JSON.parse(usedStyles)));
    history.push('/mainPage');
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
const defaultProj = {
  usedComponents: {},
  usedContainers: {},
  title: '',
  id: '',
};

export default function usedComponents(project = defaultProj, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return { ...project, title: action.title, id: action.id };
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
