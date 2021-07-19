<template>
  <img class="image-holder" :src="image" :draggable="false" />
</template>

<script>
export default {
  name: "ImageHolder",
  props: {
    image: {
      type: String
    }
  }
};
</script>

<style>
.image-holder {
  display: flex;
  width: 100%;
  height: auto;
}
</style>
