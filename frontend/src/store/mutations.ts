// modules/app mutations
import { MutationTree } from "vuex";
import { RootState, PlayerState, RoomState } from "./types";

export const mutations: MutationTree<any> = {
  // App configuration
  updateSidebarCollapsedState(state, payload: Boolean) {
    state.isSidebarMinimized = payload;
  },
  setLoading(state, payload: Boolean) {
    state.isLoading = payload;
  },
  // Player info
  setPlayer(state, payload: PlayerState) {
    if (payload !== null) {
      state.player = { ...state.player, ...payload };
      localStorage.setItem("player", JSON.stringify(state.player));
    } else {
      state.player = null;
    }
  },
  setToken(state, payload: String) {
    state.player.token = payload;
    localStorage.setItem("player", JSON.stringify(state.player));
  },
  // PLayer room
  setRoom(state, payload: RoomState) {
    if (payload !== null) {
      state.room = { ...state.room, ...payload };
      localStorage.setItem("room", JSON.stringify(state.room));
    } else {
      state.room = null;
    }
  }
};

export default mutations;
