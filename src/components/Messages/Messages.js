//=====================================================|
// REACT IMPORTS --------------------------------------|
//-----------------------------------------------------|
import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
//=====================================================|
// COLOR PANEL COMPONENT ==============================|
//=====================================================|
class Messages extends React.Component {
  render() {
    return (
      <>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">{/* Messages */}</Comment.Group>
        </Segment>

        <MessageForm />
      </>
    );
  }
}
//=====================================================|
// EXPORT COMPONENT ===================================|
//=====================================================|
export default Messages;
//=====================================================|
