<template>
  <div class="overlay-container" v-if="!isGameRunning">
    <div class="row">
      <div class="flex md6 xs12">
        fsdfesjhjk
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PlayersWaitSection",
  data() {
    return {
      show: true
    };
  },
  computed: {
    ...mapGetters(["isGameRunning"])
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
