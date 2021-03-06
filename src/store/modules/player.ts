import { Module } from "vuex";
// import { getters } from './getters';
// import { actions } from './actions';
// import { mutations } from './mutations';
import { RootState } from "../types";

interface PlayerState {
  id: String | undefined;
  name: string;
  profilePic: string;
  score: Number;
  owner: Boolean;
  token: String | null;
}

export const state: PlayerState | null = {
  id: undefined,
  name: "",
  profilePic: "1-5-7",
  score: 0.0,
  owner: false,
  token: null
};

export const player: Module<PlayerState, RootState> = {
  state,
  getters: {},
  actions: {},
  mutations: {}
};
