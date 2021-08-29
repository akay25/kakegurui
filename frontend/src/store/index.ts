import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import modules from "./modules";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const store: StoreOptions<RootState> = {
  state: {
    strict: true,
    version: "1.0.0", // a simple property
    isSidebarMinimized: false,
    isLoading: false,
    //@ts-ignore
    token: null,
    playerId: ""
  },
  modules: {
    ...modules
  },
  mutations,
  actions,
  getters
};

export default new Vuex.Store<RootState>(store);
