import React, { FC, useEffect, useState } from "react";
import io from "socket.io-client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const socket = io("http://localhost:5000");

import Message from "../Message/Message";
import "./Messages.css";

interface Message {
  username: string;
  text: string;
}

const Messages: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>("");

  useEffect(() => {
    // Socket event listener for incoming messages
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", { text: messageText });
    setMessageText("");
  };

  return (
    <Box className="message-box">
      <Typography variant="h4">Real-Time Notifications</Typography>
      <Box className="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            username={message.username}
            text={message.text}
          />
        ))}
      </Box>
      <Box className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </Box>
    </Box>
  );
};

export default Messages;
