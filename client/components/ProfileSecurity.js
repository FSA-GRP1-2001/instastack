import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSingleUser } from '../store/users';
import { connect } from 'react-redux';
import { Accordion, AccordionTab } from 'primereact/accordion';

class ProfileSecurity extends Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id);
  }
  render() {
    const { user } = this.props;
    //console.log('here', this.props);
    // return users && users.name ? (
    return (
      <div className="profile-background">
        <h2> Login and Security </h2>
        <div className="RGL-container">
          <ul key={user.id}>
            <Accordion multiple={true}>
              <AccordionTab header="Name">
                {user.displayName}
                <br></br>
                <button type="button" size="small" color="primary">
                  Edit
                </button>
              </AccordionTab>

              <AccordionTab header="Email">
                {user.email}

                <br></br>
                <button type="button" size="small" color="primary">
                  Edit
                </button>
              </AccordionTab>

              <AccordionTab header="GitHub">
                {user.githubId}
                <br></br>
                <button type="button" size="small" color="primary">
                  Add
                </button>
                <button type="button" size="small" color="primary">
                  Edit
                </button>
              </AccordionTab>

              <AccordionTab header="Google">
                {user.googleId}
                <br></br>
                <button type="button" size="small" color="primary">
                  Add
                </button>
                <button type="button" size="small" color="primary">
                  Edit
                </button>
              </AccordionTab>

              <AccordionTab header="Password">
                <h4>*********</h4>
                <button type="button" size="small" color="primary">
                  Edit
                </button>
              </AccordionTab>
              <AccordionTab header="Two Step Verification (2SV) Setting:">
                <h4>
                  Manage your Two Step Vericification (2SV) Authenticators
                </h4>
                <button type="button" size="small" color="primary">
                  Add
                </button>
                <button type="button" size="small" color="yellow">
                  Done
                </button>
              </AccordionTab>

              {/*
          <button type="button" size="small" color="primary">
            Add
          </button>

          <h3>Password:</h3>
          <h4>{user.password}</h4>

          <button type="button" size="small" color="primary">
            Edit
          </button> */}
            </Accordion>
          </ul>
        </div>
        <Link to={`/users/${user.id}/profile`}>
          <h2>Back to your profile</h2>
        </Link>
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
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleUser: id => dispatch(getSingleUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSecurity);
