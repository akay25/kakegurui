<template>
  <va-sidebar
    :width="width"
    :minimized="minimized"
    :minimizedWidth="minimizedWidth"
  >
    <div class="row">
      <div class="xs2">
        <h1 class="display-1 heading-font" style="margin: 10px; width: 100%;">
          Score
        </h1>
      </div>
    </div>
    <div class="row container">
      <filp-number :value="score" :speed="600" :digitCount="2" />
    </div>
    <div class="row">
      <div class="xs2">
        <h1 class="display-1 heading-font" style="margin: 10px; width: 100%;">
          Players
        </h1>
      </div>
    </div>
    <div class="row player-container" v-if="!!room && !!room.players">
      <Player
        v-for="player in room.players"
        :key="player.id"
        :player="player"
      />
    </div>
    <div class="leave-game-button-holder">
      <va-button size="large" icon="close" color="danger" @click="leaveGame"
        >Leave Game</va-button
      >
    </div>
  </va-sidebar>
</template>

<script>
import { useGlobalConfig } from "vuestic-ui";
import axios from "@/api";
import { clearLocalStorage } from "@/utils";
import FilpNumber from "@/components/FlipNumber";
import Player from "./Player";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "room-sidebar",
  components: {
    FilpNumber,
    Player
  },
  props: {
    width: { type: String, default: "16rem" },
    color: { type: String, default: "secondary" },
    minimized: { type: Boolean, required: true },
    minimizedWidth: {
      type: Boolean,
      required: false,
      default: undefined
    }
  },
  computed: {
    computedClass() {
      return {
        "app-sidebar--minimized": this.minimized
      };
    },
    colors() {
      return useGlobalConfig().getGlobalConfig().colors;
    },
    ...mapGetters([
      "isLoading",
      "playerId",
      "roomName",
      "token",
      "score",
      "room"
    ])
  },
  sockets: {
    set_score: function(score) {
      this.setScore(score);
    }
  },
  methods: {
    ...mapMutations(["setLoading", "setScore"]),
    leaveRoom() {
      this.$socket.emit("leave_room");
    },
    async leaveGame() {
      this.setLoading(true);
      try {
        const { data } = await axios.post(
          `/rooms/leave`,
          {
            roomName: this.roomName,
            playerId: this.playerId
          },
          {
            headers: {
              authorization: this.token
            }
          }
        );
        this.setLoading(false);
        this.leaveRoom();
        clearLocalStorage();
        this.$router.push("/");
      } catch (e) {
        console.log(e);
        alert(`Failed to leave room`);
      }
      this.setLoading(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container > * {
  margin: 10px;
}
</style>

<style lang="scss">
.player-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.leave-game-button-holder {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
}

.va-sidebar {
  flex-shrink: 0;
  box-shadow: 3px 1px 12px -7px rgba(0, 0, 0, 0.74);
  -webkit-box-shadow: 3px 1px 12px -7px rgba(0, 0, 0, 0.74);
  -moz-box-shadow: 3px 1px 12px -7px rgba(0, 0, 0, 0.74);

  .va-collapse__body {
    margin-top: 0 !important;
  }

  &__menu {
    padding: 2rem 0;
    &__inner {
      padding-bottom: 8rem;
    }
  }

  &-item {
    &-content {
      padding: 0.75rem 1rem;
    }

    &__icon {
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
