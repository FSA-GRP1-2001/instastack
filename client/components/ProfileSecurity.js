import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSingleUser } from '../store/users';
import { connect } from 'react-redux';

class ProfileSecurity extends Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params);
  }
  render() {
    const { user } = this.props;
    console.log('here', this.props);
    // return users && users.name ? (
    return (
      <div>
        <h2> Login and Security </h2>

        <ul key={user.id}>
          <h3>Name:</h3>
          <h4>{user.displayName}</h4>
          <button type="button" size="small" color="primary">
            Edit
          </button>

          <h3>Email:</h3>
          <h4>{user.email}</h4>
          <button type="button" size="small" color="primary">
            Edit
          </button>

          <h3>GitHub:</h3>
          <h4>{user.githubId}</h4>
          <button type="button" size="small" color="primary">
            Edit
          </button>

          <h3>Google:</h3>
          <h4>{user.googleId}</h4>
          <button type="button" size="small" color="primary">
            Edit
          </button>

          <button type="button" size="small" color="primary">
            Add
          </button>

          <h3>Password:</h3>
          <h4>{user.password}</h4>

          <h4>*********</h4>
          <button type="button" size="small" color="primary">
            Edit
          </button>

          <h3>Two Step Verification (2SV) Setting:</h3>
          <h4>Manage your Two Step Vericification (2SV) Authenticators</h4>
          <button type="button" size="small" color="primary">
            Add
          </button>
          <br />
          <button type="button" size="small" color="yellow">
            Done
          </button>
        </ul>
        <Link to={`/users/${user.id}/profile`}>
          {/* <Link to="/users/:id/profile"> */}
          <h2>Back to your profile</h2>
        </Link>
      </div>
      // ) : (
      //   <div>
      //     <p>wrong user?</p>
      //   </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleUser: id => dispatch(getSingleUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSecurity);
