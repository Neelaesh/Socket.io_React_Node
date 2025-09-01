import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Message = ({ username, text }: { username: string; text: string }) => {
  return (
    <Box className="message">
      <Typography className="message-username">{username}</Typography>
      <Typography className="message-text">{text}</Typography>
    </Box>
  );
};

export default Message;
