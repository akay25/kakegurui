// profile/getters.ts
import { GetterTree } from "vuex";
import { RoomState, RootState } from "./types";

const getters: GetterTree<any, RootState> = {
  // App configuration
  isLoading(state): Boolean {
    return state.isLoading;
  },
  // PLayer configuration
  playerId(state): String | null {
    return state.player !== null ? state.player.id : null;
  },
  name(state): string {
    return state.player !== null ? state.player.name : "";
  },
  profilePic(state): string {
    return state.player !== null ? state.player.profilePic : "1-5-7";
  },
  token(state): string | null {
    return state.player !== null ? state.player.token : null;
  },
  isOwner(state): Boolean {
    return state.player !== null ? state.player.owner : false;
  },
  score(state): Number {
    return state.player !== null ? state.owner : 0.0;
  },
  // Room status
  room(state): RoomState {
    return state.room !== null ? state.room : null;
  },
  roomName(state): String {
    return state.room !== null ? state.room.name : "";
  },
  isGameRunning(state): Boolean {
    return state.room !== null && state.room.status === "playing";
  }
};

export default getters;
