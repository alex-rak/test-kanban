<template>
  <div class="task-card">
    <img
      class="task-card__icon-close"
      src="@/statics/remove-icon.svg">
    <div class="task-card__id">
      id: <span>{{ item.id }}</span>
    </div>
    <div class="task-card__title">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
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
    height: 15px;
    width: 15px;
    left: calc(100% - 15px);
  }
}
</style>
