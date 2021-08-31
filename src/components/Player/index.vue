<template>
  <va-popover
    color="#14213D"
    :title="player.name"
    :message="`Score: ${player.score}`"
    placement="top"
  >
    <va-badge overlap multi-line color="#ff0000" :dot="isPlaying">
      <avataar
        :profilePic="player.profilePic"
        :id="player.id"
        :width="60"
        :isMe="player.id === playerId"
      />
    </va-badge>
  </va-popover>
</template>

<script>
import { mapGetters } from "vuex";
import Avataar from "./Avataar.vue";
export default {
  name: "Player",
  components: { Avataar },
  props: {
    player: Object
  },
  computed: {
    ...mapGetters(["currentPlayer", "playerId"]),
    isPlaying() {
      return !!this.currentPlayer && this.currentPlayer.id === this.player.id;
    }
  }
};
</script>
