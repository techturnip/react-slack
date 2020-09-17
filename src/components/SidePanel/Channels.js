//=====================================================|
// IMPORTS ============================================|
//=====================================================|
// REACT IMPORTS --------------------------------------|
//-----------------------------------------------------|
import React from "react";
//=====================================================|
// FIREBASE IMPORTS -----------------------------------|
//-----------------------------------------------------|
import firebase from "../../firebase";
//=====================================================|
// REDUX IMPORTS --------------------------------------|
//-----------------------------------------------------|
import { connect } from "react-redux";
import { setCurrentChannel } from "../../actions";
//=====================================================|
// COMPONENTS IMPORTS ---------------------------------|
//-----------------------------------------------------|
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
//=====================================================|
// CHANNEL COMPONENT ==================================|
//=====================================================|
class Channels extends React.Component {
  //---------------------------------------------------|
  // COMPONENT STATE ----------------------------------|
  //---------------------------------------------------|
  state = {
    activeChannel: "",
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    firstLoad: true,
  };
  //---------------------------------------------------|
  // COMPONENT METHODS --------------------------------|
  //---------------------------------------------------|
  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });
  //---------------------------------------------------|
  // HANDLER METHODS ----------------------------------|
  //---------------------------------------------------|
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  //---------------------------------------------------|
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };
  //---------------------------------------------------|

  changeChannel = (channel) => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
  };
  //---------------------------------------------------|
  setActiveChannel = (channel) => {
    this.setState({ activeChannel: channel.id });
  };
  //---------------------------------------------------|
  displayChannels = (channels) =>
    channels.length > 0 &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));
  //---------------------------------------------------|
  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;
  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];

    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }

    this.setState({ firstLoad: false });
  };
  //---------------------------------------------------|
  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //---------------------------------------------------|
  // LIFECYCLE METHODS --------------------------------|
  //---------------------------------------------------|
  componentDidMount() {
    this.addListeners();
  }
  //---------------------------------------------------|
  componentWillUnmount() {
    this.removeListeners();
  }
  //---------------------------------------------------|
  // LISTENER METHODS ---------------------------------|
  //---------------------------------------------------|
  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };
  //---------------------------------------------------|
  removeListeners = () => {
    this.state.channelsRef.off();
  };
  //---------------------------------------------------|
  render() {
    const { channels, modal } = this.state;

    return (
      <>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  style={{ marginBottom: "1em" }}
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default connect(null, { setCurrentChannel })(Channels);
