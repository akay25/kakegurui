<template>
  <div @click="handleClick">
    <va-icon
      class="profile-control"
      :name="`fa fa-arrow-${iconName}`"
      :size="iconSize"
    />
  </div>
</template>

<script>
import _ from "lodash";
import ITEMS from "./data";
export default {
  name: "ArrowKey",
  props: {
    itemName: String,
    direction: String,
    modelValue: String
  },
  data() {
    return {
      iconSize: 35
    };
  },
  computed: {
    items() {
      return ITEMS[this.itemName];
    },
    iconName() {
      return this.direction === "←" ? "left" : "right";
    },
    getSelectedItem() {
      const index = _.indexOf(this.items, this.modelValue);
      if (index > -1) return index;
      return 0;
    }
  },
  emits: ["update:modelValue"],
  methods: {
    handleClick(e) {
      let index = this.getSelectedItem;
      let newValue = this.modelValue;
      if (this.direction === "→") {
        if (index < this.items.length - 1) {
          newValue = this.items[++index];
        }
      } else {
        if (index > 1) {
          newValue = this.items[--index];
        }
      }
      this.$emit("update:modelValue", newValue);
    }
  }
};
</script>

<style lang="scss">
.profile-control {
  cursor: pointer;
  color: #14213d;

  &:hover {
    color: #fca311;
  }
}
</style>
