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
export default {
  name: "home",
  data() {
    return {
      roomID: null,
      personName: ""
    };
  },
  created() {
    this.roomID = this.$route.params.roomID;
    if (this.roomID !== undefined && !this.validateRoomID(this.roomID)) {
      this.roomID = false;
      alert("Invalid room ID");
    } else if (this.roomID === undefined) {
      this.roomID = null;
    }
  },
  methods: {
    validateRoomID() {
      if (!!this.roomID) {
        //TODO: Make api call to make sure room is available
        return true;
      }
      return false;
    },
    createRoom() {
      // TODO: Create new room api call
    },
    joinRoom() {
      // TODO: Join new room api call
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
