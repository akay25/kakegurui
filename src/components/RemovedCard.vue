<template>
  <div
    :style="`height: ${height}px; width: ${width}px; `"
    class="dummy-image-container"
    @click="handleClick"
  >
    <div class="flipper">
      <img class="dummy-image" :src="cover" :draggable="false" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useSound } from "@vueuse/sound";
import WRONG_CARD_FILE from "@/assets/sounds/wrong_card.wav";
import { GAME_VOLUME } from "@/data/constants";
export default {
  name: "RemovedCard",
  props: {
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 160
    }
  },
  data() {
    return {
      wrongCardSound: useSound(WRONG_CARD_FILE, { volume: GAME_VOLUME })
    };
  },
  computed: {
    ...mapGetters(["cover"])
  },
  methods: {
    // This function is called when user flips the card
    handleClick() {
      this.wrongCardSound.play();
    }
  }
};
</script>

<style lang="scss">
.dummy-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
}

.dummy-image {
  display: inline-flex;
  width: 100%;
  height: auto;
  filter: grayscale(1);
}
</style>
