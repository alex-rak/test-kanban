<template>
  <div
    ref="task"
    class="task-card">
    <img
      class="task-card__icon-close"
      src="@/statics/remove-icon.svg"
      @click="DELETE_CARD(item.id)"
      @touchstart="DELETE_CARD(item.id)">
    <div class="task-card__id">
      id: <span>{{ item.id }}</span>
    </div>
    <div class="task-card__title">
      {{ item.text }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TaskCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("cards", [
      "DELETE_CARD",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.task-card {
  min-height: 100px;
  color: #ffffff;
  background: #1F1F23;
  margin: 10px 10px;
  cursor: move;
  padding: 5px 5px;
  &.draggable {
    opacity: 1;
  }
  &__id {
    span {
      color: #929292
    }
  }
  &__title {
    font-size: 16px;
    margin-top: 10px;
    color: #929292;
    word-wrap: break-word;
  }
  &__icon-close {
    cursor: pointer;
    position: relative;
    background: transparent;
    border: none;
    outline: none;
    height: 1px;
    width: 15px;
    height: 15px;
    left: calc(100% - 15px);
    img {
      width: 100%;
      height: 100%;;
    }
  }
}
</style>
