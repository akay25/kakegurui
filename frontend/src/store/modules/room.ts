import { Module } from "vuex";
// import { getters } from './getters';
// import { actions } from './actions';
// import { mutations } from './mutations';
import { RootState } from "../types";

interface RoomState {
  id: String | undefined;
  players: any;
  status: String;
  name: String;
}

export const state: RoomState | null = {
  id: undefined,
  name: "",
  players: [],
  status: "suspend"
};

export const room: Module<RoomState, RootState> = {
  state,
  getters: {},
  actions: {},
  mutations: {}
};
