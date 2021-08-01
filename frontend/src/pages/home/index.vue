<template>
  <div class="container">
    <div class="flex xs12 md6">
      <va-card class="larger-padding">
        <va-card-title
          >{{ `${roomID !== null ? "Join" : "Create"}` }} room</va-card-title
        >
        <va-card-content>
          <div class="row justify--center">
            <div class="flex md8 justify--center">
              <div class="flex md6">
                <va-input
                  v-model="player.name"
                  placeholder="Your name"
                  label="Player name"
                  required
                  :disabled="isLoading"
                />
              </div>
              <br />
              <br />
              <va-button
                class="mr-2 mb-2"
                color="info"
                size="large"
                v-if="roomID"
                @click="joinRoom"
                :disabled="isLoading"
              >
                Join room</va-button
              >
              <va-button
                class="mr-2 mb-2"
                color="success"
                size="large"
                v-else
                @click="createRoom"
                :disabled="isLoading"
              >
                Create room</va-button
              >
            </div>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";
import { nameByRace } from "fantasy-name-generator";
import axios from "@/api";
import { getPlayerInfo } from "@/utils";

export default {
  name: "home",
  data() {
    return {
      roomID: this.$route.params.roomID,
      player: {
        name: nameByRace("human", {
          gender: _.sample(["male", "female"])
        }),
        profilePic: "1-5-7"
      }
    };
  },
  computed: {
    ...mapGetters(["isLoading", "playerId", "token", "name", "profilePic"])
  },
  async created() {
    // Check for existing player storage
    if (!!this.token) {
      // Check for token and room id to make sure user is not doing double entry
      // const existingRoom = getRoom();
      // if (!!existingRoom && this.validateRoomID(existingRoom.name)) {
      //   this.$router.push({ path: `/room/${existingRoom.name}` });
      // } else {
      // Clear everything and continue down
      // }
    }

    // Check if the given room ID is valid or not
    const validRoomID = await this.validateRoomID(this.roomID);
    if (this.roomID !== undefined && !validRoomID) {
      this.roomID = null;
      alert("Invalid room ID");
      this.$router.push("/");
    } else if (this.roomID === undefined) {
      this.roomID = null;
    } else {
      // TODO: Write the room ID to instance
    }

    // Check for player and initialise it
    const playerInfo = getPlayerInfo();
    if (playerInfo !== null) {
      // Load old name and set default value
      this.player = {
        name: playerInfo.name,
        profilePic: playerInfo.profilePic
      };
    }
  },
  methods: {
    ...mapMutations(["setLoading", "setRoom", "setPlayer", "setToken"]),
    async validateRoomID() {
      if (!!this.roomID) {
        this.apiLoading = true;
        try {
          const response = await axios(`/rooms/${this.roomID}`);
          this.apiLoading = false;
          return response.data.name === this.roomID;
        } catch (e) {
          console.log(e);
        }
        this.apiLoading = false;
      }
      return false;
    },
    async createRoom() {
      this.setLoading(true);
      try {
        const { data } = await axios.post(`/rooms/create`, this.player);

        this.setRoom(data.room);
        this.setPlayer(data.player);
        this.setToken(data.token);
        console.log("everything is set");
        console.log(data);
        // this.$router.push({ path: `/room/${room.name}` });
      } catch (e) {
        alert(`Failed to create room`);
      }
      this.setLoading(false);
    },
    async joinRoom() {
      this.apiLoading = true;
      try {
        const { data } = await axios.post(`/rooms/join`, {
          roomName: this.roomID,
          name: this.personName,
          profilePic: this.profilePicCode
        });

        this.setRoom(data.room);
        this.setPlayer(data.player);
        this.setToken(data.token);
        console.log("everything is set");
        console.log(data);

        // this.$router.push({ path: `/room/${room.name}` });
      } catch (e) {
        console.log(e);
        alert(`Failed to join room with name: ${this.roomID}`);
      }
      this.apiLoading = false;
    }
  }
};
</script>

<style lang="scss">
.container {
  margin-top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
