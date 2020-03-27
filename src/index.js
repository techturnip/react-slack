import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(() => {}, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    // setup listener for Auth to push user from Auth flow
    // to the application root
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // setUser(user);
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

// Wrap Root with withRouter HOC for access to history.push
// inside of the component lifecycle method componentDidMount()
const RootWithAuth = withRouter(Root);

// Wrap the HOC in Router inside of the render
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
