import React from "react";

import "./Users.css"

const Users = ({room, users}) => {
  return (
  <div className="usersOuterContainer">
    {users.map((user) =>
      <div className="userContainer" key={user.id}>
        <p className="userName">
          {user.name}
        </p>
      </div>)}
  </div>
   );
}

export default Users;
