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
      backImage:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
      flipped: false
    };
  },
  computed: {
    getFlipUpEventName() {
      return `flip_card_up_${this.index}`;
    },
    getFlipDownEventName() {
      return `flip_card_down_${this.index}`;
    }
  },
  created() {
    this.sockets.subscribe(this.getFlipUpEventName, imgURL => {
      this.flipped = true;
      this.backImage = imgURL;
      this.$emit("flip", { id: this.index, val: this.flipped });
    });
    this.sockets.subscribe(this.getFlipDownEventName, () => {
      this.flipped = false;
      this.backImage = null;
      this.$emit("flip", { id: this.index, val: this.flipped });
    });
  },
  emits: ["flip", "wrongCard"],
  methods: {
    handleClick() {
      if (this.flipEnabled) {
        this.$socket.emit("ask_for_card_flip", {
          id: this.index,
          direction: !this.flipped ? "up" : "down"
        });
        console.log("emitted");
      } else {
        this.$emit("wrongCard", { currentCardId: this.index });
      }
    },
    flipMe(toBack = true) {
      if (toBack) {
        this.flipped = false;
      } else {
        this.flipped = true;
      }
    }
  },
  beforeUnmount() {
    this.sockets.unsubscribe(this.getEventName);
  }
};
</script>
