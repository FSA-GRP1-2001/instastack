import beautify from 'js-beautify';

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
  return dispatch => {
    const prettyCode = beautify.html(code);
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
    default:
      return code;
  }
}

// const openHtml = '<!DOCTYPE html>
// <html>
//   <head>
//     <meta charset='utf-8'>
//     <meta name='viewport' content='width=device-width initial-scale=1.0'>
//     <title>Your Code</title>
//   </head><body>'

// const closeHtml = '</body></html>'
