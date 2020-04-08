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
    await this.props.getSavedProject(projId);
  }

  render() {
    const { user, userProjects } = this.props;
    return (
      <div className="profile-background">
        <div className="RGL-container2">
          <h2 className="color"> Your Projects </h2>
          <h4 className="name">{user.displayName}</h4>
          {userProjects !== undefined
            ? userProjects.map(p => {
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
              })
            : null}
        </div>
        <Link to={`/users/${user.id}/security`}>
          <h4 className="color-link">Your Profile</h4>
        </Link>
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
    getSavedProject: projId => dispatch(getSavedProject(projId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileProjects);
