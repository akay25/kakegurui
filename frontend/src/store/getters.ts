// profile/getters.ts
//@ts-ignore
import _ from "lodash";
import { GetterTree } from "vuex";
import { PlayerState, RoomState, RootState } from "./types";

const getters: GetterTree<any, RootState> = {
  // App configuration
  isLoading(state): Boolean {
    return state.isLoading;
  },
  // PLayer configuration
  playerId(state): String | null {
    return state.playerId;
  },
  name(state): string {
    if (!!state.room && !!state.room.players) {
      const player = _.find(
        state.room.players,
        (p: any) => p.id === state.playerId
      );
      if (!!player) return player.name;
    }
    return "";
  },
  profilePic(state): string {
    if (!!state.room && !!state.room.players) {
      const player = _.find(
        state.room.players,
        (p: any) => p.id === state.playerId
      );
      if (!!player) return player.profilePic;
    }
    return "";
  },
  token(state): string | null {
    if (!state.token) return localStorage.getItem("token");
    return state.token;
  },
  isOwner(state): Boolean {
    if (!!state.room && !!state.room.players) {
      const player = _.find(
        state.room.players,
        (p: any) => p.id === state.playerId
      );
      if (!!player) return player.owner;
    }
    return false;
  },
  score(state): Number {
    if (!!state.room && !!state.room.players) {
      const player = _.find(
        state.room.players,
        (p: any) => p.id === state.playerId
      );
      if (!!player) return player.score;
    }
    return 0.0;
  },
  // Room status
  room(state): RoomState {
    return state.room !== null ? state.room : null;
  },
  roomName(state): String {
    return state.room !== null ? state.room.name : "";
  },
  currentPlayer(state): PlayerState {
    return state.room.currentPlayer;
  },
  isGameRunning(state): Boolean {
    return state.room !== null && state.room.status === "playing";
  },
  nextTurnTimestamp(state): Number {
    if (state.room.nextTurnTime) {
      return new Date(state.room.nextTurnTime).getTime() / 1000;
    }
    return 0;
  },
  totalCardsCount(state): Number {
    return state.room.totalCards;
  },
  deckSize(state): Number {
    return !!state.room ? state.room.deckCardsCount : 0;
  },
  deckCards(state): number[] {
    const tempCardsArray = [];
    const size = !!state.room ? state.room.deckCardsCount : 0;
    for (let i = 0; i < state.room.deckCardsCount; i++) {
      if (!state.room.removedCardIndices.includes(i)) {
        tempCardsArray.push(i);
      }
    }
    return tempCardsArray;
  },
  isCurrentTurnMine(state): Boolean {
    if (!state.room.currentPlayer) return false;
    return state.room.currentPlayer.id === state.playerId;
  },
  prevSelectedCard(state): Number {
    return state.room.prevSelectedCard;
  },
  selectedCard(state): Number {
    return state.room.selectedCard;
  }
};

export default getters;
