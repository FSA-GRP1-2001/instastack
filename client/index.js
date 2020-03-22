import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

// establishes socket connection
import './socket';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
);
