import { Module } from "vuex";
// import { getters } from './getters';
// import { actions } from './actions';
// import { mutations } from './mutations';
import { RootState } from "../types";

interface RoomState {
  id: String | undefined;
  name: string;
  profilePic: string;
  score: Number;
  owner: Boolean;
}

export const state: RoomState | null = {
  id: undefined,
  name: "",
  profilePic: "1-5-7",
  score: 0.0,
  owner: false
};

export const room: Module<RoomState, RootState> = {
  state,
  getters: {},
  actions: {},
  mutations: {}
};
