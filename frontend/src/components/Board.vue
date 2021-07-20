<template>
  <div>
    <transition-group name="flip-list" tag="div">
      <div
        v-for="(item, index) in cards"
        :key="item"
        style="display: inline-block;"
      >
        <card
          :class="index === selectedID ? selectedCardClass : 'on-hover'"
          :height="cardHeight"
          :width="cardWidth"
          :frontImage="cover"
          :backImage="item.image"
          :index="index"
          :flipEnabled="!isFlipped || index === selectedID"
          @flip="handleFlip"
          @wrongCard="handleWrongCard"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import Card from "@/components/Card/index.vue";
import ImageHolder from "@/components/Card/ImageHolder.vue";
export default {
  name: "board",
  components: {
    Card,
    ImageHolder
  },
  props: {
    cards: {
      type: [Object],
      default: []
    },
    cover: {
      type: String
    },
    shuffleSpeed: {
      type: String,
      default: "shuffleSlow"
    }
  },
  data() {
    return {
      cardHeight: 160,
      cardWidth: 120,
      dragging: false,
      isFlipped: false,
      selectedID: -1,
      selectedCardClass: "",
      shuffleTypes: ["Slow", "Medium", "Fast"]
    };
  },
  watch: {
    selectedCardClass(newVal) {
      if (newVal === "wrong-card") {
        setTimeout(
          function(scope) {
            scope.selectedCardClass = "";
          },
          800,
          this
        );
      }
    }
  },
  methods: {
    handleFlip(e) {
      if (!e.val) {
        this.isFlipped = false;
        this.selectedID = -1;
      } else if (!this.isFlipped && e.val) {
        this.isFlipped = true;
        this.selectedID = e.id;
      }
      this.selectedCardClass = "";
    },
    handleWrongCard(e) {
      this.selectedCardClass = "wrong-card";
    }
  }
};
</script>

<style lang="scss">
.flip-list-move {
  transition: transform 0.8s ease;
}

.deck {
  margin-left: 30px;
  padding-top: 30px;
}

.card {
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
  background: rgba(0, 0, 0, 0);
}

.shuffleSlow-move {
  transition: transform 2s;
}

.shuffleMedium-move {
  transition: transform 1s;
}

.shuffleFast-move {
  transition: transform 0.5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1210px) {
  .deck {
    position: initial;
    top: 0;
  }
}
</style>

<style scoped>
.on-hover {
  transition: 400 ease;
}

.on-hover:hover {
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.wrong-card {
  border-radius: 5px;
  border: 1px solid rgba(255, 20, 17, 0.48);

  box-shadow: 0px 0px 3px 3px rgba(255, 20, 17, 0.48);
  -webkit-box-shadow: 0px 0px 3px 3px rgba(255, 20, 17, 0.48);
  -moz-box-shadow: 0px 0px 3px 3px rgba(255, 20, 17, 0.48);

  animation: shake 0.5s;
  animation-iteration-count: 1;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
