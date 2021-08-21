<template>
  <div class="flex">
    <div class="board-container">
      <div class="row">
        <div class="flex xs12">
          <va-progress-bar
            :modelValue="99"
            v-if="isCurrentTurnMine"
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

export default {
  name: "room",
  components: {
    Board
  },
  data() {
    return {
      roomID: this.$route.params.roomID,
      // This will changed on given type of card
      cover: "https://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png"
    };
  },
  computed: {
    ...mapGetters([
      "token",
      "isGameRunning",
      "room",
      "totalCardsCount",
      "isCurrentTurnMine"
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
      console.log("Room updated");
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
      this.setRoom({ status: "playing" });
    }
  },
  mounted() {
    if (!!this.$socket.io.opts.extraHeaders.authorization) {
      this.$socket.connect();
    }
  },
  methods: {
    ...mapMutations([
      "setLoading",
      "setRoom",
      "setTotalCardsCount",
      "setCurrentPlayer"
    ]),
    async validateRoomID(roomID) {
      this.setLoading(true);
      try {
        const response = await axios(`/rooms/${roomID}`);
        this.setRoom(response.data);
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
    }
  },
  beforeUnmount() {
    this.$socket.disconnect();
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
