<template>
  <div>
    <avataar :profilePic="player.profilePic" :id="player.id" />
  </div>
</template>

<script>
import Avataar from "./Avataar.vue";
export default {
  name: "Player",
  components: { Avataar },
  props: {
    player: Object
  }
};
</script>
