import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../store/users';
import { connect } from 'react-redux';

class ProfileSecurity extends Component {
  componentDidMount() {
    this.props.getAllUsers(this.props.match.params.id);
  }
  render() {
    const { users } = this.props;
    console.log('here', this.props);
    // return users && users.name ? (
    return (
      <div>
        <h2> Login and Security </h2>
        <div>
          {users.map(user => {
            return (
              <ul key={user.id}>
                {/* <h4>{user.email}</h4> */}
                {/* <p>{user.email}</p> */}

                <h3>Name:</h3>
                <h4>{user.displayName}</h4>
                <button
                  type="button"
                  size="small"
                  color="primary"
                  // onClick={}
                >
                  Edit
                </button>

                <h3>Email:</h3>
                <h4>{user.email}</h4>
                <button
                  type="button"
                  size="small"
                  color="primary"
                  // onClick={}
                >
                  Edit
                </button>

                <h3>GitHub:</h3>
                <h4>{user.githubId}</h4>
                <button
                  type="button"
                  size="small"
                  color="primary"
                  // onClick={}
                >
                  Edit
                </button>

                <h3>Google:</h3>
                <h4>{user.googleId}</h4>
                <button
                  type="button"
                  size="small"
                  color="primary"
                  // onClick={}
                >
                  Edit
                </button>

                <button
                  type="button"
                  size="small"
                  color="primary"
                  // onClick={}
                >
                  Add
                </button>

                <h3>Password:</h3>
                <h4>{user.password}</h4>

                <h4>*********</h4>
                <button
                  type="button"
                  size="small"
                  color="primary"
                  // onClick={}
                >
                  Edit
                </button>

                <h3>Two Step Verification (2SV) Setting:</h3>
                <h4>
                  Manage your Two Step Vericification (2SV) Authenticators
                </h4>
                <button
                  type="button"
                  size="small"
                  color="primary"
                  // onClick={}
                >
                  Add
                </button>
                <br />
                <button
                  type="button"
                  size="small"
                  color="yellow"
                  // onClick={}
                >
                  Done
                </button>

                <Link to="/profile">
                  <h2>Back to your profile</h2>
                </Link>
              </ul>
            );
          })}
        </div>
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
    users: state.users.allUsers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: id => dispatch(getAllUsers(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSecurity);
