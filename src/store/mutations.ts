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
  setPlayerScore(state, payload: { index: any; score: Number }) {
    if (!!state.room && !!state.room.players) {
      if (payload.index >= 0 && payload.index < state.room.players.length) {
        state.room.players[payload.index].score = payload.score;
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
  setRemovedCards(state, payload: Number[]) {
    state.room.removedCardIndices = payload;
  },
  setdeckRange(state, payload: Number) {
    state.room.deckRange = payload;
  },
  setCurrentPlayer(state, payload: PlayerState) {
    state.room.currentPlayer = payload;
  }
};

export default mutations;
