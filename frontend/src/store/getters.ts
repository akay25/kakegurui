// profile/getters.ts
import { GetterTree } from "vuex";
import { RootState } from "./types";

const getters: GetterTree<any, RootState> = {
  // App configuration
  isLoading(state): Boolean {
    return state.isLoading;
  },
  // PLayer configuration
  playerId(state): String | undefined {
    return state.player.id;
  },
  name(state): string {
    return state.player.name;
  },
  profilePic(state): string {
    return state.player.profilePic;
  },
  token(state): string {
    return state.player.token;
  },
  isOwner(state): Boolean {
    return state.player.owner;
  },
  score(state): Number {
    return state.player.score;
  },
  roomName(state): String {
    return state.room.name;
  }
};

export default getters;
