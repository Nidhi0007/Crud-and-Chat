// Chat.js
import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    const room = localStorage.getItem("room");
    console.log(room)
    event.preventDefault();
    if (inputValue.trim() !== "") {
      socket.emit("roomMessage", inputValue, room);
      setInputValue("");
    }
  };
  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prevState) => [
        ...prevState,
        { text: data, sender: "user" },
      ]);
    });
    return () => {
      socket.off("message"); // Unsubscribe when component unmounts
    };
  }, [messages]);
  return (
    <div className="chat-container">
      <h1>Chat Screen</h1>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>

      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <div>
          <Button style={{ margin: "1rem" }} type="submit">
            Send
          </Button>
          <Link to="/room">
            <Button style={{ margin: "1rem" }}>Back</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Chat;
