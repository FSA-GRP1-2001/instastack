/**
 * ACTION TYPES
 */
const SAVE_STYLES = 'SAVE_STYLES';
const GOT_SAVED_STYLES = 'GOT_SAVED_STYLES';
/**
 * ACTION CREATORS
 */
const savedStyles = styleObj => ({
  type: SAVE_STYLES,
  styleObj,
});

export const gotSavedStyles = styles => ({ type: GOT_SAVED_STYLES, styles });

/**
 * THUNK CREATORS
 */
export const saveStyles = (styles, domId, i) => {
  const styleObj = {
    styles,
    i,
    domId,
  };
  console.log('dispatching ', styleObj);
  return dispatch => {
    try {
      dispatch(savedStyles(styleObj));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */
export default function usedComponents(styles = [], action) {
  switch (action.type) {
    case SAVE_STYLES: {
      let prevObjIdx = null;
      styles.forEach((obj, i) => {
        if (obj.domId === action.styleObj.domId) {
          prevObjIdx = i;
        }
      });
      if (prevObjIdx !== null) {
        let newStyles = [...styles];
        newStyles[prevObjIdx] = action.styleObj;
        return newStyles;
      } else {
        return [...styles, action.styleObj];
      }
    }
    case GOT_SAVED_STYLES:
      return action.styles;
    default:
      return styles;
  }
}
