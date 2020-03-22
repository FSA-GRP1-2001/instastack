import axios from 'axios';
import { combineReducers } from 'redux';

const openingCode = `const MyComponent = (props) => { \n return (`;
const closingCode = `\n); \n }`;

/**
 * ACTION TYPES
 */
const UPDATE_CODE = 'UPDATE_CODE';

/**
 * ACTION CREATORS
 */
const updatedCode = code => ({
  type: UPDATE_CODE,
  code,
});

/**
 * THUNK CREATORS
 */

export const updateCode = code => {
  return async dispatch => {
    try {
      const newCode = openingCode + code + closingCode;
      dispatch(updatedCode(newCode));
      console.log('new code is ', newCode);
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */ export default function codeReducer(code = '', action) {
  switch (action.type) {
    case UPDATE_CODE:
      return action.code;
    default:
      return code;
  }
}
