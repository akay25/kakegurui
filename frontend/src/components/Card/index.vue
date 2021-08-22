<template>
  <flip-card
    :height="height"
    :width="width"
    :enabled="flipEnabled"
    :ref="`flip_component_${index}`"
    @flip="handleFlip"
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
      backImage: null
    };
  },
  computed: {
    getEventName() {
      return `set_back_image_${this.index}`;
    }
  },
  created() {
    this.sockets.subscribe(this.getEventName, imgURL => {
      this.backImage = imgURL;
    });
  },
  emits: ["flip", "wrongCard"],
  methods: {
    handleFlip(event) {
      if (event === -1) {
        this.$emit("wrongCard", { currentCardId: this.index });
      } else {
        if (event) {
          // Only ask for image when flipped
          this.$socket.emit("ask_for_back_image", this.index);
        }
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
  },
  beforeUnmount() {
    this.sockets.unsubscribe(this.getEventName);
  }
};
</script>
