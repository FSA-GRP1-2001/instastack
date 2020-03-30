import axios from 'axios';
import { combineReducers } from 'redux';

/**
 * ACTION TYPES
 */

const TOGGLE_CODE_MIRROR = 'TOGGLE_CODE_MIRROR';

/**
 * ACTION CREATORS
 */
// const toggleCodeMirror = show => ({
//   type: TOGGLE_CODE_MIRROR,
//   show,
// });
export const toggleCodeMirror = () => ({
  type: TOGGLE_CODE_MIRROR,
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
// function toggleCodeMirrorReducer(show = false, action) {
//   switch (action.type) {
//     case TOGGLE_CODE_MIRROR:
//       return action.show;
//     default:
//       return !show;
//   }
// }
function toggleCodeMirrorReducer(show = false, action) {
  switch (action.type) {
    case TOGGLE_CODE_MIRROR:
      return !show;
    default:
      return show;
  }
}
const rootReducer = toggleCodeMirrorReducer;

export default rootReducer;
