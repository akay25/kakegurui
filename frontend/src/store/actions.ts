import { ActionTree } from "vuex";
import { RootState, PlayerState } from "./types";

const actions: ActionTree<RootState, RootState> = {
  fetchData({ commit }): any {
    // axios({
    //   url: "https://...."
    // }).then(
    //   response => {
    //     const payload: User = response && response.data;
    //     commit("profileLoaded", payload);
    //   },
    //   error => {
    //     console.log(error);
    //     commit("profileError");
    //   }
    // );
  }
};

export default actions;
