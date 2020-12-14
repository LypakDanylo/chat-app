import React from "react";
import ReactEmoji from "react-emoji";

import "./Message.css"

const Message = ({message : {user, text}, name}) => {
  let isSentByYourself = false;
  const trimmed = name.trim().toLowerCase();
  if (user === trimmed) {
    isSentByYourself = true;
  }
  return (
  isSentByYourself ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText">{trimmed}</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
  )
  : (
      <div className="messageContainer justifyStart  ">
        <p className="sentText">{user}</p>
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
  ));
}

export default Message;
