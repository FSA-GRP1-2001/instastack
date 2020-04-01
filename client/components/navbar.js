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
              // onClick={this.handleAddContainer}
              label="New Project"
              icon="pi pi-plus"
              className="p-button-raised white-buttons"
              // disabled={this.state.showPreview}
            />
          </Link>
          <Link to="template">
            <Button
              // onClick={this.handleAddContainer}
              label="Templates"
              className="p-button-raised ui-button"
              // disabled={this.state.showPreview}
            />{' '}
          </Link>

          <a href="#" onClick={handleLogout}>
            <Button
              // onClick={this.handleAddContainer}
              label="Log Out"
              className="p-button-raised ui-button"
              // disabled={this.state.showPreview}
            />
          </a>
          <Link to={`/users/${user.id}/profile`}>
            <Button
              // onClick={this.handleAddContainer}
              label="Profile"
              className="p-button-raised ui-button"
              // disabled={this.state.showPreview}
            />
          </Link>
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
