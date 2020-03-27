//=====================================================|
// IMPORTS ============================================|
//=====================================================|
// REACT IMPORTS --------------------------------------|
//-----------------------------------------------------|
import React from 'react';
//=====================================================|
// FIREBASE IMPORTS -----------------------------------|
//-----------------------------------------------------|
import firebase from '../../firebase';
//=====================================================|
// COMPONENTS IMPORTS ---------------------------------|
//-----------------------------------------------------|
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
//=====================================================|
// USER PANEL COMPONENT ===============================|
//=====================================================|
class UserPanel extends React.Component {
  //---------------------------------------------------|
  // SET DROPDOWN OPTIONS -----------------------------|
  //---------------------------------------------------|
  dropdownOptions = () => [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avater</span>
    },
    {
      key: 'signout',
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];
  //---------------------------------------------------|
  // EVENT HANDLERS -----------------------------------|
  //---------------------------------------------------|
  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out!'));
  };
  //---------------------------------------------------|

  render() {
    return (
      <Grid style={{ background: '#4c3c4c' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>TechChat</Header.Content>
            </Header>
          </Grid.Row>

          {/* User Dropdown */}
          <Header style={{ padding: '0.25em' }} as="h4" inverted>
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}
//=====================================================|
// EXPORT COMPONENT ===================================|
//=====================================================|
export default UserPanel;
//=====================================================|
