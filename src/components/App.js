//=====================================================|
// IMPORTS ============================================|
//=====================================================|
// REACT IMPORTS --------------------------------------|
//-----------------------------------------------------|
import React from "react";
//=====================================================|
// REDUX IMPORTS --------------------------------------|
//-----------------------------------------------------|
import { connect } from "react-redux";
//=====================================================|
// COMPONENTS IMPORTS ---------------------------------|
//-----------------------------------------------------|
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import SidePanel from "./SidePanel/SidePanel";
//=====================================================|
// STYLE IMPORTS --------------------------------------|
//-----------------------------------------------------|
import "./App.css";
//=====================================================|
// APP COMPONENT ======================================|
//=====================================================|
const App = ({ currentUser, currentChannel }) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);
//=====================================================|
// MAP STATE TO PROPS =================================|
//=====================================================|
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
});
//=====================================================|
// EXPORT COMPONENT ===================================|
//=====================================================|
export default connect(mapStateToProps)(App);
//=====================================================|
