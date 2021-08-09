<template>
  <div class="container">
    <div class="flex xs12 md4" style="margin-top: 120px;">
      <va-card class="larger-padding">
        <va-card-title
          >{{ `${roomID !== null ? "Join" : "Create"}` }} room</va-card-title
        >
        <va-card-content>
          <div class="row justify--center">
            <div class="flex md8 justify--center">
              <profile-pic-maker ref="profilePicMaker" />
              <br />
              <br />
              <div class="flex" style="border: 1px solid #e5e5e5;">
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
import ProfilePicMaker from "@/components/ProfilePictureMaker";
import { clearLocalStorage } from "@/utils";

export default {
  name: "home",
  components: { ProfilePicMaker },
  data() {
    return {
      roomID: this.$route.params.roomID,
      player: {
        name: nameByRace("human", {
          gender: _.sample(["male", "female"])
        }),
        profilePic: null
      }
    };
  },
  computed: {
    ...mapGetters(["isLoading", "roomName", "token"])
  },
  async created() {
    let validRoomID = false;
    // Check for existing player storage
    if (!!this.token) {
      // Check for token and room id to make sure user is not doing double entry
      validRoomID = await this.validateRoomID(this.roomName);
      if (!!this.roomName && validRoomID) {
        this.$router.push({ path: `/room/${this.roomName}` });
      } else {
        // Clear everything and continue down
        clearLocalStorage();
      }
    }

    // Check if the given room ID is valid or not
    if (this.roomID !== undefined) {
      validRoomID = await this.validateRoomID(this.roomID);
      if (!validRoomID) {
        this.roomID = null;
        alert("Invalid room ID");
        this.$router.push("/");
      }
    } else {
      this.roomID = null;
    }
  },
  methods: {
    ...mapMutations(["setLoading", "setRoom", "setPlayer", "setToken"]),
    async loadProfilePic() {
      if ("profilePicMaker" in this.$refs) {
        try {
          this.player.profilePic = await this.$refs.profilePicMaker.generatePNG();
        } catch (e) {
          console.log("Failed to load profile pic: ", e);
        }
      }
    },
    async validateRoomID(roomID) {
      this.setLoading(true);
      try {
        const response = await axios(`/rooms/${roomID}`);
        this.setLoading(false);

        return response.data.name === roomID;
      } catch (e) {
        console.log(e);
      }
      this.setLoading(false);
      return false;
    },
    async createRoom() {
      await this.loadProfilePic();
      this.setLoading(true);
      try {
        const { data } = await axios.post(`/rooms/create`, this.player);
        this.leaveThisPage(data);
      } catch (e) {
        alert(`Failed to create room`);
      }
      this.setLoading(false);
    },
    async joinRoom() {
      await this.loadProfilePic();
      this.setLoading(true);
      try {
        const { data } = await axios.post(`/rooms/join`, {
          roomName: this.roomID,
          ...this.player
        });
        this.leaveThisPage(data);
      } catch (e) {
        console.log(e);
        alert(`Failed to join room with name: ${this.roomID}`);
      }
      this.setLoading(false);
    },
    leaveThisPage(data) {
      this.$socket.io.opts.extraHeaders.authorization = data.token;
      this.setRoom(data.room);
      this.setPlayer(data.player);
      this.setToken(data.token);
      this.$router.push({ path: `/room/${data.room.name}` });
    }
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
