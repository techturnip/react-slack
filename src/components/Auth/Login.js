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

class Login extends React.Component {
  //-----------------------------------------------------|
  // STATE ----------------------------------------------|
  //=====================================================|
  state = {
    email: '', // set by email form value
    password: '', // set by password form value
    errors: [], // set by error handling fn's
    loading: false // handles submit btn loading state
  };
  //-----------------------------------------------------|
  // FORM VALIDATION ------------------------------------|
  //=====================================================|
  isFormValid = ({ email, password }) => email && password;
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
    if (this.isFormValid(this.state)) {
      // if valid:
      // empty errors arr and set loading state to true
      this.setState({ errors: [], loading: true });

      // send the form data to firebase for login
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };
  //-----------------------------------------------------|
  // RENDER ---------------------------------------------|
  //=====================================================|
  render() {
    // destructure state obj
    const { email, password, errors, loading } = this.state;
    // return JSX
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to TechChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
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

              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color="violet"
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
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

// export component
export default Login;
