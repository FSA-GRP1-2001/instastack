import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getAllProjects, getSingleProject } from '../store/projects';
// import { getAllUsers, getSingleUser } from '../store/users';
import { getSingleUser, getSavedProject } from '../store';
import { Button } from 'primereact/button';

class ProfileProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
    };

    this.handleOpenProject = this.handleOpenProject.bind(this);
    this.showDropDownMenu = this.showDropDownMenu.bind(this);
    this.hideDropDownMenu = this.hideDropDownMenu.bind(this);
  }

  async componentDidMount() {
    await this.props.getSingleUser(this.props.match.params.id);
  }

  async handleOpenProject(projId) {
    console.log('handle open proj id is ', projId);
    await this.props.getSavedProject(projId);
  }

  showDropDownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropDownMenu);
    });
  }

  hideDropDownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropDownMenu);
    });
  }

  //   render() {
  //     const { user, userProjects } = this.props;
  //     console.log('state1', this.props);
  //     return (
  //       <div className="profile-background">
  //         <h2> Your Projects </h2>
  //         <br></br>
  //         <h4>{user.displayName}</h4>
  //         <br></br>
  //         <div style={{ display: 'flex', justifyContent: 'center' }}>
  //           <div
  //             className="dropdown"
  //             style={{ background: '#333055', width: '600px' }}
  //           >
  //             {userProjects.length &&
  //               userProjects.map(p => {
  //                 return (
  //                   <ul key={p.id}>
  //                     <div className="button" onClick={this.showDropdownMenu}>
  //                       {p.title}
  //                     </div>

  //                     <ul>
  //                       <div className="active">
  //                         <h4>{p.title}</h4>
  //                         <button
  //                           type="button"
  //                           size="small"
  //                           color="primary"
  //                           onClick={() => this.handleOpenProject(p.id)}
  //                         >
  //                           Open
  //                         </button>
  //                         <button
  //                           type="button"
  //                           size="small"
  //                           color="primary"
  //                           // onClick={}
  //                         >
  //                           Edit
  //                         </button>
  //                         <button
  //                           type="button"
  //                           size="small"
  //                           color="primary"
  //                           // onClick={}
  //                         >
  //                           Delete
  //                         </button>
  //                         <button
  //                           type="button"
  //                           size="small"
  //                           color="primary"
  //                           // onClick={}
  //                         >
  //                           Save
  //                         </button>
  //                       </div>
  //                     </ul>
  //                     {/* </div> */}
  //                   </ul>
  //                 );
  //               })}
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  render() {
    const { user, userProjects } = this.props;
    console.log('state1', this.props);
    return (
      <div className="profile-background">
        <div>
          <h2> Your Projects </h2>
          <h4>{user.displayName}</h4>
          {// userProjects.length &&
          userProjects.map(p => {
            return (
              <ul key={p.id}>
                {/* <h3>Projects:</h3> */}
                <div
                  className="dropdown"
                  style={{ background: '#333055', width: '200px' }}
                >
                  <div className="button" onClick={this.showDropdownMenu}>
                    <h4>{p.title}</h4>
                  </div>
                  {/* <h4>{p.title}</h4> */}

                  <button
                    type="button"
                    size="small"
                    color="primary"
                    onClick={() => this.handleOpenProject(p.id)}
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
                </div>
              </ul>
            );
          })}
        </div>
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
