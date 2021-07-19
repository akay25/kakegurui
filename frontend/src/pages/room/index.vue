<template>
  <div class="card-container">
    <grid
      :draggable="false"
      :sortable="true"
      :items="cards"
      :height="(cardHeight + 5) * 10"
      :width="(cardWidth + 5) * 5"
      :cellWidth="cardWidth + 5"
      :cellHeight="cardHeight + 5"
      @dragstart="dragging = true"
      @dragend="dragging = false"
    >
      <template v-slot:cell="props">
        <card
          :class="props.index === selectedID ? selectedCardClass : ''"
          :height="cardHeight"
          :width="cardWidth"
          :frontImage="cover"
          :backImage="props.item.image"
          :index="props.index"
          :flipEnabled="!isFlipped || props.index === selectedID"
          @flip="handleFlip"
          @wrongCard="handleWrongCard"
        />
      </template>
    </grid>
    <va-button @click="shuffleArray">Shuffle</va-button>
  </div>
</template>

<script>
import _ from "lodash";
import Grid from "vue-js-grid/src/Grid.vue";
import Card from "@/components/Card/index.vue";

const cards = [
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/076.png"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/781.png"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/623.png"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png"
  }
];
export default {
  name: "room",
  components: {
    Grid,
    Card
  },
  data() {
    return {
      cover: "https://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png",
      cards: cards,
      cardHeight: 160,
      cardWidth: 120,
      dragging: false,
      isFlipped: false,
      selectedID: -1,
      selectedCardClass: ""
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

<style scoped>
.on-hover {
  border: 1px solid black;
}

.wrong-card {
  border-radius: 5px;
  border: 1px solid rgba(255, 20, 17, 0.48);
  box-shadow: rgba(255, 20, 17, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -20px 16px 0px;

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
