// modules/app mutations
import { MutationTree } from "vuex";
import { RootState } from "./types";

export const mutations: MutationTree<RootState> = {
  setLoading(state, payload: Boolean) {
    state.isLoading = payload;
  },
  updateSidebarCollapsedState(state, payload: Boolean) {
    state.isSidebarMinimized = payload;
  }
};

export default mutations;
