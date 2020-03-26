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
    this.props.getSingleUser(this.props.match.params);
    // console.log('test', this.props.match.params.id);
  }
  render() {
    const { users } = this.props;
    // console.log('state1', users.singleUser.projects);
    console.log('state1', this.props);

    return (
      <div>
        <h2> Your Projects </h2>

        {/* {this.props.user.projects.map(user1 => {
          return (
            <ul key={user1.id}>
              <p>{user1.title}</p>
            </ul>
          );
        })} */}
        {/* <div>
          {projects.map(project => {
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
          })} */}
        <Link to="/users/:id/profile">
          <h2>Back to your profile</h2>
        </Link>

        <Link to="/mainPage">
          <h2>Start a new project</h2>
        </Link>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // projects: state.projects.allProjects,
    // project: state.projects.singleProject,
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
