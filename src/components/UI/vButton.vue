<template>
  <button
    class="v-button"
    v-bind="$attrs"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: "VButton",
  inheritAttrs: false,
  props: {
    modifiers: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.v-button {
  cursor: pointer;
  height: 40px;
  width: 70%;
  min-width: fit-content;
  border-radius: 20px;
  outline: none;
  background: #7a7a7a;
  color: #ffffff;
  border: none;
  font-size: 20px;
  transition: 0.3s;
  box-shadow: 0 0 5px 5px #57575778;
  &:hover {
    box-shadow: 0 0 5px 4px #4b4b4b78;
  }
  &:active {
    box-shadow: 0 0 5px 2px #00000078;
  }
}
</style>
