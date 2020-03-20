import axios from 'axios';
import { combineReducers } from 'redux';

/**
 * ACTION TYPES
 */
const GET_ALL_COMPONENTS = 'GET_ALL_COMPONENTS';

/**
 * ACTION CREATORS
 */
const gotAllComponents = components => ({
  type: GET_ALL_COMPONENTS,
  components,
});

/**
 * THUNK CREATORS
 */

export const getAllComponents = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/components');
      dispatch(gotAllComponents(data));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */
function allComponentsReducer(components = [], action) {
  switch (action.type) {
    case GET_ALL_COMPONENTS:
      return action.components;
    default:
      return components;
  }
}

const rootReducer = combineReducers({
  allComponents: allComponentsReducer,
});

export default rootReducer;
