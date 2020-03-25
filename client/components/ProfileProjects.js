import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProjects, getSingleProject } from '../store/projects';
import { getAllUsers, getSingleUser } from '../store/users';

class ProfileProjects extends Component {
  componentDidMount() {
    // this.props.getAllProjects(this.props.match.params.id);
    // this.props.getSingleProject(this.props.match.params.id);
    // this.props.getAllUsers(this.props.match.params.id);
    this.props.getSingleUser(this.props.match.params.id);
  }
  render() {
    const { users } = this.props;
    console.log('state', this.props);
    return (
      <div>
        <h2> Your Projects </h2>

        {users.map(user => {
          return (
            <ul key={user.id}>
              <p>{user.projects.title}</p>
            </ul>
          );
        })}
        {/* <div> */}
        {/* {projects.map(project => {
            return (
              <ul key={project.id}>
                <h3>Projects:</h3>
                <h4>{project.title}</h4>
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
                  Delete
                </button>

                <button
                  type="button"
                  size="small"
                  color="primary"
                  // onClick={}
                >
                  Save
                </button>
              </ul>
            );
          })}
          <Link to="/profile">
            <h2>Back to your profile</h2>
          </Link>

          <Link to="/mainPage">
            <h2>Start a new project</h2>
          </Link>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // projects: state.projects.allProjects,
    // project: state.project,
    // users: state.users.allUsers,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getAllProjects: () => dispatch(getAllProjects()),
    // getSingleProject: id => dispatch(getSingleProject(id)),
    // getAllUsers: () => dispatch(getAllUsers()),
    getSingleUser: id => dispatch(getSingleUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileProjects);
