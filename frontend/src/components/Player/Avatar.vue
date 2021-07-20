<template>
  <div>
    <!--- all random :) ---->
    <avataaars></avataaars>

    <!-- - with some props --
    <avataaars
      :clotheType="'GraphicShirt'"
      :eyebrowType="'Angry'"
      :eyeType="'Cry'"
      :mouthType="'Eating'"
      :facialHairColor="'Blonde'"
      :graphicType="'Cumbia'"
    >
    </avataaars> -->
  </div>
</template>

<script>
import Avataaars from "vuejs-avataaars";

export default {
  components: {
    Avataaars
  }
};
</script>
