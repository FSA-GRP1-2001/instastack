import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import component from './component';
import code from './code';
import users from './users';
import projects from './projects';

const reducer = combineReducers({
  user,
  component,
  code,
  users,
  projects,
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
