import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  MainPage,
  Profile,
  ProfileProjects,
  ProfileSecurity,
  Templates,
  LandingPageTemplate,
  BlogTemplate,
  GuestHome,
} from './components';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={GuestHome} />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/mainpage" component={MainPage} />
        <Route path="/template" component={GuestHome} />
        {/* this is breaking the code for logged in users */}
        <Route exact path="/" component={GuestHome} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/users/:id/profile" component={Profile} />
            <Route path="/users/:id/projects" component={ProfileProjects} />
            <Route
              exact
              path="/users/:id/security"
              component={ProfileSecurity}
            />
            <Route
              path="/landingpagetemplate"
              component={LandingPageTemplate}
            />
            <Route path="/blogtemplate" component={BlogTemplate} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
