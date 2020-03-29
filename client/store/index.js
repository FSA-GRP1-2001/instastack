import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import component from './component';
import code from './code';
import users from './users';
import projects from './projects';
import usedComponents from './usedComponents';
import currentProject from './currentProject';
import containers from './containers';
import sidebar from './sidebar';
import usedStyles from './usedStyles';

const reducer = combineReducers({
  user,
  component,
  usedComponents,
  usedStyles,
  code,
  users,
  projects,
  currentProject,
  containers,
  sidebar,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './component';
export * from './code';
export * from './users';
export * from './projects';
export * from './usedComponents';
export * from './currentProject';
export * from './containers';
export * from './sidebar';
export * from './usedStyles';
