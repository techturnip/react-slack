//=====================================================|
// IMPORTS ============================================|
//=====================================================|
// REACT IMPORTS --------------------------------------|
//-----------------------------------------------------|
import React from "react";
//=====================================================|
// COMPONENTS IMPORTS ---------------------------------|
//-----------------------------------------------------|
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
//=====================================================|
// SIDE PANEL COMPONENT ===============================|
//=====================================================|
class SidePanel extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser} />
      </Menu>
    );
  }
}
//=====================================================|
// EXPORT COMPONENT ===================================|
//=====================================================|
export default SidePanel;
//=====================================================|
