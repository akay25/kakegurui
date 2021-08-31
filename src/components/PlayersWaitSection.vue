<template>
  <div class="overlay-container" v-if="!isGameRunning">
    <div class="row">
      <input type="hidden" id="room-url" :value="roomShareURL" />
      <div class="flex md4 xs12">
        <br />
        <div>
          <p class="display-5 heading-font">Deck size: {{ deckSizeVal }}</p>
          <va-slider
            style="padding: 8px;"
            v-model="deckSizeVal"
            :step="10"
            :min="20"
            :max="100"
            color="#14213D"
            v-if="isOwner"
          />
        </div>
        <br />
        <va-select
          :options="themeOptions"
          v-model="theme"
          label="Theme"
          placeholder="Select theme"
          :clearable="false"
          :disabled="!isOwner"
        />
        <br />

        <va-button
          color="#fca311"
          @click="startGame"
          v-if="isOwner"
          :disabled="canStartGame"
        >
          Start Game
        </va-button>
        <br />
        <br />
        <va-button color="danger" @click="leaveGame">Leave Game</va-button>
      </div>
      <div class="flex md8 xs12" v-if="!!room">
        <div class="welcome-player-container">
          <va-popover
            v-for="player in getPlayers"
            :key="player.id"
            color="#14213D"
            :title="player.name"
            :message="`Score: ${player.score}`"
            placement="top"
          >
            <PlayerAvataar :profilePic="player.profilePic" :id="player.id" />
          </va-popover>
        </div>
        <p style="cursor: pointer;" @click="copyRoomURLToClipboard">
          Share this room {{ roomShareURL }}
          <va-icon
            class="icon-button"
            style="align-self: center;"
            name="fa fa-share"
            color="#FCA311"
            :size="20"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";
import axios from "@/api";
import PlayerAvataar from "./Player/Avataar.vue";
import { clearLocalStorage } from "@/utils";

export default {
  name: "PlayersWaitSection",
  components: { PlayerAvataar },
  data() {
    return {
      show: true,
      theme: "Pokemon",
      deckSizeVal: 20,
      themeOptions: []
    };
  },
  computed: {
    ...mapGetters([
      "isGameRunning",
      "isGameFinished",
      "deckSize",
      "room",
      "isOwner",
      "roomName",
      "playerId",
      "token"
    ]),
    roomShareURL() {
      if (!!this.room) {
        return window.location.href.replace("room/", "");
      }
      return "";
    },
    canStartGame() {
      return !!this.room && !!this.room.players && this.room.players.length < 2;
    },
    getPlayers() {
      if (!this.isGameFinished) {
        return this.room.players;
      }
      return _.orderBy(this.room.players, ["score"], ["desc"]);
    }
  },
  async created() {
    await this.loadThemes();
    this.deckSizeVal = this.deckSize;
  },
  sockets: {
    theme_updated: function(themeObj) {
      this.theme = themeObj;
    },
    deckSize_updated: function(deckSizeVal) {
      this.deckSizeVal = deckSizeVal;
    }
  },
  watch: {
    theme(newVal, oldVal) {
      if (newVal.id !== oldVal.id && this.isOwner) {
        this.$socket.emit("update_theme", newVal);
      }
    },
    deckSizeVal(newVal, oldVal) {
      if (newVal !== oldVal && this.isOwner) {
        this.$socket.emit("update_deckSize", newVal);
      }
    }
  },
  methods: {
    ...mapMutations(["setLoading"]),
    async loadThemes() {
      try {
        const { data } = await axios.get("/themes");
        this.themeOptions = data.map(e => {
          return { id: e.id, text: e.name };
        });
        if (this.themeOptions.length) {
          this.theme = this.themeOptions[0];
        }
      } catch (e) {
        console.log(e);
      }
    },
    async startGame() {
      this.setLoading(true);
      try {
        await axios.post(
          "/rooms/start-game",
          {
            roomName: this.roomName
          },
          {
            headers: {
              authorization: this.token
            }
          }
        );
      } catch (e) {
        if (!!e.response && !!e.response.data && !!e.response.data.message) {
          alert(e.response.data.message);
        } else {
          alert(`Failed to start game`);
        }
      }
      this.setLoading(false);
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
        this.$socket.emit("leave_room");
        clearLocalStorage();
        this.$router.push("/");
      } catch (e) {
        console.log(e);
        alert(`Failed to leave room`);
      }
      this.setLoading(false);
    },
    copyRoomURLToClipboard() {
      console.log(this.roomShareURL);
      const roomURLElement = document.querySelector("#room-url");
      roomURLElement.setAttribute("type", "text");
      roomURLElement.select();

      try {
        const msg = document.execCommand("copy")
          ? "Room URL copied"
          : "Failed to copy room url";

        this.$vaToast.init({
          message: msg,
          position: "top-right",
          color: "#14213D",
          customClass: "notification-text",
          closable: false,
          duration: 800
        });
      } catch (err) {
        this.$vaToast.init({
          message: "Oops, unable to copy",
          position: "top-right",
          color: "#ff0000",
          customClass: "notification-text",
          closable: false,
          duration: 800
        });
      }

      /* unselect the range */
      roomURLElement.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style lang="scss">
.overlay-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  overflow-y: none;
  overflow-x: none;
  background-color: rgba(20, 33, 61, 0.6);
  justify-content: center;
  align-items: center;
}
.overlay-container > .row {
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  margin: auto;
  margin-top: 80px;
  width: 80%;
  max-width: 600px;
  min-height: 300px;
  padding: 10px;
  box-shadow: rgba(59, 27, 58, 0.5) 0px 5px 15px 0px;
}
.welcome-player-container {
  min-height: 260px;
}

.icon-button {
  padding: 2px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid #ffffff;
  transition: all 0.4s;

  &:hover {
    border: 2px solid #fca311;
  }
}
</style>
