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
  setPlayerId(state, payload: string) {
    state.playerId = payload;
    localStorage.setItem("playerId", payload);
  },
  setToken(state, payload: string) {
    state.token = payload;
    localStorage.setItem("token", payload);
  },
  setScore(state, payload: Number) {
    if (!!state.room && !!state.room.players) {
      for (let i = 0; i < state.room.players.length; i++) {
        if (state.room.players[i].id === state.playerId) {
          state.room.players[i].score = payload;
          break;
        }
      }
    }
  },
  // PLayer room
  setRoom(state, payload: RoomState) {
    if (payload !== null) {
      state.room = { ...state.room, ...payload };
      localStorage.setItem("room", JSON.stringify(state.room));
    } else {
      state.room = null;
    }
  },
  setTotalCardsCount(state, payload: Number) {
    state.room.totalCards = payload;
  },
  setDeckCardsCount(state, payload: Number) {
    state.room.deckCardsCount = payload;
  },
  setCurrentPlayer(state, payload: PlayerState) {
    state.room.currentPlayer = payload;
  }
};

export default mutations;
