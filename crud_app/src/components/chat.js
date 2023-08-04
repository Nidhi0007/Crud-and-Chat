// Chat.js
import React, { useEffect, useState } from 'react';
import { socket } from '../socket';

const Chat = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() !== '') {
            socket.emit("roomMessage", inputValue, "nidhi")
            setInputValue('');
        }
    };
    useEffect(() => {
        socket.on("message", (data) => {

            setMessages(prevState => [...prevState, { text: data, sender: 'user' }])

        })

        return () => {
            socket.off('message'); // Unsubscribe when component unmounts
        };
    }, [messages])
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
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
