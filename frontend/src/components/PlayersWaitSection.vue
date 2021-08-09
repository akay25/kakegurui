<template>
  <div class="overlay-container" v-if="!isGameRunning">
    <div class="row">
      <div class="flex md4 xs12">
        <va-button color="#fca311" @click="startGame" v-if="isOwner"
          >Start Game</va-button
        >
        <br />
        <br />
        <va-button color="danger" @click="leaveGame" v-if="isOwner"
          >Leave Game</va-button
        >
      </div>
      <div class="flex md8 xs12">
        <PlayerAvataar
          v-for="player in room.players"
          :key="player.id"
          :profilePic="player.profilePic"
          :id="player.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PlayerAvataar from "./Player/Avataar.vue";
import { clearLocalStorage } from "@/utils";

export default {
  name: "PlayersWaitSection",
  components: { PlayerAvataar },
  data() {
    return {
      show: true
    };
  },
  computed: {
    ...mapGetters([
      "isGameRunning",
      "room",
      "isOwner",
      "roomName",
      "playerId",
      "token"
    ])
  },
  methods: {
    ...mapMutations(["setLoading"]),
    startGame() {},
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
</style>
