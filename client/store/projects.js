import axios from 'axios';
import { combineReducers } from 'redux';

/**
 * ACTION TYPES
 */
const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
const GET_SINGLE_PROJECT = 'GET_SINGLE_PROJECT';

/**
 * ACTION CREATORS
 */
const gotAllProjects = projects => ({
  type: GET_ALL_PROJECTS,
  projects,
});

const gotSingleProject = project => ({
  type: GET_SINGLE_PROJECT,
  project,
});

/**
 * THUNK CREATORS
 */

export const getAllProjects = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/projects');
      dispatch(gotAllProjects(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSingleProject = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/projects/${id}`);
      dispatch(gotSingleProject(data));
    } catch (error) {
      console.error(error);
    }
  };
};
/**
 * REDUCER
 */
function allProjectsReducer(projects = [], action) {
  switch (action.type) {
    case GET_ALL_PROJECTS:
      return action.projects;
    default:
      return projects;
  }
}

function singleProjectReducer(project = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PROJECT:
      return action.project;
    default:
      return project;
  }
}

const rootReducer = combineReducers({
  allProjects: allProjectsReducer,
  singleProject: singleProjectReducer,
});

export default rootReducer;
