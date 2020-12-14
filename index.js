const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const cors = require('cors');
const {addUser, getUser, removeUser, getUsersByRoom} = require('./users.js')

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
                              cors: {
                              origin: "https://5fd50988c6f49c1241ce8ebd--confident-mestorf-9d6c62.netlify.app",
                              methods: ["GET", "POST"]
                            }
                          });

app.use(cors())
app.use(router);


io.on('connection', (socket) => {
  console.log("new connection");

  socket.on('join', ({name, room}, callback) => {
    const {error, user} = addUser({id : socket.id, name, room})
    if (error) return callback(error);
    else{
    socket.join(user.room)
    socket.emit('message', {user:"admin", text:`${user.name} welcome to ${user.room}`})
    socket.broadcast.to(user.room).emit('message', {user:"admin", text:`${user.name} has joined the chat`})

    io.to(user.room).emit('roomData', {room : user.room, users : getUsersByRoom(user.room)})
    callback();
    }
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
    io.to(user.room).emit("message", {user : user.name, text : message})
    }
    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if(user){
      socket.broadcast.to(user.room).emit('message', {user:"admin", text:`${user.name} has left the chat`})
      io.to(user.room).emit('roomData', {users : getUsersByRoom(user.room)})
    }
  })
});
server.listen(PORT, () => {console.log(`server has started on port ${PORT}`)});
