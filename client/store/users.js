import axios from 'axios';
import { combineReducers } from 'redux';

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_SINGLE_USER = 'GET_SINGLE_USER';

/**
 * ACTION CREATORS
 */
const gotAllUsers = users => ({
  type: GET_ALL_USERS,
  users,
});

const gotSingleUser = user => ({
  type: GET_SINGLE_USER,
  user,
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

export const getSingleUser = id => async dispatch => {
  try {
    let userId = id;
    const { data } = await axios.get(`/api/users/${userId}`);
    dispatch(gotSingleUser(data));
  } catch (error) {
    console.log('We could not find the user.');
  }
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

function singleUserReducer(user = {}, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user;
    default:
      return user;
  }
}

const rootReducer = combineReducers({
  allUsers: allUsersReducer,
  //singleUser: singleUserReducer,
  singleUserReducer,
});

export default rootReducer;
