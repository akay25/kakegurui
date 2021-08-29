// profile/getters.ts
import { GetterTree } from "vuex";
import { PlayerState, RoomState, RootState } from "./types";

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
    return state.player !== null ? state.player.score : 0.0;
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
    return state.room.deckCardsCount;
  },
  deckCards(state): number[] {
    const tempCardsArray = [];
    for (let i = 0; i < state.room.deckCardsCount; i++) {
      if (!state.room.removedCardIndices.includes(i)) {
        tempCardsArray.push(i);
      }
    }
    return tempCardsArray;
  },
  isCurrentTurnMine(state): Boolean {
    if (!state.room.currentPlayer) return false;
    return state.room.currentPlayer.id === state.player.id;
  },
  prevSelectedCard(state): Number {
    return state.room.prevSelectedCard;
  },
  selectedCard(state): Number {
    return state.room.selectedCard;
  }
};

export default getters;
