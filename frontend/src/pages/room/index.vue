<template>
  <div class="flex">
    <div class="board-container">
      <div class="row">
        <div class="flex xs12">
          <va-progress-bar
            :modelValue="timeProgress"
            :color="isCurrentTurnMine ? '#fca311' : '#e5e5e5'"
          ></va-progress-bar>
        </div>
      </div>
      <board :cover="cover" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";
import Board from "@/components/Board.vue";
import axios from "@/api";
import { clearLocalStorage } from "@/utils";
import MAX_WAIT_TIME from "@/data/wait-time";

export default {
  name: "room",
  components: {
    Board
  },
  data() {
    return {
      roomID: this.$route.params.roomID,
      timeProgress: 100,
      // This will changed on given type of card
      cover: "https://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png",
      timerInterval: null
    };
  },
  computed: {
    ...mapGetters([
      "token",
      "isGameRunning",
      "room",
      "totalCardsCount",
      "isCurrentTurnMine",
      "nextTurnTimestamp",
      "currentPlayer",
      "playerId"
    ]),
    socketConnected() {
      return this.$socket.connected;
    }
  },
  async created() {
    if (!this.token) {
      clearLocalStorage();
      this.$router.push("/");
    }

    const validRoomID = await this.validateRoomID(this.roomID);
    console.log(validRoomID, this.roomID, this.token);
    if (!validRoomID) {
      alert("Invalid room ID");
      clearLocalStorage();
      this.$router.push("/");
    }
  },
  sockets: {
    connect: function() {
      console.log("Socket connected");
      this.askToJoinRoom();
    },
    connect_error: function(err) {
      if (err instanceof Error) {
        console.log(err);
        if (content in err.data && !!err.data.content) alert(err.data.content);
        clearLocalStorage();
        this.$router.push("/");
      }
    },
    room_updated: function(room) {
      this.setRoom({ players: room.players });
    },
    room_joined: function() {
      console.log("room joined here");
    },
    room_left: function() {
      console.log("I left the room");
    },
    game_started: function(data) {
      this.setTotalCardsCount(data.totalCards);
      this.setCurrentPlayer(data.player);
      this.setRoom({
        status: "playing",
        deckCardsCount: data.deckRange,
        removedCardIndices: data.removedCardIndices
      });
    },
    invalid_player_request: function(message) {
      console.log(message);
    },
    switch_player(after_secs) {
      setTimeout(() => {
        this.$socket.emit("switch_turn");
      }, after_secs * 1000);
    },
    player_changed: function({ player, nextTurnTime }) {
      if (!!player) {
        this.setRoom({ nextTurnTime });
        this.setCurrentPlayer(player);
        // if (this.timerInterval) clearInterval(this.timerInterval);
        // this.timerInterval = setInterval(this.setTimeProgress, 1000);

        // Notify user for turn
        this.$vaToast.init({
          message: `It's ${
            this.isCurrentTurnMine ? "your" : player.name + "'s"
          } turn`,
          position: "top-right",
          duration: 800
        });
      } else {
        console.log("Got invalid player for player in room");
      }
    }
  },
  mounted() {
    if (!!this.$socket.io.opts.extraHeaders.authorization) {
      this.$socket.connect();
    }

    if (this.isGameRunning) {
      // if (this.timerInterval) clearInterval(this.timerInterval);
      // this.timerInterval = setInterval(this.setTimeProgress, 1000);
    }
  },
  methods: {
    ...mapMutations([
      "setLoading",
      "setRoom",
      "setPlayer",
      "setTotalCardsCount",
      "setCurrentPlayer"
    ]),
    async validateRoomID(roomID) {
      this.setLoading(true);
      try {
        const response = await axios(`/rooms/${roomID}`);
        this.setRoom(response.data);

        const player = _.find(
          response.data.players,
          p => p.id === this.playerId
        );
        if (!!player) {
          this.setPlayer(player);
        }

        if (response.data.status === "playing") {
          this.setCurrentPlayer(
            response.data.players[response.data.currentPlayer]
          );
        }
        this.setLoading(false);
        return response.data.name === this.roomID;
      } catch (e) {
        console.log(e);
      }
      this.setLoading(false);
      return false;
    },
    askToJoinRoom() {
      this.$socket.emit("join_room");
    },
    leaveRoom() {
      this.$socket.emit("leave_room");
    },
    setTimeProgress() {
      // const currentTime = new Date().getTime() / 1000;
      // this.timeProgress =
      //   ((this.nextTurnTimestamp - currentTime) * 100) / MAX_WAIT_TIME;
    }
  },
  beforeUnmount() {
    // if (!!this.timerInterval) {
    //   clearInterval(this.timerInterval);
    // }
    // this.$socket.disconnect();
  }
};
</script>

<style lang="scss">
.board-container {
  padding: 10px;
  margin: 20px;
  border-radius: 12px;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
