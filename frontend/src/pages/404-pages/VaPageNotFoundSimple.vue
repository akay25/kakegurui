<template>
  <va-page-not-found class="va-page-not-found-simple">
    <template #image>
      <!-- Some logo here -->
    </template>
    <va-button :to="{ name: 'home' }">
      Back to home
    </va-button>
  </va-page-not-found>
</template>

<script>
import VaPageNotFound from "./VaPageNotFound";

export default {
  name: "vuestic-page-not-found-simple",
  components: {
    VaPageNotFound
  }
};
</script>

<style lang="scss">
.va-page-not-found-simple {
  .va-icon-vuestic {
    width: 19rem;
    height: 2rem;
    max-width: 100%;
    margin-bottom: 13%;
  }
}
</style>
