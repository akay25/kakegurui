export const saveDetails = (player, room, token) => {
  localStorage.setItem("room", JSON.stringify(room));
  localStorage.setItem("player", JSON.stringify(player));
  localStorage.setItem("roomID", room.id);
  localStorage.setItem("isRoomOwner", player.owner);
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!!token) {
    return token;
  }
  return null;
};

export const isRoomOwner = () => {
  const isRoomOwner = localStorage.getItem("isRoomOwner");
  return !!JSON.parse(isRoomOwner);
};

export const getRoomID = () => {
  const roomID = localStorage.getItem("roomID");
  if (!!roomID) {
    return roomID;
  }
  return null;
};

export const getRoom = () => {
  const room = localStorage.getItem("room");
  if (!!room) {
    return JSON.parse(room);
  }
  return null;
};

export const getPlayer = () => {
  const player = localStorage.getItem("player");
  if (!!player) {
    return JSON.parse(player);
  }
  return null;
};
