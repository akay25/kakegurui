<template>
  <div>
    <div class="profile-pic-maker">
      <div class="side-buttons">
        <arrow-key
          itemName="TOP_HAT"
          direction="←"
          v-model="profilePic.topHat"
        />
        <arrow-key itemName="EYE_TYPE" direction="←" v-model="profilePic.eye" />
        <arrow-key
          itemName="FACIAL_HAIR_TYPES"
          direction="←"
          v-model="profilePic.facialHair"
        />
        <arrow-key
          itemName="CLOTHE_TYPES"
          direction="←"
          v-model="profilePic.clotheType"
        />
      </div>

      <avataaars
        ref="my_avataar"
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

      <div class="side-buttons">
        <arrow-key
          itemName="TOP_HAT"
          direction="→"
          v-model="profilePic.topHat"
        />
        <arrow-key itemName="EYE_TYPE" direction="→" v-model="profilePic.eye" />
        <arrow-key
          itemName="FACIAL_HAIR_TYPES"
          direction="→"
          v-model="profilePic.facialHair"
        />
        <arrow-key
          itemName="CLOTHE_TYPES"
          direction="→"
          v-model="profilePic.clotheType"
        />
      </div>
    </div>
    <va-icon
      class="icon-button"
      style="align-self: center;"
      name="fa fa-refresh"
      color="#FCA311"
      :size="30"
      @click="refreshProfile"
    />
  </div>
</template>

<script>
import _ from "lodash";
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import {
  TOP_HAT,
  CLOTH_COLORS,
  TSHIRT,
  EYE_TYPE,
  TOP_COLORS,
  HAIR_COLORS,
  EYEBROW_TYPES,
  FACIAL_HAIR_TYPES,
  MOUTH_TYPES,
  SKIN_COLORS,
  CLOTHE_TYPES
} from "./data";
import ArrowKey from "./ArrowKey.vue";
const SVGToPNG = require("./SvgToPngConverter");

export default {
  name: "ProfilePicMaker",
  components: { Avataaars, ArrowKey },
  data() {
    return {
      profilePic: null
    };
  },
  created() {
    this.profilePic = this.generateProfilePic();
  },
  methods: {
    refreshProfile() {
      this.profilePic = this.generateProfilePic();
    },
    generateProfilePic() {
      return {
        topHat: _.sample(TOP_HAT),
        topHatColor: _.sample(TOP_COLORS),
        hairColor: _.sample(HAIR_COLORS),
        eyebrowType: _.sample(EYEBROW_TYPES),
        eye: _.sample(EYE_TYPE),
        facialHair: _.sample(FACIAL_HAIR_TYPES),
        mouthType: _.sample(MOUTH_TYPES),
        skinColor: _.sample(SKIN_COLORS),
        clotheType: _.sample(CLOTHE_TYPES),
        clothColor: _.sample(CLOTH_COLORS),
        tshirt: _.sample(TSHIRT)
      };
    },
    async generatePNG() {
      if ("my_avataar" in this.$refs) {
        const pngData = await new SVGToPNG().convertFromInput(
          this.$refs.my_avataar.$el
        );
        localStorage.setItem(
          "profilePic",
          JSON.stringify({
            settings: this.profilePic,
            png: pngData
          })
        );
        return this.profilePic;
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

.icon-button {
  padding: 2px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid #ffffff;
  transition: all 0.4s;

  &:hover {
    border: 2px solid #e5e5e5;
  }
}
</style>
