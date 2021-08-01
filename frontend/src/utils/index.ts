import store from "@/store";

export const loadFromLocalStorage = () => {
  const roomStr = localStorage.getItem("room");
  if (roomStr !== null) {
    const room = JSON.parse(roomStr);
    store.commit("setRoom", room);
  }

  const playerStr = localStorage.getItem("player");
  if (playerStr !== null) {
    const player = JSON.parse(playerStr);
    store.commit("setPlayer", player);
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem("player");
  localStorage.removeItem("room");
  store.commit("setRoom", null);
  store.commit("setPlayer", null);
};
