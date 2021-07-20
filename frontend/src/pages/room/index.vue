<template>
  <div class="flex">
    <div class="board-container">
      <div class="row">
        <div class="flex xs12">
          <va-progress-bar :modelValue="99"></va-progress-bar>
        </div>
      </div>
      <div class="row">
        <div class="flex xs2">
          <va-button @click="shuffleArray">Shuffle</va-button>
        </div>
      </div>
      <board :cards="cards" :cover="cover" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Board from "@/components/Board.vue";

const cards = [
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/011.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/014.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/015.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/017.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/018.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/020.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/021.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/022.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/023.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/024.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/027.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/028.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/029.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/030.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/031.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/032.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/033.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/034.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/036.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/040.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/041.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/042.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/044.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/045.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/046.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/047.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/048.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/049.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/050.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/051.png" },
  { image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png" }
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
    // this.startTimer();
  },
  methods: {
    shuffleArray() {
      this.cards = _.shuffle(cards);
    },
    startTimer() {
      const self = this;
      this.shuffleTimer = setInterval(function() {
        self.shuffleArray();
        console.log("arary shuffled");
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
  padding: 10px;
  margin: 20px;
  border-radius: 12px;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
