//=====================================================|
// IMPORTS ============================================|
//=====================================================|
// REACT IMPORTS --------------------------------------|
//-----------------------------------------------------|
import React from 'react';
import ReactDOM from 'react-dom';
//=====================================================|
// COMPONENTS IMPORTS ---------------------------------|
//-----------------------------------------------------|
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
//=====================================================|
// MISC IMPORTS ---------------------------------------|
//-----------------------------------------------------|
import registerServiceWorker from './registerServiceWorker';
//=====================================================|
// STYLE IMPORTS --------------------------------------|
//-----------------------------------------------------|
import 'semantic-ui-css/semantic.min.css';
//=====================================================|
// FIREBASE IMPORTS -----------------------------------|
//-----------------------------------------------------|
import firebase from './firebase';
//=====================================================|
// ROUTER IMPORTS -------------------------------------|
//-----------------------------------------------------|
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
//=====================================================|
// REDUX IMPORTS --------------------------------------|
//-----------------------------------------------------|
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setUser } from './actions';
//=====================================================|
// SETUP STORE ========================================|
//=====================================================|
const store = createStore(rootReducer, composeWithDevTools());
//=====================================================|
// SETUP ROOT COMPONENT ===============================|
//=====================================================|
class Root extends React.Component {
  componentDidMount() {
    // setup listener for Auth to push user from Auth flow
    // to the application root if logged in
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}
//=====================================================|
// SETUP ROUTER HOC ===================================|
//=====================================================|
// Wrap Root with withRouter HOC for access to history.push
// inside of the component lifecycle method componentDidMount()
const RootWithAuth = withRouter(connect(null, { setUser })(Root));
//=====================================================|
// RENDER APP =========================================|
//=====================================================|
// Wrap the HOC in Router inside of the render
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);
//=====================================================|
registerServiceWorker();
