import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import github from '../../public/logos/github.png';
import google from '../../public/logos/google.png';
import { InputText } from 'primereact/inputtext';

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const styles = {
  signUpButton: {
    borderRadius: 20,
  },
  github: {
    background: 'black',
  },
  google: {
    background: 'white',
  },
  outerContainer: {
    background: '#EDF1F1',
    display: 'flex',
    justifyContent: 'center',
  },
  center: {
    width: '25rem',
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1.5rem',
    height: '18rem',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1.5rem',
    height: '18rem',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInput: {
    margin: 0,
  },
  form: {
    width: '70%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInputs: {
    width: 200,
  },
  authButton: {
    width: 200,
    background: 'black',
    color: 'white',
  },
  fontBlue: {
    color: '#0C62C1',
  },
};

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  const classes = useStyles();
  const authMessage =
    displayName === 'Sign Up'
      ? 'Create Your Account'
      : 'Sign In To Your Account';
  return (
    <section style={styles.outerContainer}>
      <div style={styles.center}>
        <div style={styles.top}>
          <p style={{ ...styles.fontBlue, marginBottom: 0 }}>WELCOME TO</p>
          <img src="logos/logo_for_forms.png" />
          <Button
            fullWidth
            variant="contained"
            style={{ ...styles.signUpButton, ...styles.github }}
          >
            <img
              src="/logos/github_dark.png"
              style={{ marginRight: 10, width: 15, height: 15 }}
            />
            <Link href="/auth/github" style={{ color: 'white' }}>
              {displayName} with GitHub
            </Link>
          </Button>
          <Button
            fullWidth
            variant="contained"
            style={{ ...styles.signUpButton, ...styles.google }}
          >
            <img
              src="logos/google_icon.png"
              style={{ marginRight: 10, width: 15, height: 15 }}
            />
            <Link href="/auth/google" style={{ color: 'black' }}>
              {displayName} with Google
            </Link>
          </Button>
        </div>
        <div style={{ display: 'flex' }}>
          <hr
            style={{
              width: 130,
              borderColor: '#0C62C1',
              display: 'inline-block',
            }}
          />{' '}
          <span style={styles.fontBlue}>OR</span>
          <hr
            style={{
              width: 130,
              borderColor: '#0C62C1',
              display: 'inline-block',
            }}
          />
        </div>

        <div style={styles.bottom}>
          <form onSubmit={handleSubmit} name={name} style={styles.form}>
            <p style={styles.fontBlue}>{authMessage}</p>
            <span className="p-float-label">
              <InputText
                id="email"
                name="email"
                type="email"
                required
                style={styles.textInputs}
              />
              <label htmlFor="email">Email</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="password"
                name="password"
                type="password"
                required
                style={styles.textInputs}
              />
              <label htmlFor="password">Password</label>
            </span>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={styles.authButton}
              className={classes.submit}
            >
              {displayName}
            </Button>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
      </div>
    </section>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
