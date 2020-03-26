import React from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

class Register extends React.Component {
  //-----------------------------------------------------|
  // STATE ----------------------------------------------|
  //=====================================================|
  state = {
    username: '', // username form value
    email: '', // set by email form value
    password: '', // set by password form value
    passwordConfirmation: '', // set by passwordConf.. form value
    errors: [], // set by error handling fn's
    loading: false, // handles submit btn loading state
    usersRef: firebase.database().ref('users') // stores db reference to the users table
  };
  //-----------------------------------------------------|
  // FORM VALIDATION ------------------------------------|
  //=====================================================|
  // Validate Form w/ Error Handling
  isFormValid = () => {
    // initialize an errors array
    let errors = [];
    // initialize error var for error messages
    let error;

    // checks if the form is empty
    if (this.isFormEmpty(this.state)) {
      // if form is empty then:
      // set error message
      error = { message: 'Fill in all fields' };
      // set error state by concatenating the error msg
      // onto the errors []
      this.setState({ errors: errors.concat(error) });
      // return false
      return false;

      // check if password is valid
    } else if (!this.isPasswordValid(this.state)) {
      // set error message
      error = { message: 'Password is invalid' };
      // set error state by concatenating the error msg
      // onto the errors []
      this.setState({ errors: errors.concat(error) });
      // return false
      return false;
    } else {
      return true;
    }
  };
  //-----------------------------------------------------|
  // Empty Form Check
  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    // if len === 0 for any of the conditions, return true
    // confirming that there is an empty field in the form
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  //-----------------------------------------------------|
  // Password Validation Check
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      // password & confirmation must be at least 6 chars
      // return false if condition not met
      return false;
    } else if (password !== passwordConfirmation) {
      // password must match the confirmation
      // return false if condition not met
      return false;
    } else {
      // password & confirmation are at least 6 chars & matching
      // return true - password is valid
      return true;
    }
  };
  //-----------------------------------------------------|
  // ERROR HANDLERS -------------------------------------|
  //=====================================================|
  // Display Errors
  // Desc: fn maps the errors array, displaying <p> tags that
  // contain the error messages.
  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  //-----------------------------------------------------|
  // Apply Input Error Class
  // Desc: fn conditionally applies the error class to the
  // corresponding input field in the event an error is thrown
  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? 'error'
      : '';
  };
  //-----------------------------------------------------|
  // EVENT HANDLERS -------------------------------------|
  //=====================================================|
  // Change Handler
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  //-----------------------------------------------------|
  // Submit Handler
  handleSubmit = event => {
    // prevent default submit btn behavior
    event.preventDefault();

    // check if the form is valid
    if (this.isFormValid()) {
      // if valid:
      // empty errors arr and set loading state to true
      this.setState({ errors: [], loading: true });

      // send the form data to firebase for registration
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password) // create user with email and pwd
        .then(createdUser => {
          // if user creation succeeds:
          console.log(createdUser);

          // call updateProfile passing the username to displayName
          // and generating a gravatar img
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              // if update profile succeeds:
              // save user
              this.saveUser(createdUser).then(() => {
                // if save user succeeds:
                console.log('user saved');
              });
            })
            .catch(err => {
              // catch error if update profile fails
              console.error(err);

              // update state, passing in the err message to
              // errors [] and setting loading to false
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch(err => {
          // catch error if create user fails
          console.error(err);
          // update state, passing in the err message to
          // errors [] and setting loading to false
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };
  //-----------------------------------------------------|
  // Helper function to save the user
  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };
  //-----------------------------------------------------|
  // RENDER ---------------------------------------------|
  //=====================================================|
  render() {
    // destructure state obj
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;
    // return JSX
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for TechChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                className={this.handleInputError(errors, 'username')}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, 'email')}
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, 'password')}
                type="password"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, 'password')}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a User? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

// export component
export default Register;
