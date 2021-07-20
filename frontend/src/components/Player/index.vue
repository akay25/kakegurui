<template>
  <div class="player-holder">
    <avataaars
      :clotheType="'GraphicShirt'"
      :eyebrowType="'Angry'"
      :eyeType="'Cry'"
      :mouthType="'Eating'"
      :facialHairColor="'Blonde'"
      :graphicType="'Cumbia'"
    >
    </avataaars>
  </div>
</template>

<script>
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
export default {
  components: { Avataaars },
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

  &:hover {
    border: 2px solid #fca311;
  }
}
</style>
