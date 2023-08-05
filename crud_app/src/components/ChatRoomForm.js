import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { socket } from "../socket";
import { Link, useNavigate } from "react-router-dom";
function ChatRoomForm() {
  const [room, setroom] = useState("");

  // Using useNavigation for redirecting to pages
  let history = useNavigate();
  const joinRoom = () => {
    socket.emit("joinChat", room);
    history("/chat");
  };
  useEffect(() => {
    socket.connect();
  }, []);
  return (
    <>
      <h1>Add Room Name</h1>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Room Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="room name"
              onChange={(e) => setroom(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" onClick={joinRoom}>
          Join
        </Button>{" "}
        <Link to="/home">
          <Button variant="primary">Home</Button>
        </Link>
      </Form>
    </>
  );
}

export default ChatRoomForm;
