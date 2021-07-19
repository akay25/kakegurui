<template>
  <div class="flex">
    <div class="row ">
      <div class="flex xs2">
        <va-button @click="shuffleArray">Shuffle</va-button>
      </div>
    </div>
    <div class="board-container">
      <board :cards="cards" :cover="cover" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Board from "@/components/Board.vue";

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
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png"
  }
];

export default {
  name: "room",
  components: {
    Board
  },
  data() {
    return {
      cover: "https://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png",
      cards: cards,
      shuffleTimer: null
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    shuffleArray() {
      this.cards = _.shuffle(cards);
    },
    startTimer() {
      const self = this;
      this.shuffleTimer = setInterval(function() {
        self.shuffleArray();
      }, 3000);
    }
  },
  beforeUnmount() {
    if (this.shuffleTimer) clearInterval(this.shuffleTimer);
  }
};
</script>

<style lang="scss">
.board-container {
  border: 2px dashed #192849;
  padding: 10px;
  margin: 20px;
  border-radius: 12px;
  overflow-y: hidden;
}
</style>
