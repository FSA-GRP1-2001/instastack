import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

const userButton = {
  color: '#333055',
  background: 'transparent',
  border: 'transparent',
  fontWeight: 'bolder',
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.props.handleLogout(),
        },
        {
          label: 'Your Profile',
          icon: 'pi pi-user',
          command: () => history.push(`/users/${this.props.user.id}/profile`),
        },
      ],
    };
  }
  render() {
    const { handleLogout, isLoggedIn, user } = this.props;
    return (
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
              <div style={{ alignSelf: 'center', marginTop: 5 }}>
                <Menu
                  model={this.state.items}
                  popup={true}
                  ref={el => (this.menu = el)}
                  id="popup_menu"
                  style={{ background: '#333055' }}
                />
                <Button
                  label={user.displayName.toUpperCase()}
                  onClick={event => this.menu.toggle(event)}
                  aria-controls="popup_menu"
                  aria-haspopup={true}
                  icon="pi pi-caret-down"
                  iconPos="right"
                  style={userButton}
                />
              </div>
            </div>
          ) : (
            <div className="login-button-container">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <Button
                  label="Sign In"
                  className="p-button-raised white-buttons"
                />
              </Link>
              <Link to="/signup">
                <Button
                  label="Register"
                  className="p-button-raised ui-button"
                />
              </Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}

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
