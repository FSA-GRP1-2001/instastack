import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSingleUser } from '../store/users';
import { connect } from 'react-redux';

class Profile extends Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id);
  }
  render() {
    const { user } = this.props;
    // console.log('user', user);
    return (
      <div className="profile-background">
        <Link to={`/users/${user.id}/projects`}>
          <h2>Your Projects</h2>
        </Link>
        <h3>Edit, update saved projects</h3>

        <Link to={`/users/${user.id}/security`}>
          <h2>Login and Security</h2>
        </Link>
        <h3>Edit login, name, GitHub account</h3>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
