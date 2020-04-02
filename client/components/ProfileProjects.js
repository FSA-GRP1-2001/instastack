import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getAllProjects, getSingleProject } from '../store/projects';
// import { getAllUsers, getSingleUser } from '../store/users';
import { getSingleUser, getSavedProject } from '../store';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Link } from 'react-router-dom';

class ProfileProjects extends Component {
  constructor(props) {
    super(props);

    this.handleOpenProject = this.handleOpenProject.bind(this);
  }

  async componentDidMount() {
    await this.props.getSingleUser(this.props.match.params.id);
  }

  async handleOpenProject(projId) {
    console.log('handle open proj id is ', projId);
    await this.props.getSavedProject(projId);
  }

  render() {
    const { user, userProjects } = this.props;
    console.log('state1', this.props);
    return (
      <div className="profile-background">
        {/* <div className="align-container"> */}
        <div className="RGL-container2">
          <h2 className="color"> Your Projects </h2>
          <h3 className="color">{user.displayName}</h3>
          {userProjects.length &&
            userProjects.map(p => {
              return (
                <ul key={p.id}>
                  <div className="profile-bar-color">
                    <Accordion multiple={true}>
                      <AccordionTab header={p.title}>
                        <button
                          type="button"
                          size="small"
                          color="primary"
                          onClick={() => this.handleOpenProject(p.id)}
                        >
                          Open
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
                        <br></br>
                        <img src="/img/blog2.png" width="400" height="400" />
                      </AccordionTab>
                    </Accordion>
                  </div>
                </ul>
              );
            })}
        </div>

        <Link to={`/users/${user.id}/security`}>
          <h2 className="color">Back to your settings</h2>
        </Link>
      </div>
      // </div>
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
    getSavedProject: projId => dispatch(getSavedProject(projId)),
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
