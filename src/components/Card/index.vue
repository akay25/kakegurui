<template>
  <flip-card
    :height="height"
    :width="width"
    :enabled="flipEnabled"
    :ref="`flip_component_${index}`"
    :flipped="flipped"
    @click="handleClick"
  >
    <template v-slot:front>
      <image-holder
        :style="disabled ? 'filter: grayscale(1);' : ''"
        :image="cover"
      />
    </template>
    <template v-slot:back>
      <image-holder :image="backImage" />
    </template>
  </flip-card>
</template>

<script>
import { mapGetters } from "vuex";
import { useSound } from "@vueuse/sound";
import WRONG_CARD_FILE from "@/assets/sounds/wrong_card.wav";
import { GAME_VOLUME } from "@/data/constants";
import FlipCard from "./FlipCard.vue";
import ImageHolder from "./ImageHolder.vue";
export default {
  name: "Card",
  components: {
    FlipCard,
    ImageHolder
  },
  props: {
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 160
    },
    index: {
      type: Number
    },
    flipEnabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      backImage: null,
      flipped: false,
      disabled: false,
      wrongCardSound: useSound(WRONG_CARD_FILE, { volume: GAME_VOLUME })
    };
  },
  computed: {
    ...mapGetters(["isCurrentTurnMine", "cover"])
  },
  methods: {
    // Disable myself
    disable() {
      this.flipMeDown();
      this.disabled = true;
    },
    // This function is called when user flips the card
    handleClick() {
      if (!this.disabled)
        if (this.flipEnabled && this.isCurrentTurnMine) {
          this.$socket.emit("ask_for_card_flip", {
            id: this.index,
            direction: !this.flipped ? "up" : "down"
          });
        } else {
          this.wrongCardSound.play();
        }
    },
    // THis function is called when server forcefully flips the card
    flipMeUp(imgURL) {
      this.backImage = imgURL;
      this.flipMe(true);
    },
    flipMeDown() {
      this.backImage = null;
      this.flipMe(false);
    },
    flipMe(toBack = true) {
      if (toBack) {
        this.flipped = true;
      } else {
        this.flipped = false;
      }
    }
  }
};
</script>
