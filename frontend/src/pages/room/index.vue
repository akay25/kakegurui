<template>
  <div class="flex">
    <div class="board-container" v-if="isGameRunning">
      <div class="row">
        <div class="flex xs12">
          <va-progress-bar :modelValue="99"></va-progress-bar>
        </div>
      </div>
      <board :cards="cards" :cover="cover" />
    </div>
    <div class="board-container" v-else>
      {{ roomID }}
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Board from "@/components/Board.vue";
import axios from "@/api";
import {
  saveDetails,
  getPlayerInfo,
  getToken,
  getRoom,
  removeDetails
} from "@/utils/utils";

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

const CARDS = _.shuffle(_.concat(cards, cards));

export default {
  name: "room",
  components: {
    Board
  },
  data() {
    return {
      roomID: this.$route.params.roomID,
      room: null,
      apiLoading: false,
      cover: "https://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png",
      cards: CARDS.splice(52)
    };
  },
  computed: {
    isGameRunning() {
      return this.room !== null && this.room.status === "playing";
    }
  },
  async created() {
    const validRoomID = await this.validateRoomID(this.roomID);
    if (!validRoomID) {
      alert("Invalid room ID");
      removeDetails();
      this.$router.push("/");
    }

    // Create and connect to socket room here
    // TODO: Create/connect to socket until others join
    // If socket connect to room fails using the auth then redirect
    // Wait for other users
    // Start game button
  },
  methods: {
    async validateRoomID() {
      if (!!this.roomID) {
        this.apiLoading = true;
        try {
          const response = await axios(`/rooms/${this.roomID}`);
          this.room = response.data;
          saveDetails(this.room);
          this.apiLoading = false;
          return response.data.name === this.roomID;
        } catch (e) {
          console.log(e);
        }
        this.apiLoading = false;
      }
      return false;
    }
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
