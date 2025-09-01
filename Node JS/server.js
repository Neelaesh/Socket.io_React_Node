const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const server = http.createServer(app);
// socket io is based on HTTP + Websocket(uses internally)
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

// Handle socket connections
io.on("connection", (socket) => {
  console.log("New user connected");

  // Listen for incoming messages
  socket.on("sendMessage", (message) => {
    console.log("Received message:", message);
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
