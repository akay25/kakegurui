<template>
  <div class="flex">
    <div class="board-container">
      <div class="row">
        <div class="flex xs12">
          <va-progress-bar :modelValue="99"></va-progress-bar>
        </div>
      </div>
      <board :cards="cards" :cover="cover" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";
import Board from "@/components/Board.vue";
import axios from "@/api";
import { cards } from "@/data/cards";
import { clearLocalStorage } from "@/utils";

const CARDS = _.shuffle(_.concat(cards, cards));

export default {
  name: "room",
  components: {
    Board
  },
  data() {
    return {
      roomID: this.$route.params.roomID,
      cover: "https://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png",
      cards: CARDS.splice(52)
    };
  },
  computed: {
    ...mapGetters(["token", "isGameRunning", "room"]),
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
        if (content in err.data) alert(err.data.content);
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
    }
  },
  mounted() {
    if (!!this.$socket.io.opts.extraHeaders.authorization) {
      this.$socket.connect();
    }
  },
  methods: {
    ...mapMutations(["setLoading", "setRoom"]),
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
