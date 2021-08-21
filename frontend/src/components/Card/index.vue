<template>
  <flip-card
    :height="height"
    :width="width"
    :enabled="flipEnabled"
    :ref="`flip_component_${index}`"
    @flip="handleFlip"
  >
    <template v-slot:front>
      <image-holder :image="frontImage" />
    </template>
    <template v-slot:back>
      <image-holder :image="backImage" />
    </template>
  </flip-card>
</template>

<script>
import FlipCard from "./FlipCard.vue";
import ImageHolder from "./ImageHolder.vue";
export default {
  name: "Card",
  components: {
    FlipCard,
    ImageHolder
  },
  props: {
    frontImage: {
      type: String
    },
    backImage: {
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
  emits: ["flip", "wrongCard"],
  methods: {
    handleFlip(event) {
      if (event === -1) {
        this.$emit("wrongCard", { currentCardId: this.index });
      } else {
        this.$socket.emit("ask_for_back_image", this.index - 1);
        this.$emit("flip", { id: this.index, val: event });
      }
    },
    flipMe(toBack = true) {
      const flipComponent = this.$refs[`flip_component_${this.index}`];
      if (!!flipComponent) {
        if (toBack) {
          flipComponent.toggleFront(true);
        } else {
          flipComponent.toggleBack(true);
        }
      }
    }
  }
};
</script>
