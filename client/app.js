import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './components';
import Routes from './routes';
import ListOfComponents from './components/list/componentSection';

const styles = {
  appContainer: {
    display: 'grid',
    gridTemplateColumns: '200px auto',
    gridTemplateRows: '60px auto',
  },
};

const App = () => {
  return (
    <>
      <div style={styles.appContainer}>
        <div className="app-logo">
          <Link to="/">
            <img className="logo" src="logos/instaStack-logo.svg" />
          </Link>
        </div>
        <Navbar />
        <ListOfComponents />
        <Routes />
      </div>
      <div className="footer">
        <img className="logo" src="logos/instaStack-icon.svg" />
        <h7>instaStack © 2020</h7>
      </div>
    </>
  );
};

export default App;
