import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProjects } from '../store/projects';

class ProfileProjects extends Component {
  componentDidMount() {
    this.props.getAllProjects(this.props.match.params.id);
  }
  render() {
    const { projects } = this.props;
    console.log(this.props);
    return (
      <div>
        <h2> Your Projects </h2>

        <div>
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
          })}
          <Link to="/profile">
            <h2>Back to your profile</h2>
          </Link>

          <Link to="/mainPage">
            <h2>Start a new project</h2>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.allProjects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: id => dispatch(getAllProjects(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileProjects);
