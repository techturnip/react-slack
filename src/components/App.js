//=====================================================|
// IMPORTS ============================================|
//=====================================================|
// REACT IMPORTS --------------------------------------|
//-----------------------------------------------------|
import React, { Component } from 'react';
//=====================================================|
// COMPONENTS IMPORTS ---------------------------------|
//-----------------------------------------------------|
import { Grid } from 'semantic-ui-react';
import ColorPanel from './ColorPanel/ColorPanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import SidePanel from './SidePanel/SidePanel';
//=====================================================|
// STYLE IMPORTS --------------------------------------|
//-----------------------------------------------------|
import './App.css';
//=====================================================|
// APP COMPONENT ======================================|
//=====================================================|
class App extends Component {
  render() {
    return (
      <Grid columns="equal" className="app" style={{ background: '#eee' }}>
        <ColorPanel />
        <SidePanel />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
    );
  }
}
//=====================================================|
// EXPORT COMPONENT ===================================|
//=====================================================|
export default App;
//=====================================================|
