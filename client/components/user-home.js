import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { displayName, id, email } = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
      {/* <h3>Welcome, {displayName}</h3> */}

      <section className="userhome-container">
        <div className="userhome-nav-selection">
          <Link to="/mainpage">Start a New Project</Link>
        </div>
        <div className="userhome-nav-selection">
          <Link to="/template">Start from a Template</Link>
        </div>
        <div className="userhome-nav-selection">
          <Link to={`/users/${id}/projects`}>View Saved Projects</Link>
        </div>
      </section>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    displayName: state.user.displayName,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
