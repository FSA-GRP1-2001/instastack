import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <Link to="/users/:id/projects">
          {/* <Link to={`/users/${user.id}/projects`}> */}

          <h2>Your Projects</h2>
        </Link>
        <h3>Edit, update saved projects</h3>

        <Link to="/users/:id/security">
          <h2>Login and Security</h2>
        </Link>
        <h3>Edit login, name, GitHub account</h3>
      </div>
    );
  }
}
