<template>
  <div class="main-page">
    <div
      v-for="(column, i) in columns"
      :key="i"
      class="column">
      <tasks-column
        :title="column.title"
        :header-color="column.color"
        :row="i"
        :items="getColumnItems(i)" />
    </div>
  </div>
</template>

<script>
import TasksColumn from "@/components/TasksColumn";
import { mapActions, mapState } from "vuex";
export default {
  name: "MainPage",
  components: {
    TasksColumn,
  },
  data() {
    return {
      columns: [
        {
          title: "on-hold",
          color: "orange",
        },
        {
          title: "in progress",
          color: "blue",
        },
        {
          title: "needs review",
          color: "yellow",
        },
        {
          title: "approwed",
          color: "green",
        },
      ],
    };
  },
  computed: {
    ...mapState("cards", [
      "cards",
    ]),
  },
  created() {
    this.GET_CARDS();
  },
  methods: {
    ...mapActions("cards", ([
      "GET_CARDS",
    ])),
    getColumnItems(i) {
      return this.cards[i + ""]?.items || [];
    },
  },
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  .column {
    display: flex;
    justify-content: center;
    width: 25%;
  }
}
@media screen and (max-width: 1600px) {
  .main-page {
    justify-content: center;
    .column {
      width: 50%;
    }
  }
}
@media screen and (max-width: 800px) {
  .main-page {
    justify-content: center;
    .column {
      width: 100%;
    }
  }
}
</style>
