<template>
  <label
    :for="`input_${_uid}`"
    class="v-input">
    {{ label }}
    <input
      :id="`input_${_uid}`"
      class="v-input__input"
      v-bind="$attrs"
      :type="type"
      :class="{
        'slot__append-icon' : hasSlotAppendIcon
      }"
      v-on="allListeners">
    <div
      v-if="hasSlotAppendIcon"
      class="v-input__append-icon">
      <slot
        name="append-icon" />
    </div>
    <div
      v-if="errorMessage"
      class="v-input__error">
      Ошибка:<br> {{ errorMessage }}
    </div>
  </label>
</template>

<script lang="js">
export default {
  name: "VInput",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  computed: {
    hasSlotAppendIcon() {
      return this.$slots["append-icon"];
    },
    allListeners() {
      return {
        ...this.$listeners,
        input: this.input,
      };
    },
    iconPath() {
      return require(this.appendIcon);
    },
  },
  methods: {
    input(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-input {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  font-size: 20px;
  position: relative;
  margin-bottom: 15px;
  &__input {
    outline: none;
    margin-top: 5px;
    font-size: 24px;
    padding: 0 5px;
    &.slot__append-icon {
      padding: 0 35px 0 5px;
    }
  }
  &__append-icon {
    position: absolute;
    height: 30px;
    width: 30px;
    top: 30px;
    right: 5px;
  }
  &__error {
    transition: 0.5s;
    color: #faad8f;
    font-size: 20px;
    word-break: break-all;
  }
}
</style>
