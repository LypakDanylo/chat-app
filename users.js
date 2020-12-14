const users = [];

const addUser = ({id, name, room}) => {
  name.trim().toLowerCase();
  room.trim().toLowerCase();

  const ExistingUser = users.find((user) => user.room === room && user.name === name);
  if (ExistingUser) return {error : "Username already exists, please choose another one"};

  const user = {id, name, room};
  users.push(user);
  return {user};
}

const getUser = (id) => users.find((user) => user.id === id)

const removeUser = (id) => {
  const index = getUser(id)
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getUsersByRoom = (room) => users.filter((user) => user.room === room)

module.exports = {addUser, getUser, removeUser, getUsersByRoom};
