<template>
  <div v-if="isGameRunning">
    <transition-group name="flip-list" tag="div">
      <div
        v-for="index in cardsIndexArray"
        :key="index"
        style="display: inline-block;"
      >
        <card
          v-if="index >= 0"
          :ref="`card_${index}`"
          :class="selectedIDs.includes(index) ? selectedCardClass : 'on-hover'"
          :height="cardHeight"
          :width="cardWidth"
          :index="index"
          :flipEnabled="isCurrentTurnMine"
        />
        <RemovedCard :height="cardHeight" :width="cardWidth" v-else />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { useSound } from "@vueuse/sound";
import Card from "@/components/Card/index.vue";
import RemovedCard from "@/components/RemovedCard.vue";
import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";
import FLIP_UP_FILE from "@/assets/sounds/flip_up.wav";
import WRONG_CARD_FILE from "@/assets/sounds/wrong_card.wav";
import REMOVE_CARDS_FILE from "@/assets/sounds/remove_cards.wav";
import { CARD_COUNT_IN_ROW, CARD_RATIO, GAME_VOLUME } from "@/data/constants";

export default {
  name: "board",
  components: {
    Card,
    RemovedCard
  },
  computed: {
    ...mapGetters([
      "isGameRunning",
      "deckCards",
      "deckSize",
      "isCurrentTurnMine",
      "selectedCard",
      "prevSelectedCard",
      "room"
    ])
  },
  data() {
    return {
      cardHeight: 4 * CARD_RATIO,
      cardWidth: 3 * CARD_RATIO,
      dragging: false,
      selectedIDs: [],
      selectedCardClass: "",
      shuffleTypes: ["Slow", "Medium", "Fast"],
      cardsIndexArray: [],
      // Sounds
      flipUpSound: useSound(FLIP_UP_FILE, { volume: GAME_VOLUME }),
      flipDownSound: useSound(FLIP_UP_FILE, { volume: GAME_VOLUME }),
      wrongCardSound: useSound(WRONG_CARD_FILE, { volume: GAME_VOLUME }),
      removeCardsSound: useSound(REMOVE_CARDS_FILE, { volume: GAME_VOLUME })
    };
  },
  created() {
    this.cardsIndexArray = this.deckCards;
  },
  sockets: {
    flip_card: function(card) {
      if (card.direction === "down") {
        this.flipDownSound.play();
      } else {
        this.flipUpSound.play();
      }
      this.flipCardManually(card.id, card.image, card.direction);
    },
    flip_all_cards_down() {
      const tempSelectedIndices = [...this.selectedIDs];
      for (let i = 0; i < tempSelectedIndices.length; i++) {
        const cardIndex = tempSelectedIndices[i];
        this.flipCardManually(cardIndex, null, "down");
      }
    },
    wrong_card: function(cards) {
      this.wrongCardSound.play();
      this.selectedIDs = [cards.card1, cards.card2];
      this.handleWrongCards();
    },
    remove_cards: function({ removedCards }) {
      this.removeCardsSound.play();
      setTimeout(() => {
        this.setRemovedCards(removedCards);
        for (const removedIndex of removedCards) {
          if (this.cardsIndexArray[removedIndex] !== -1) {
            this.disableCardManually(removedIndex);
          }
        }
      }, 800);
    }
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
    },
    deckSize(_) {
      this.cardsIndexArray = this.deckCards;
    }
  },
  mounted() {
    this.$socket.emit("ask_for_flipped_cards");
  },
  methods: {
    ...mapMutations(["setdeckRange", "setRemovedCards"]),
    handleWrongCards() {
      this.selectedCardClass = "wrong-card";
    },
    flipCardManually(cardIndex, imgURL = null, direction = "up") {
      const selectedCard = this.$refs[`card_${cardIndex}`];
      if (!!selectedCard) {
        if (direction === "down") {
          const newArray = this.selectedIDs.filter(e => e !== cardIndex);
          this.selectedIDs = newArray;
          selectedCard.flipMeDown();
        } else {
          if (this.selectedIDs.includes(cardIndex) === false) {
            this.selectedIDs.push(cardIndex);
          }
          selectedCard.flipMeUp(imgURL);
        }
      }
    },
    disableCardManually(cardIndex) {
      const selectedCard = this.$refs[`card_${cardIndex}`];
      if (!!selectedCard) {
        selectedCard.disable();
      }
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
