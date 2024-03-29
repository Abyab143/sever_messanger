import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
app.use(cors());

// Socket.io server setup
const io = new Server(server, {
 cors: {
    origin: "https://messanger-frontend-lemon.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected..", socket.id);
  });
});

server.listen(1000, () => {
  console.log("server listening on port number 1000");
});
