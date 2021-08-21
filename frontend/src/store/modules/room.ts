import { Module } from "vuex";
// import { getters } from './getters';
// import { actions } from './actions';
// import { mutations } from './mutations';
import { PlayerState, RootState } from "../types";

interface RoomState {
  id: String | undefined;
  players: any;
  status: String;
  name: String;
  totalCards: Number;
  currentPlayer: PlayerState | null;
}

export const state: RoomState | null = {
  id: undefined,
  name: "",
  players: [],
  status: "suspend",
  totalCards: 0,
  currentPlayer: null
};

export const room: Module<RoomState, RootState> = {
  state,
  getters: {},
  actions: {},
  mutations: {}
};
