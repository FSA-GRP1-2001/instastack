import beautify from 'js-beautify';

const openHtml =
  "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width initial-scale=1.0'><title>Your Code</title></head><body>";

const closeHtml = '</body></html>';

/**
 * ACTION TYPES
 */
const UPDATE_CODE = 'UPDATE_CODE';
const CLEAR_CODE = 'CLEAR_CODE';
/**
 * ACTION CREATORS
 */
const updatedCode = code => ({
  type: UPDATE_CODE,
  code,
});

export const clearedCode = () => ({ type: CLEAR_CODE });
/**
 * THUNK CREATORS
 */

export const updateCode = code => {
  return dispatch => {
    const fullCode = openHtml + code + closeHtml;
    const prettyCode = beautify.html(fullCode);
    try {
      dispatch(updatedCode(prettyCode));
      console.log('new code is ', prettyCode);
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
    case CLEAR_CODE:
      return '';
    default:
      return code;
  }
}
