import React from "react";

import Users from "../Users/Users"
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
import "./InfoBar.css"


const InfoBar = ({room, users}) => {
  return (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online image" />
      <h3> {room} </h3> {/*<Users id="users" users={users} room={room}/>*/}
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img className="closeIcon" src={closeIcon} alt="close image" /></a>
    </div>
  </div>
   );
}

export default InfoBar;
