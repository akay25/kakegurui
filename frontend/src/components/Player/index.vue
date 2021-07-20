<template>
  <div class="player-holder">P1</div>
</template>

<script>
export default {
  name: "Player",
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.player-holder {
  display: inline-flex;
  margin: 5px;
  width: 60px;
  height: 60px;
  border: 2px solid #14213dbd;
  border-radius: 5px;
}
</style>
