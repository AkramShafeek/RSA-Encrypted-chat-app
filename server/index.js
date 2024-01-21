require('dotenv').config();
const express = require('express');
const { Server } = require('socket.io');
const app = express();
const ShortUniqueId = require('short-unique-id');

app.get("/", (req, res) => {
  res.send("Hello world")
})

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, ['localhost', '192.168.43.215'], () => console.log(`Server is listening on port ${PORT}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*'
  },
});

io.on("connection", (socket) => {
  let interval;

  console.log("Client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  })

  socket.on("create room", () => {
    const uid = new ShortUniqueId({ length: 6 });
    const roomid = uid.rnd();
    console.log(roomid);
    socket.emit("roomid", roomid);
  })

  socket.on("syn username", (roomid, username) => {
    socket.in(roomid).emit("syn username", username);
  })

  socket.on("ack username", (roomid, username) => {
    socket.in(roomid).emit("ack username", username);
  })

  socket.on("fin username", (roomid) => {
    socket.in(roomid).emit("fin username");
  })

  socket.on("message", (roomid, message) => {
    console.log("Received message " + message.message + " from " + roomid)
    socket.in(roomid).emit("message", message);
  })

  socket.on("join room", (roomid) => {
    console.log("Joined room " + roomid);
    socket.join(roomid);
  })

  socket.on("username", (roomid, username) => {
    socket.in(roomid).emit("username", username);
  })

  socket.on("leave room", (roomid) => {
    console.log("Leaving room " + roomid);
    socket.leave(roomid);
    clearInterval(interval);
  })
})
