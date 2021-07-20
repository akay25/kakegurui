<template>
  <flip-card
    :height="height"
    :width="width"
    :enabled="flipEnabled"
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
        this.$emit("flip", { id: this.index, val: event });
      }
    }
  }
};
</script>
