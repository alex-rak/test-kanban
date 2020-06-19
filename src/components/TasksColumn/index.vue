<template>
  <div class="tasks-column">
    <div
      ref="header"
      class="header">
      {{ title }} ({{ items.length }})
    </div>
    <div class="body">
      <div
        v-for="item in items"
        :key="item.id">
        <task-card :item="item" />
      </div>
    </div>
    <create-task-card />
  </div>
</template>

<script>
import TaskCard from "@/components/TaskCard";
import CreateTaskCard from "@/components/CreateTaskCard";
export default {
  name: "TasksColumn",
  components: {
    TaskCard,
    CreateTaskCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    headerColor: {
      type: String,
      default: "",
    },
  },
  mounted() {
    if (this.headerColor.startsWith("#")) {
      this.$refs.header.style.backgroundColor = this.headerColor;
      const maxColor = 16777216;
      // если фон слишком яркий, то меняем цвет текста на черный
      if (maxColor / 2 < parseInt("0x" + this.headerColor.slice(1), 16)) {
        this.$refs.header.style.color = "#000000";
      }
    } else {
      this.$refs.header.classList.add(this.headerColor);
    }
  },
};
</script>

<style lang="scss" scoped>
.tasks-column {
  width: 90%;
  min-width: 300px;
  background: #303038;
  height: fit-content;
  margin-top: 20px;
  .header {
    line-height: 30px;
    padding: 0 10px;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 5px;
    &.blue {
      background-color: #3C8BBE;
    }
    &.green {
      background-color: #4BA468;
    }
    &.orange {
      background-color: #fb7e46;
    }
    &.yellow {
      background-color: #F5C852;
    }
  }
}
</style>
