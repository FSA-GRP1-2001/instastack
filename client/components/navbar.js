import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Button } from 'primereact/button';

const Navbar = ({ handleLogout, isLoggedIn, user }) => (
  <div className="navbar">
    <nav>
      {isLoggedIn ? (
        <div className="loggedin-nav">
          {/* The navbar will show these links after you log in */}
          <Link to="/mainPage">
            <Button
              label="New Project"
              icon="pi pi-plus"
              className="p-button-raised white-buttons"
            />
          </Link>
          <Link to="/template">
            <Button label="Templates" className="p-button-raised ui-button" />
          </Link>
          <Link to={`/users/${user.id}/profile`}>
            <Button label="Profile" className="p-button-raised ui-button" />
          </Link>
          <a href="#" onClick={handleLogout}>
            <Button label="Log Out" className="p-button-raised ui-button" />
          </a>
        </div>
      ) : (
        <div className="login-button-container">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <Button label="Sign In" className="p-button-raised white-buttons" />
          </Link>
          <Link to="/signup">
            <Button label="Register" className="p-button-raised ui-button" />
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
