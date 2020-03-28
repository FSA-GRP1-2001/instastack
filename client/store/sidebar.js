/**
 * ACTION TYPES
 */
const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
/**
 * ACTION CREATORS
 */
export const openedSideBar = (compId, compType) => ({
  type: OPEN_SIDEBAR,
  component: {
    domId: compId,
    title: compType,
  },
});

export const closedSideBar = () => ({
  type: CLOSE_SIDEBAR,
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */

const defaultBar = {
  visible: false,
  componentDomId: '',
  componentTitle: '',
};
export default function sidebarReducer(sidebar = defaultBar, action) {
  switch (action.type) {
    case OPEN_SIDEBAR: {
      console.log('action component is ', action.component);
      return {
        ...sidebar,
        visible: true,
        componentDomId: action.component.domId,
        componentTitle: action.component.title,
      };
    }
    case CLOSE_SIDEBAR:
      return defaultBar;
    default:
      return sidebar;
  }
}
