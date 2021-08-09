<template>
  <div class="player" v-bind:style="{ width: width + 'px' }">
    <img style="width: 100%; height: 100%;" :src="pngData" v-if="!!pngData" />
    <avataaars
      :ref="`profile_${id}`"
      circleColor="#fca311"
      clotheType="GraphicShirt"
      eyebrowType="Default"
      facialHairType="blank"
      :eyeType="profilePic.eye"
      :graphicType="profilePic.tshirt"
      :clotheColor="profilePic.clothColor"
      :topType="profilePic.topHat"
      v-else
    >
    </avataaars>
  </div>
</template>

<script>
import _ from "lodash";
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import { mapGetters } from "vuex";
const SVGToPNG = require("../ProfilePictureMaker/SvgToPngConverter");

export default {
  name: "ProfilePicMaker",
  components: { Avataaars },
  props: {
    id: String,
    profilePic: Object
  },
  data() {
    return {
      pngData: null,
      width: 120
    };
  },
  computed: {
    ...mapGetters(["playerId"])
  },
  async created() {
    if (this.playerId === this.id) {
      const pngData = localStorage.getItem("profilePic");
      if (!!pngData) {
        this.pngData = JSON.parse(pngData).png;
        return;
      }
    }
    this.generatePNG();
  },
  methods: {
    async generatePNG() {
      if (`profile_${id}` in this.$refs) {
        this.pngData = await new SVGToPNG().convertFromInput(
          this.$refs.my_avataar.$el
        );
      }
    }
  }
};
</script>

<style lang="scss">
.player {
  display: inline-flex;
  margin: 5px;
  border: 2px solid #14213dbd;
  max-width: 120px;
  height: auto;
  border-radius: 5px;
  transition: border 0.2s ease;

  &:hover {
    border: 2px solid #fca311;
  }
}
</style>
