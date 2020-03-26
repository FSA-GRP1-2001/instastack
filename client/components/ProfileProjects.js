import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProjects, getSingleProject } from '../store/projects';
import { getAllUsers, getSingleUser } from '../store/users';

class ProfileProjects extends Component {
  componentDidMount() {
    // this.props.getAllProjects(this.props.match.params.id);
    // this.props.getSingleProject(this.props.match.params);
    // this.props.getAllUsers(this.props.match.params.id);
    this.props.getSingleUser(this.props.match.params);
    // console.log('test', this.props.match.params.id);
  }
  render() {
    const { user } = this.props;
    console.log('state1', this.props);
    // if (!projects)
    //   return (
    //     <div>
    //       <h1>Project Not Found!</h1>
    //     </div>
    //   );
    // if (!projects.title)
    //   return (
    //     <div>
    //       <h1>Loading Project...</h1>
    //     </div>
    //   );
    // return project && project.title ? (
    return (
      <div>
        <h2> Your Projects </h2>
        <p>{user.singleUsers.projects.title}</p>
        {/* {projects.map(p => {
          return (
            <ul key={p.id}>
              <p> {p.title}</p>
            </ul>
          );
        })} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // projects: state.projects.allProjects,
    // project: state.projects.singleProject,
    // users: state.users.allUsers,
    user: state.user.singleUser,
    // user: state.singleUserReducer
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
