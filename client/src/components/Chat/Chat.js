import React, {useState, useEffect} from "react";
import queryString from "query-string";
import io from 'socket.io-client';

import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
import "./Chat.css"

let socket;

const Chat = ({location}) => {

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const ENDPOINT = 'https://react-chatsite.herokuapp.com/';

  useEffect(() => {
    const {name, room} = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, (error) => {
      if(error) {
        window.location.replace("/");
        alert(error);
      }
    })

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [location.search, ENDPOINT]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
    socket.on('roomData', ({room, users}) => {
      setUsers(users);
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();
    if (message){
    socket.emit("sendMessage", message, () => setMessage(""))
    }
  }
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} users={users}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  )
};

export default Chat;
