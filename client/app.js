import React from 'react';

import { Navbar } from './components';
import Routes from './routes';
import ListOfComponents from './components/list/componentSection';

const styles = {
  appContainer: {
    border: '1px solid yellow',
    display: 'grid',
    gridTemplateColumns: '200px auto',
    gridTemplateRows: '60px auto',
  },
};

const App = () => {
  return (
    <div>
      <div style={styles.appContainer}>
        <div className="app-logo">App Logo</div>
        <Navbar />
        <ListOfComponents />
        <Routes />
      </div>
    </div>
  );
};

export default App;
