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
                <va-input v-model="personName" placeholder="Your name" />
              </div>
              <br />
              <br />
              <va-button
                class="mr-2 mb-2"
                color="info"
                size="large"
                v-if="roomID"
              >
                Join room</va-button
              >
              <va-button class="mr-2 mb-2" color="success" size="large" v-else>
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
export default {
  name: "home",
  data() {
    return {
      roomID: null,
      personName: "",
      profilePicCode: "1-5-8"
    };
  },
  async created() {
    this.personName = nameByRace("human", {
      gender: _.sample(["male", "female"])
    });

    this.roomID = this.$route.params.roomID;
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
        try {
          const response = await axios(`/rooms/${this.roomID}`);
          return response.data.name === this.roomID;
        } catch (e) {
          console.log(e);
        }
      }
      return false;
    },
    createRoom() {
      // TODO: Create new room api call
    },
    async joinRoom() {
      try {
        const response = await axios();
        console.log(response);
      } catch (e) {
        alert(`Failed to join room with name: ${this.roomID}`);
      }
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
