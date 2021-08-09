<template>
  <div>
    <avataar :profilePic="player.profilePic" :id="player.id" :width="60" />
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
