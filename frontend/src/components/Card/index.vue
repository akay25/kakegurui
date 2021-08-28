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
      <image-holder :image="cover" />
    </template>
    <template v-slot:back>
      <image-holder :image="backImage" />
    </template>
  </flip-card>
</template>

<script>
import { mapGetters } from "vuex";
import FlipCard from "./FlipCard.vue";
import ImageHolder from "./ImageHolder.vue";
export default {
  name: "Card",
  components: {
    FlipCard,
    ImageHolder
  },
  props: {
    cover: {
      type: String
    },
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
      flipped: false
    };
  },
  computed: {
    ...mapGetters(["isCurrentTurnMine"])
  },
  methods: {
    // This function is called when user flips the card
    handleClick() {
      if (this.flipEnabled && this.isCurrentTurnMine) {
        this.$socket.emit("ask_for_card_flip", {
          id: this.index,
          direction: !this.flipped ? "up" : "down"
        });
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
