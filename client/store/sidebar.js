/**
 * ACTION TYPES
 */
const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
/**
 * ACTION CREATORS
 */
export const openedSideBar = componentsArr => ({
  type: OPEN_SIDEBAR,
  componentsArr,
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

const defaultBarItems = [];
export default function sidebarReducer(sidebar = defaultBarItems, action) {
  switch (action.type) {
    case OPEN_SIDEBAR: {
      console.log('action component is ', action.componentsArr);
      return action.componentsArr;
    }
    case CLOSE_SIDEBAR:
      return [];
    default:
      return sidebar;
  }
}

var a = [
  {
    styles: {
      fontSize: '',
      color: '#00ffff',
      borderStyle: '',
      borderWidth: '',
      borderColor: '',
      borderRadius: '',
      padding: '',
      backgroundColor: '#f3a6fc',
    },
    i: '0',
    domId: '286',
  },
  {
    styles: {
      fontSize: '22px',
      color: 'rgb(43, 255, 0)',
      borderStyle: 'ridge',
      borderWidth: '4px',
      borderColor: '',
      borderRadius: '4px',
      padding: '3px',
      backgroundColor: 'rgb(232, 218, 218)',
    },
    i: '1',
    domId: '380',
  },
];
