<template>
  <div>
    <transition-group name="flip-list" tag="div">
      <div
        v-for="index in cardsIndexArray"
        :key="index"
        style="display: inline-block;"
      >
        <card
          :ref="`card_${index}`"
          :class="selectedIDs.includes(index) ? selectedCardClass : 'on-hover'"
          :height="cardHeight"
          :width="cardWidth"
          :cover="cover"
          :index="index"
          :flipEnabled="
            isCurrentTurnMine &&
              (selectedIDs.length < 2 ||
                (selectedIDs.length == 2 && selectedIDs.includes(index)))
          "
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
import _ from "lodash";
import { mapGetters } from "vuex";
export default {
  name: "board",
  components: {
    Card,
    ImageHolder
  },
  props: {
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
      selectedIDs: [],
      selectedCardClass: "",
      shuffleTypes: ["Slow", "Medium", "Fast"],
      backImage: null,
      cardsIndexArray: []
    };
  },
  sockets: {
    card_flipped: function({ cardIndex, direction }) {
      this.flipCardManually(cardIndex, direction);
    }
  },
  created() {
    this.cardsIndexArray = this.deckCards;
  },
  computed: {
    ...mapGetters(["deckCards", "isCurrentTurnMine"])
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
      if (this.isCurrentTurnMine) {
        if (!e.val) {
          this.$socket.emit("i_flipped_card", {
            cardIndex: e.id,
            direction: "down"
          });
          this.backImage = null;
          const index = this.selectedIDs.indexOf(e.id);
          if (index > -1) {
            this.selectedIDs.splice(index, 1);
          }
        } else if (this.selectedIDs.length < 2 && e.val) {
          this.backImage = null;
          this.selectedIDs.push(e.id);
          this.$socket.emit("i_flipped_card", {
            cardIndex: e.id,
            direction: "up"
          });
        }
        this.selectedCardClass = "";
      }
    },
    handleWrongCard(e) {
      this.selectedCardClass = "wrong-card";
    },
    flipCardManually(cardIndex, direction = "up") {
      this.backImage = null;
      const selectedCard = this.$refs[`card_${cardIndex}`];
      if (!!selectedCard) {
        selectedCard.flipMe(direction === "up");
      }
    },
    removeCard(wonCards = []) {
      this.cardsIndexArray = _.remove(
        this.cardsIndexArray,
        e => e != wonCards[0] && e != wonCards[1]
      );
    }
  }
};
</script>

<style lang="scss">
.flip-list-move {
  transition: transform 0.8s ease;
}

.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s;
}

.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transform: translateY(50px);
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
