import { Module } from "vuex";
import { PlayerState, RootState } from "../types";

export interface RoomState {
  id: String | undefined;
  players: any;
  status: String;
  name: String;
  totalCards: Number;
  currentPlayer: PlayerState | null;
  deckCardsCount: Number;
  nextTurnTime: Date | null;
  selectedCard: Number;
  prevSelectedCard: Number;
  removedCardIndices: [Number] | [];
}

export const state: RoomState | null = {
  id: undefined,
  name: "",
  players: [],
  status: "suspend",
  totalCards: 0,
  nextTurnTime: null,
  currentPlayer: null,
  deckCardsCount: 0,
  selectedCard: -1,
  prevSelectedCard: -1,
  removedCardIndices: []
};

export const room: Module<RoomState, RootState> = {
  state,
  getters: {},
  actions: {},
  mutations: {}
};
