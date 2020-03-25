import axios from 'axios';
import { combineReducers } from 'redux';

/**
 * ACTION TYPES
 */
const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';

/**
 * ACTION CREATORS
 */
const gotAllProjects = projects => ({
  type: GET_ALL_PROJECTS,
  projects,
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

const rootReducer = combineReducers({
  allProjects: allProjectsReducer,
});

export default rootReducer;
