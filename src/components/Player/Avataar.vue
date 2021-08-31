<template>
  <div
    class="player"
    v-bind:style="{
      width: width + 'px',
      border: `2px solid ${isMe ? '#FCA311' : '#666060'}`
    }"
  >
    <img style="width: 100%; height: 100%;" :src="pngData" v-if="!!pngData" />
    <avataaars
      :ref="`profile_${id}`"
      circleColor="#fca311"
      accessoriesType="Blank"
      :topType="profilePic.topHat"
      :topColor="profilePic.topHatColor"
      :hairColor="profilePic.hairColor"
      :eyebrowType="profilePic.eyebrowType"
      :eyeType="profilePic.eye"
      :facialHairType="profilePic.facialHair"
      :facialHairColor="profilePic.hairColor"
      :mouthType="profilePic.mouthType"
      :skinColor="profilePic.skinColor"
      :clotheType="profilePic.clotheType"
      :clothColor="profilePic.clothColor"
      :graphicType="profilePic.tshirt"
      :clotheColor="profilePic.clothColor"
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
    profilePic: Object,
    width: {
      type: Number,
      default: 120
    },
    isMe: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pngData: null
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
    await this.generatePNG();
  },
  methods: {
    async generatePNG() {
      if (`profile_${this.id}` in this.$refs) {
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
  border: 2px solid;
  max-width: 120px;
  height: auto;
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover {
    border: 2px solid #08132be1;
  }
}
</style>
