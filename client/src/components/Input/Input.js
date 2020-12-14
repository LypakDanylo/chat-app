import React from "react";

import sendIcon from "../../icons/send.png"
import "./Input.css"

const Input = ({message, setMessage, sendMessage}) => {
  return(
  <form className="form">
    <input
      className="input"
      type = "text"
      placeholder = "Type a message"
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={(event) => sendMessage(event)}><img className="sendIcon" src={sendIcon}/></button>
  </form>
  )
}

export default Input;
