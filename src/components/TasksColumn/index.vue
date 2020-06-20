<template>
  <div class="tasks-column">
    <div
      ref="header"
      class="header">
      {{ title }} ({{ items.length }})
    </div>
    <div class="body">
      <draggable
        v-model="cards"
        group="tasks"
        ghost-class="ghost"
        :animation="300">
        <task-card
          v-for="item in cards"
          :key="item.id"
          :item="item" />
      </draggable>
    </div>
    <create-task-card :row="row" />
  </div>
</template>

<script>
import TaskCard from "@/components/TaskCard";
import CreateTaskCard from "@/components/CreateTaskCard";
import Draggable from "vuedraggable";
import { mapActions } from "vuex";
export default {
  name: "TasksColumn",
  components: {
    TaskCard,
    CreateTaskCard,
    Draggable,
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
    row: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    cards: {
      get() {
        return this.items;
      },
      set(value) {
        // только если исходный массив увеличился или остался равной длины
        if (this.items.length <= value.length) {
          value.forEach((el, i) => {
            if (+el.row !== this.row || el.seq_num !== i) {
              el.row = this.row;
              el.seq_num = i;
              this.UPDATE_CARD(el).then(res => {
                if (res.status === 401) {
                  window.localStorage.removeItem("token");
                  window.location = "/auth";
                  window.alert("Срок атворизации кончился, выполните вход");
                }
              });
            }
          });
        }
      },
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
  methods: {
    ...mapActions("cards", [
      "UPDATE_CARD",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.tasks-column {
  width: 90%;
  min-width: 300px;
  background: #303038;
  margin-top: 20px;
  display: table;
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
  .ghost {
    opacity: 0;
  }
}
</style>
