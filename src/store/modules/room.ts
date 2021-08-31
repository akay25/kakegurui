import { Module } from "vuex";
import { PlayerState, RootState } from "../types";

export interface RoomState {
  id: String | undefined;
  players: any;
  status: String;
  name: String;
  cover: String | null;
  currentPlayer: PlayerState | null;
  deckRange: Number;
  nextTurnTime: Date | null;
  selectedCard: Number;
  prevSelectedCard: Number;
  removedCardIndices: [Number] | [];
}

export const state: RoomState | null = {
  id: undefined,
  name: "",
  cover: null,
  players: [],
  status: "suspend",
  nextTurnTime: null,
  currentPlayer: null,
  deckRange: 0,
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
