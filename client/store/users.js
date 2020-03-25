import axios from 'axios';
import { combineReducers } from 'redux';

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS';

/**
 * ACTION CREATORS
 */
const gotAllUsers = users => ({
  type: GET_ALL_USERS,
  users,
});

/**
 * THUNK CREATORS
 */

export const getAllUsers = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/users');
      dispatch(gotAllUsers(data));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */
function allUsersReducer(users = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return users;
  }
}

const rootReducer = combineReducers({
  allUsers: allUsersReducer,
});

export default rootReducer;
