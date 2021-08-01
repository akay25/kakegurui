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
                  v-model="personName"
                  placeholder="Your name"
                  label="Player name"
                  required
                  :disabled="apiLoading"
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
                :disabled="apiLoading"
              >
                Join room</va-button
              >
              <va-button
                class="mr-2 mb-2"
                color="success"
                size="large"
                v-else
                @click="createRoom"
                :disabled="apiLoading"
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
import { nameByRace } from "fantasy-name-generator";
import axios from "@/api";
import { saveDetails, getPlayerInfo, getToken, getRoom } from "@/utils/utils";
export default {
  name: "home",
  data() {
    return {
      apiLoading: false,
      roomID: this.$route.params.roomID,
      personName: nameByRace("human", {
        gender: _.sample(["male", "female"])
      }),
      profilePicCode: "1-5-8"
    };
  },
  async created() {
    // Check for token and room id to make sure user is not doing double entry
    const token = getToken();
    const existingRoom = getRoom();
    if (!!existingRoom && !!token && this.validateRoomID(existingRoom.name)) {
      this.$router.push({ path: `/room/${existingRoom.name}` });
    }

    // Get player info if user is already created
    const playerInfo = getPlayerInfo();
    if (playerInfo !== null) {
      this.personName = playerInfo.name;
      this.profilePicCode = playerInfo.profilePic;
    }

    // Check if the given room ID is valid or not
    const validRoomID = await this.validateRoomID(this.roomID);
    if (this.roomID !== undefined && !validRoomID) {
      this.roomID = null;
      alert("Invalid room ID");
      this.$router.push("/");
    } else if (this.roomID === undefined) {
      this.roomID = null;
    }
  },
  methods: {
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
      this.apiLoading = true;
      try {
        const { data } = await axios.post(`/rooms/create`, {
          name: this.personName,
          profilePic: this.profilePicCode
        });

        const room = data.room;
        const userToken = data.token;
        const player = data.player;

        saveDetails(room, player, userToken);
        this.$router.push({ path: `/room/${room.name}` });
      } catch (e) {
        alert(`Failed to create room`);
      }
      this.apiLoading = false;
    },
    async joinRoom() {
      this.apiLoading = true;
      try {
        const { data } = await axios.post(`/rooms/join`, {
          roomName: this.roomID,
          name: this.personName,
          profilePic: this.profilePicCode
        });

        const room = data.room;
        const userToken = data.token;
        const player = data.player;

        saveDetails(room, player, userToken);
        this.$router.push({ path: `/room/${room.name}` });
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
