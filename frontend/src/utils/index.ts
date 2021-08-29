import store from "@/store";

export const loadFromLocalStorage = () => {
  const roomStr = localStorage.getItem("room");
  if (roomStr !== null) {
    const room = JSON.parse(roomStr);
    store.commit("setRoom", room);
  }

  const token = localStorage.getItem("token");
  if (token !== null) {
    store.commit("setToken", token);
  }

  const playerId = localStorage.getItem("playerId");
  if (playerId !== null) {
    store.commit("setPlayerId", playerId);
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("room");
  localStorage.removeItem("playerId");
  store.commit("setRoom", null);
};
