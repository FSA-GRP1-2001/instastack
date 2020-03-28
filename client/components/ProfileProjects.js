import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { getAllProjects, getSingleProject } from '../store/projects';
// import { getAllUsers, getSingleUser } from '../store/users';
import { getSingleUser, getSavedProject } from '../store';

class ProfileProjects extends Component {
  constructor(props) {
    super(props);

    this.handleOpenProject = this.handleOpenProject.bind(this);
  }
  // componentDidMount() {
  //   // this.props.getAllProjects(this.props.match.params.id);
  //   // this.props.getSingleProject(this.props.match.params);
  //   // this.props.getAllUsers(this.props.match.params.id);
  //   this.props.getSingleUser(+this.props.match.params);
  //   // console.log('test', this.props.match.params.id);
  // }
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id);
  }

  handleOpenProject() {
    this.props.getSavedProject();
  }

  render() {
    const { user, userProjects } = this.props;
    console.log('state1', this.props);
    return (
      <div>
        <h2> Your Projects </h2>
        <h4>{user.displayName}</h4>
        {userProjects.length &&
          userProjects.map(p => {
            return (
              <ul key={p.id}>
                <h3>Projects:</h3>
                <h4>{p.title}</h4>
                <button
                  type="button"
                  size="small"
                  color="primary"
                  onClick={this.handleOpenProject}
                >
                  OPEN
                </button>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userProjects: state.users.singleUserReducer.projects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleUser: id => dispatch(getSingleUser(id)),
    getSavedProject: () => dispatch(getSavedProject()),
  };
};

// const mapStateToProps = state => {
//   return {
//     // projects: state.projects.allProjects,
//     // project: state.projects.singleProject,
//     // users: state.users.allUsers,
//     user: state.user,
//     // user: state.singleUserReducer
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     // getAllProjects: () => dispatch(getAllProjects()),
//     // getSingleProject: id => dispatch(getSingleProject(id)),
//     // getAllUsers: () => dispatch(getAllUsers()),
//     getSingleUser: id => dispatch(getSingleUser(id)),
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileProjects);
