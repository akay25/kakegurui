<template>
  <div class="profile-pic-maker">
    <div class="side-buttons">
      <arrow-key itemName="TOP_HAT" direction="←" v-model="profilePic.topHat" />
      <arrow-key itemName="EYE_TYPE" direction="←" v-model="profilePic.eye" />
      <arrow-key
        itemName="CLOTH_COLORS"
        direction="←"
        v-model="profilePic.clothColor"
      />
      <arrow-key itemName="TSHIRT" direction="←" v-model="profilePic.tshirt" />
    </div>
    <avataaars
      ref="my_avataar"
      circleColor="#fca311"
      clotheType="GraphicShirt"
      eyebrowType="Default"
      facialHairType="blank"
      :eyeType="profilePic.eye"
      :graphicType="profilePic.tshirt"
      :clotheColor="profilePic.clothColor"
      :topType="profilePic.topHat"
    >
    </avataaars>
    <div class="side-buttons">
      <arrow-key itemName="TOP_HAT" direction="→" v-model="profilePic.topHat" />
      <arrow-key itemName="EYE_TYPE" direction="→" v-model="profilePic.eye" />
      <arrow-key
        itemName="CLOTH_COLORS"
        direction="→"
        v-model="profilePic.clothColor"
      />
      <arrow-key itemName="TSHIRT" direction="→" v-model="profilePic.tshirt" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import { TOP_HAT, CLOTH_COLORS, TSHIRT, EYE_TYPE } from "./data";
import ArrowKey from "./ArrowKey.vue";
const SVGToPNG = require("./SvgToPngConverter");

export default {
  name: "ProfilePicMaker",
  components: { Avataaars, ArrowKey },
  data() {
    return {
      profilePic: {
        topHat: _.sample(TOP_HAT),
        clothColor: _.sample(CLOTH_COLORS),
        tshirt: _.sample(TSHIRT),
        eye: _.sample(EYE_TYPE)
      }
    };
  },
  methods: {
    generatePNG() {
      if ("my_avataar" in this.$refs) {
        new SVGToPNG().convertFromInput(this.$refs.my_avataar.$el, function(
          imgData
        ) {
          localStorage.setItem("profilePic", {
            settings: profilePic,
            png: imgData
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
.profile-pic-maker {
  margin: auto;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.side-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
